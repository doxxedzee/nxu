import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDpY0KQuQdzc4CYw5kmUdr9yDO4mfYVYKQ",
    authDomain: "ghostyweb-6db12.firebaseapp.com",
    projectId: "ghostyweb-6db12",
    storageBucket: "ghostyweb-6db12.appspot.com",
    messagingSenderId: "810209803767",
    appId: "1:810209803767:web:6606072684d16862ccc2f2",
    measurementId: "G-GFVP34GG3J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Get elements
const submit = document.getElementById('submit');
const errorPopup = document.getElementById('error-popup');
const successPopup = document.getElementById('success-popup');
const discordPopup = document.getElementById('discord-popup');
const discord = document.getElementById('discord-login-button');

const authError = localStorage.getItem('authError');
if (authError) {
    showErrorPopup(authError);
    localStorage.removeItem('authError'); // Clear the error message after showing
}

discord.addEventListener('click', function (event) {
    event.preventDefault();
    showDiscordPopup('Error: nxu currently does not support discord logins!');
});

submit.addEventListener('click', function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
        showErrorPopup('Authentication error: Email required!');
        return;
    }

    if (!emailPattern.test(email)) {
        showErrorPopup('Authentication error: Invalid email!');
        return;
    }

    if (!password) {
        showErrorPopup('Authentication error: Password required!');
        return;
    }

    // Firebase authentication
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        showSuccessPopup('Authentication: Successfully logged into nxu!');
        setTimeout(() => {
            window.location.href = "https://nxu.lol/dashboard/profile";
            window.open("https://discord.gg/F7CpyUHpbs", "_blank");
        }, 1500);
    })
    .catch((error) => {
        if (error.code === 'auth/invalid-credential') {
            showErrorPopup('Authentication Error: Incorrect Password!');
        } else if (error.code === 'auth/user-not-found') {
            showErrorPopup('Authentication Error: Account not Found!');
        } else {
            showErrorPopup(error.message);
        }
    });
});

function showErrorPopup(message) {
    errorPopup.textContent = message;
    errorPopup.classList.add('show');
    setTimeout(() => {
        errorPopup.classList.remove('show');
    }, 3000);
}

function showSuccessPopup(message) {
    successPopup.textContent = message;
    successPopup.classList.add('show');
    setTimeout(() => {
        successPopup.classList.remove('show');
    }, 3000);
}

function showDiscordPopup(message) {
    discordPopup.textContent = message;
    discordPopup.classList.add('show');
    setTimeout(() => {
        discordPopup.classList.remove('show');
    }, 3000);
}