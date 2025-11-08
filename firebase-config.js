// Firebase Configuration and Initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail, sendEmailVerification, applyActionCode } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";
import { getFirestore, collection, doc, setDoc, getDoc, getDocs, updateDoc, deleteDoc, query, where, orderBy, limit, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD2PBV2s1Nq63TuaEsbbVE8Zy3KV-TdJR4",
    authDomain: "brainwave-1-31600.firebaseapp.com",
    projectId: "brainwave-1-31600",
    storageBucket: "brainwave-1-31600.firebasestorage.app",
    messagingSenderId: "608284608953",
    appId: "1:608284608953:web:048beabaf6f491f4578e68"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Export Firebase services
export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail, sendEmailVerification, applyActionCode, collection, doc, setDoc, getDoc, getDocs, updateDoc, deleteDoc, query, where, orderBy, limit, addDoc, serverTimestamp };

// Helper function to generate student code
export function generateStudentCode() {
    const prefix = 'BW';
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${prefix}-${timestamp}-${random}`;
}

// Helper function to calculate bootcamp expiry (7 days from now)
export function getBootcampExpiryDate() {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);
    return expiryDate.toISOString();
}

// Check if user is authenticated
export function requireAuth(redirectUrl = 'login.html') {
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                resolve(user);
            } else {
                window.location.href = redirectUrl;
                reject(new Error('Not authenticated'));
            }
        });
    });
}

// Get current user data from Firestore
export async function getCurrentUserData() {
    const user = auth.currentUser;
    if (!user) return null;
    
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (userDoc.exists()) {
        return { uid: user.uid, ...userDoc.data() };
    }
    return null;
}

// Check if account is locked or expired
export async function checkAccountStatus(uid) {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (!userDoc.exists()) return { valid: false, reason: 'User not found' };
    
    const userData = userDoc.data();
    
    // Check if locked
    if (userData.locked || userData.accountLocked) {
        return { valid: false, reason: userData.lockedReason || 'Account is locked' };
    }
    
    // Check if expired
    if (userData.expiryDate) {
        const expiryDate = new Date(userData.expiryDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        expiryDate.setHours(0, 0, 0, 0);
        
        if (expiryDate < today) {
            // Auto-lock expired account
            await updateDoc(doc(db, 'users', uid), {
                locked: true,
                accountLocked: true,
                status: 'expired',
                lockedReason: 'Subscription expired',
                lockedAt: serverTimestamp()
            });
            return { valid: false, reason: 'Subscription expired' };
        }
    }
    
    return { valid: true, userData };
}
