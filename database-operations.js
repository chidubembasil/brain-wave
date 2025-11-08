// Firebase Firestore Database Operations
import { db, collection, doc, setDoc, getDoc, getDocs, updateDoc, deleteDoc, query, where, orderBy, limit, addDoc, serverTimestamp } from './firebase-config.js';

// ==================== USER OPERATIONS ====================

/**
 * Get user by UID
 */
export async function getUserById(uid) {
    try {
        const userDoc = await getDoc(doc(db, 'users', uid));
        if (userDoc.exists()) {
            return { uid: userDoc.id, ...userDoc.data() };
        }
        return null;
    } catch (error) {
        console.error('Error getting user:', error);
        throw error;
    }
}

/**
 * Update user data
 */
export async function updateUser(uid, data) {
    try {
        await updateDoc(doc(db, 'users', uid), {
            ...data,
            updatedAt: serverTimestamp()
        });
        console.log('✅ User updated successfully');
        return true;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}

/**
 * Get all students (for admin)
 */
export async function getAllStudents() {
    try {
        const q = query(collection(db, 'users'), where('role', '==', 'student'));
        const querySnapshot = await getDocs(q);
        const students = [];
        querySnapshot.forEach((doc) => {
            students.push({ uid: doc.id, ...doc.data() });
        });
        return students;
    } catch (error) {
        console.error('Error getting students:', error);
        throw error;
    }
}

/**
 * Get student by student code
 */
export async function getStudentByCode(studentCode) {
    try {
        const q = query(collection(db, 'users'), where('studentCode', '==', studentCode));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            return { uid: doc.id, ...doc.data() };
        }
        return null;
    } catch (error) {
        console.error('Error getting student by code:', error);
        throw error;
    }
}

// ==================== STUDY MATERIALS OPERATIONS ====================

/**
 * Get study materials by filters
 */
export async function getStudyMaterials(filters = {}) {
    try {
        let q = collection(db, 'study_materials');
        
        const constraints = [];
        if (filters.subject) constraints.push(where('subject', '==', filters.subject));
        if (filters.classLevel) constraints.push(where('classLevel', '==', filters.classLevel));
        if (filters.stream) constraints.push(where('stream', '==', filters.stream));
        if (filters.type) constraints.push(where('type', '==', filters.type));
        
        if (constraints.length > 0) {
            q = query(q, ...constraints);
        }
        
        const querySnapshot = await getDocs(q);
        const materials = [];
        querySnapshot.forEach((doc) => {
            materials.push({ id: doc.id, ...doc.data() });
        });
        return materials;
    } catch (error) {
        console.error('Error getting study materials:', error);
        throw error;
    }
}

/**
 * Add new study material (admin only)
 */
