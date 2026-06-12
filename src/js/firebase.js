const firebaseConfig = {
    apiKey: 'AIzaSyAZYFdG2HhAFTfzO8LiX50MgwcznSp7SRM',
    authDomain: 'chemistry-web-1.firebaseapp.com',
    projectId: 'chemistry-web-1',
    storageBucket: 'chemistry-web-1.firebasestorage.app',
    messagingSenderId: '926471211956',
    appId: '1:926471211956:web:2e11c987c2b1a2dd5f40e1',
    measurementId: 'G-VRG9EMEDCB'
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const analytics = firebase.analytics();

async function saveMembershipApplication(data) {
    return db.collection('membership_applications').add({
        ...data,
        status: 'pending',
        submittedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
}

async function saveCSTRegistration(data) {
    return db.collection("cst_registration").add({
        ...data,
        status: 'pending',
        submittedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
}

async function isDuplicateEmail(collection, email) {
    const snap = await db.collection(collection).where('email', '==', email)
        .limit(1)
        .get();
    return !snap.empty;
}

function trackFormSubmit(formName) {
    analytics.logEvent('form_submit', {form_name: formName})
}

