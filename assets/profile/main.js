// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// config
const firebaseConfig = {
    apiKey: "AIzaSyDpY0KQuQdzc4CYw5kmUdr9yDO4mfYVYKQ",
    authDomain: "ghostyweb-6db12.firebaseapp.com",
    projectId: "ghostyweb-6db12",
    storageBucket: "ghostyweb-6db12.appspot.com",
    messagingSenderId: "810209803767",
    appId: "1:810209803767:web:6606072684d16862ccc2f2",
    measurementId: "G-GFVP34GG3J"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// menu open
document.addEventListener('DOMContentLoaded', () => {
});

// dont allow on dashboard if not logged in
onAuthStateChanged(auth, (user) => {
    if (!user) {
        localStorage.setItem('authError', 'Authentication Error: You must be logged in first!');
        sessionStorage.setItem('redirectedFromProfile', 'true');
        window.location.href = "https://nxu.lol/login";
    }
});


// logout
const logout = document.querySelector(".logout");
logout.addEventListener("click", (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        window.location.href = 'https://nxu.lol/login'; 
    }).catch((error) => {
        console.log('Logout Error: ' + error.message);
    });
});