export async function addStudyMaterial(materialData) {
    try {
        const docRef = await addDoc(collection(db, 'study_materials'), {
            ...materialData,
            views: 0,
            downloads: 0,
            isActive: true,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
        console.log('✅ Study material added:', docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('Error adding study material:', error);
        throw error;
    }
}

/**
 * Update study material views
 */
export async function incrementMaterialViews(materialId) {
    try {
        const materialRef = doc(db, 'study_materials', materialId);
        const materialDoc = await getDoc(materialRef);
        if (materialDoc.exists()) {
            const currentViews = materialDoc.data().views || 0;
            await updateDoc(materialRef, { views: currentViews + 1 });
        }
    } catch (error) {
        console.error('Error incrementing views:', error);
    }
}

// ==================== ASSESSMENT OPERATIONS ====================

/**
 * Get assessments by filters
 */
export async function getAssessments(filters = {}) {
    try {
        let q = collection(db, 'assessments');
        
        const constraints = [];
        if (filters.type) constraints.push(where('type', '==', filters.type));
        if (filters.subject) constraints.push(where('subject', '==', filters.subject));
        if (filters.classLevel) constraints.push(where('classLevel', '==', filters.classLevel));
        if (filters.stream) constraints.push(where('stream', '==', filters.stream));
        if (filters.status) constraints.push(where('status', '==', filters.status));
        
        if (constraints.length > 0) {
            q = query(q, ...constraints);
        }
        
        const querySnapshot = await getDocs(q);
        const assessments = [];
        querySnapshot.forEach((doc) => {
            assessments.push({ id: doc.id, ...doc.data() });
        });
        return assessments;
    } catch (error) {
        console.error('Error getting assessments:', error);
        throw error;
    }
}

/**
 * Add new assessment (admin only)
 */
export async function addAssessment(assessmentData) {
    try {
        const docRef = await addDoc(collection(db, 'assessments'), {
            ...assessmentData,
            isActive: true,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
        console.log('✅ Assessment added:', docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('Error adding assessment:', error);
        throw error;
    }
}

/**
 * Submit assessment (student)
 */
export async function submitAssessment(submissionData) {
    try {
        const docRef = await addDoc(collection(db, 'assessment_submissions'), {
            ...submissionData,
            submittedAt: serverTimestamp(),
            status: 'submitted'
        });
        console.log('✅ Assessment submitted:', docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('Error submitting assessment:', error);
        throw error;
    }
}

/**
 * Get student submissions
 */
export async function getStudentSubmissions(studentId) {
    try {
        const q = query(
            collection(db, 'assessment_submissions'),
            where('studentId', '==', studentId),
            orderBy('submittedAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const submissions = [];
        querySnapshot.forEach((doc) => {
            submissions.push({ id: doc.id, ...doc.data() });
        });
        return submissions;
    } catch (error) {
        console.error('Error getting submissions:', error);
        throw error;
    }
}

// ==================== LIVE CLASS OPERATIONS ====================

/**
 * Get live classes by filters
 */
export async function getLiveClasses(filters = {}) {
    try {
        let q = collection(db, 'live_classes');
        
        const constraints = [];
        if (filters.subject) constraints.push(where('subject', '==', filters.subject));
        if (filters.classLevel) constraints.push(where('classLevel', '==', filters.classLevel));
        if (filters.status) constraints.push(where('status', '==', filters.status));
        
        if (constraints.length > 0) {
            q = query(q, ...constraints, orderBy('date', 'desc'));
        }
        
        const querySnapshot = await getDocs(q);
        const classes = [];
        querySnapshot.forEach((doc) => {
            classes.push({ id: doc.id, ...doc.data() });
        });
        return classes;
    } catch (error) {
        console.error('Error getting live classes:', error);
        throw error;
    }
}

/**
 * Add student to live class attendees
 */
export async function joinLiveClass(classId, studentId) {
    try {
        const classRef = doc(db, 'live_classes', classId);
        const classDoc = await getDoc(classRef);
        
        if (classDoc.exists()) {
            const currentAttendees = classDoc.data().attendees || [];
            if (!currentAttendees.includes(studentId)) {
                currentAttendees.push(studentId);
                await updateDoc(classRef, {
                    attendees: currentAttendees,
                    attendeeCount: currentAttendees.length
                });
                console.log('✅ Joined live class');
            }
        }
    } catch (error) {
        console.error('Error joining live class:', error);
        throw error;
    }
}

// ==================== STUDENT PROGRESS OPERATIONS ====================

/**
 * Get student progress
 */
export async function getStudentProgress(studentId) {
    try {
        const progressDoc = await getDoc(doc(db, 'student_progress', studentId));
        if (progressDoc.exists()) {
            return { id: progressDoc.id, ...progressDoc.data() };
        }
        // Create initial progress if doesn't exist
        const initialProgress = {
            studentId: studentId,
            totalQuizzesTaken: 0,
            totalAssignmentsCompleted: 0,
            totalMockExamsTaken: 0,
            averageScore: 0,
            totalStudyHours: 0,
            streakDays: 0,
            lastActiveDate: serverTimestamp(),
            badges: [],
            subjectScores: {},
            weeklyActivity: [],
            monthlyActivity: [],
            updatedAt: serverTimestamp()
        };
        await setDoc(doc(db, 'student_progress', studentId), initialProgress);
        return { id: studentId, ...initialProgress };
    } catch (error) {
        console.error('Error getting student progress:', error);
        throw error;
    }
}

/**
 * Update student progress
 */
export async function updateStudentProgress(studentId, progressData) {
    try {
        await updateDoc(doc(db, 'student_progress', studentId), {
            ...progressData,
            lastActiveDate: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
        console.log('✅ Student progress updated');
    } catch (error) {
        console.error('Error updating student progress:', error);
        throw error;
    }
}

// ==================== PARENT-CHILD OPERATIONS ====================

/**
 * Link parent to child
 */
export async function linkParentToChild(parentId, childCode) {
    try {
        // Find child by code
        const child = await getStudentByCode(childCode);
        if (!child) {
            throw new Error('Student not found with this code');
        }
        
        // Create parent-child relationship
        await addDoc(collection(db, 'parent_children'), {
            parentId: parentId,
            childId: child.uid,
            childName: child.name,
            childEmail: child.email,
            childCode: child.studentCode,
            classLevel: child.classLevel,
            stream: child.stream,
            linkedAt: serverTimestamp(),
            isActive: true
        });
        
        // Update parent's children array
        const parentRef = doc(db, 'users', parentId);
        const parentDoc = await getDoc(parentRef);
        if (parentDoc.exists()) {
            const currentChildren = parentDoc.data().children || [];
            currentChildren.push(child.uid);
            await updateDoc(parentRef, {
                children: currentChildren,
                childrenCount: currentChildren.length,
                needsChildLinking: false
            });
        }
        
        // Update child's parentId
        await updateDoc(doc(db, 'users', child.uid), {
            parentId: parentId
        });
        
        console.log('✅ Parent linked to child successfully');
        return child;
    } catch (error) {
        console.error('Error linking parent to child:', error);
        throw error;
    }
}

/**
 * Get parent's children
 */
export async function getParentChildren(parentId) {
    try {
        const q = query(
            collection(db, 'parent_children'),
            where('parentId', '==', parentId),
            where('isActive', '==', true)
        );
        const querySnapshot = await getDocs(q);
        const children = [];
        querySnapshot.forEach((doc) => {
            children.push({ id: doc.id, ...doc.data() });
        });
        return children;
    } catch (error) {
        console.error('Error getting parent children:', error);
        throw error;
    }
}

// ==================== ANNOUNCEMENT OPERATIONS ====================

/**
 * Get active announcements
 */
export async function getActiveAnnouncements(userRole = 'all') {
    try {
        const now = new Date();
        const q = query(
            collection(db, 'announcements'),
            where('isActive', '==', true),
            orderBy('createdAt', 'desc')
        );
        
        const querySnapshot = await getDocs(q);
        const announcements = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            // Check if announcement is for this user role and not expired
            const targetAudience = data.targetAudience || ['all'];
            const expiresAt = data.expiresAt ? new Date(data.expiresAt) : null;
            
            if ((targetAudience.includes(userRole) || targetAudience.includes('all')) &&
                (!expiresAt || expiresAt > now)) {
                announcements.push({ id: doc.id, ...data });
            }
        });
        return announcements;
    } catch (error) {
        console.error('Error getting announcements:', error);
        throw error;
    }
}

// ==================== PAYMENT OPERATIONS ====================

/**
 * Record payment
 */
export async function recordPayment(paymentData) {
    try {
        const docRef = await addDoc(collection(db, 'payments'), {
            ...paymentData,
            createdAt: serverTimestamp()
        });
        
        // Update user's payment status
        if (paymentData.status === 'completed') {
            await updateDoc(doc(db, 'users', paymentData.userId), {
                isPaid: true,
                paymentStatus: 'paid',
                status: 'active',
                plan: paymentData.plan,
                paidDate: serverTimestamp(),
                expiryDate: paymentData.expiryDate
            });
        }
        
        console.log('✅ Payment recorded:', docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('Error recording payment:', error);
        throw error;
    }
}

/**
 * Get user payment history
 */
export async function getUserPayments(userId) {
    try {
        const q = query(
            collection(db, 'payments'),
            where('userId', '==', userId),
            orderBy('paymentDate', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const payments = [];
        querySnapshot.forEach((doc) => {
            payments.push({ id: doc.id, ...doc.data() });
        });
        return payments;
    } catch (error) {
        console.error('Error getting payments:', error);
        throw error;
    }
}

// ==================== REPORT OPERATIONS ====================

/**
 * Generate and save report
 */
export async function saveReport(reportData) {
    try {
        const docRef = await addDoc(collection(db, 'reports'), {
            ...reportData,
            generatedAt: serverTimestamp()
        });
        console.log('✅ Report saved:', docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('Error saving report:', error);
        throw error;
    }
}

/**
 * Get student reports
 */
export async function getStudentReports(studentId) {
    try {
        const q = query(
            collection(db, 'reports'),
            where('studentId', '==', studentId),
            orderBy('generatedAt', 'desc'),
            limit(10)
        );
        const querySnapshot = await getDocs(q);
        const reports = [];
        querySnapshot.forEach((doc) => {
            reports.push({ id: doc.id, ...doc.data() });
        });
        return reports;
    } catch (error) {
        console.error('Error getting reports:', error);
        throw error;
    }
}

// Export all functions
export default {
    // User operations
    getUserById,
    updateUser,
    getAllStudents,
    getStudentByCode,
    
    // Study materials
    getStudyMaterials,
    addStudyMaterial,
    incrementMaterialViews,
    
    // Assessments
    getAssessments,
    addAssessment,
    submitAssessment,
    getStudentSubmissions,
    
    // Live classes
    getLiveClasses,
    joinLiveClass,
    
    // Student progress
    getStudentProgress,
    updateStudentProgress,
    
    // Parent-child
    linkParentToChild,
    getParentChildren,
    
    // Announcements
    getActiveAnnouncements,
    
    // Payments
    recordPayment,
    getUserPayments,
    
    // Reports
    saveReport,
    getStudentReports
};
