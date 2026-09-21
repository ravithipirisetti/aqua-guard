// =====================================
// AQUA GUARD - FIREBASE CONFIG
// =====================================

const firebaseConfig = {
    apiKey: "AIzaSyDaOWIflaJO3gAoqBDKDeph_ZhfdbeI2EQ",
    authDomain: "aqua-guard-1d4f6.firebaseapp.com",
    databaseURL: "https://aqua-guard-1d4f6-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "aqua-guard-1d4f6",
    storageBucket: "aqua-guard-1d4f6.firebasestorage.app",
    messagingSenderId: "206069099497",
    appId: "1:206069099497:web:b9f389ac84632073013978",
    measurementId: "G-2WF14PWDMK"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Firebase Realtime Database
const database = firebase.database();