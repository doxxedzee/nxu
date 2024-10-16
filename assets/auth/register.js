// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

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

// Define the showPopup function
function showPopup(message, type) {
    const popup = document.getElementById(type === 'success' ? 'success-popup' : 'error-popup');
    if (popup) {
        popup.textContent = message;
        popup.classList.add('show');
        setTimeout(() => {
            popup.classList.remove('show');
        }, 3000);
    } else {
        console.error('Popup element not found.');
    }
}

// Event listener for the submit button
const submit = document.getElementById('submit');
const errorPopup = document.getElementById('error-popup');
const successPopup = document.getElementById('success-popup');
const discordPopup = document.getElementById('discord-popup');
const discord = document.getElementById('discord-login-button');

discord.addEventListener('click', function (event) {
    event.preventDefault();
    showDiscordPopup('nxu currently does not support discord logins!');
});

submit.addEventListener('click', function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const displayName = document.getElementById('displayName').value;
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

    if (!displayName) {
        showErrorPopup('Authentication error: Username needed!');
        return;
    }

    const forbiddenNames = ['1', 'ghosty', 'bear', 'caught', 'chaos', 'fed', 'key', 'lost', 'zfnl', "adversary", "sam"];
    if (forbiddenNames.includes(displayName.toLowerCase())) {
        showErrorPopup('Authentication error: Username already in use!');
        return;
    }

    const blacklistedNames = ['index.html', '404.html', 'login', 'register', 'support', '.vscode', '.well-known', 'assets', 'dashboard', "users", "/", "profile"];
    if (blacklistedNames.includes(displayName.toLowerCase())) {
        showErrorPopup('Authentication error: Username is not allowed!');
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        showSuccessPopup('Authentication: Successfully created an account!');
        setTimeout(() => {
            window.location.href = "https://nxu.lol/dashboard/profile";
            window.open("https://discord.gg/F7CpyUHpbs", "_blank");
        }, 1500);
    })
    .catch((error) => {
        if (error.code === 'auth/weak-password') {
            showErrorPopup('Authentication Error: Password should be at least 6 characters!');
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
