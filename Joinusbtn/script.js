import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";



const firebaseConfig = {
    apiKey: "AIzaSyADuDbkzTgTwL4rviKK0LFIwHGVXaqGizE", 
    authDomain: "donarc-728b7.firebaseapp.com",
    projectId: "donarc-728b7",
    storageBucket: "donarc-728b7.firebasestorage.app",
    messagingSenderId: "750915012102",
    appId: "1:750915012102:web:c8ad2383789dd9ff952587",
    measurementId: "G-FKJCE3Y193",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".signup-form form");
    const googleSignInBtn = document.createElement("button");
    googleSignInBtn.textContent = "Sign in with Google";
    googleSignInBtn.style.marginTop = "10px";
    form.appendChild(googleSignInBtn);

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        // Get input values
        const firstName = document.getElementById("first-name").value.trim();
        const lastName = document.getElementById("last-name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        // Validate inputs
        if (!firstName || !lastName || !email || !password) {
            alert("Please fill in all fields.");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters long.");
            return;
        }

        // Firebase authentication for user sign-up
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                alert("Sign-up successful! You can now log in.");
                form.reset();
            })
            .catch((error) => {
                alert(`Error: ${error.message}`);
            });
    });

    googleSignInBtn.addEventListener("click", function () {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                alert(`Welcome, ${user.displayName}!`);
            })
            .catch((error) => {
                alert(`Google Sign-In Error: ${error.message}`);
            });
    });
});
