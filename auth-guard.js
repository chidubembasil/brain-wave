// Authentication Guard for Protected Pages
import { auth, onAuthStateChanged, getCurrentUserData } from './firebase-config.js';

// Check authentication and redirect if not authenticated
export async function checkAuth(requiredRole = null, redirectUrl = 'login.html') {
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, async (user) => {
            if (!user) {
                console.log('❌ No authenticated user, redirecting to login');
                window.location.href = redirectUrl;
                reject(new Error('Not authenticated'));
                return;
            }

            try {
                // Get user data from Firestore
                const userData = await getCurrentUserData();
                
                if (!userData) {
                    console.log('❌ User data not found, redirecting to login');
                    await auth.signOut();
                    window.location.href = redirectUrl;
                    reject(new Error('User data not found'));
                    return;
                }

                // Check if specific role is required
                if (requiredRole && userData.role !== requiredRole) {
                    console.log(`❌ Access denied. Required: ${requiredRole}, Got: ${userData.role}`);
                    // Redirect to appropriate dashboard
                    if (userData.role === 'student') {
                        window.location.href = 'student-dashboard.html';
                    } else if (userData.role === 'parent') {
                        window.location.href = 'parent-dashboard.html';
                    } else if (userData.role === 'admin') {
                        window.location.href = 'admin-dashboard.html';
                    } else {
                        window.location.href = 'index.html';
                    }
                    reject(new Error('Insufficient permissions'));
                    return;
                }

                // Check account status
                if (userData.locked || userData.accountLocked) {
                    console.log('❌ Account is locked');
                    alert('Your account has been locked. Please contact support.');
                    await auth.signOut();
                    window.location.href = 'login.html';
                    reject(new Error('Account locked'));
                    return;
                }

                // Check expiry
                if (userData.expiryDate) {
                    const expiryDate = new Date(userData.expiryDate);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    expiryDate.setHours(0, 0, 0, 0);

                    if (expiryDate < today) {
                        console.log('❌ Subscription expired');
                        alert('Your subscription has expired. Please renew to continue.');
                        await auth.signOut();
                        window.location.href = 'login.html';
                        reject(new Error('Subscription expired'));
                        return;
                    }
                }

                console.log('✅ Authentication successful:', userData.email, 'Role:', userData.role);
                resolve(userData);

            } catch (error) {
                console.error('Auth check error:', error);
                window.location.href = redirectUrl;
                reject(error);
            }
        });
    });
}

// Logout function
export async function logout() {
    try {
        await auth.signOut();
        localStorage.removeItem('currentUser');
        sessionStorage.removeItem('userData');
        console.log('✅ Logged out successfully');
        window.location.href = 'login.html';
    } catch (error) {
        console.error('Logout error:', error);
        alert('Error logging out. Please try again.');
    }
}
