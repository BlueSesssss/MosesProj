import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithPopup, 
    GoogleAuthProvider 
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyADuDbkzTgTwL4rviKK0LFIwHGVXaqGizE",
    authDomain: "donarc-728b7.firebaseapp.com",
    projectId: "donarc-728b7",
    storageBucket: "donarc-728b7.appspot.com",,
    messagingSenderId: "750915012102",
    appId: "1:750915012102:web:c8ad2383789dd9ff952587",
    measurementId: "G-FKJCE3Y193",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".signup-form form");
    const googleSignInBtn = document.createElement("button");
    googleSignInBtn.textContent = "Sign in with Google";
    googleSignInBtn.style.marginTop = "10px";
    form.appendChild(googleSignInBtn);

    const loader = document.createElement("div");
    loader.textContent = "Loading...";
    loader.style.display = "none"; 
    form.appendChild(loader);

    // Handle email/password sign-up
    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        loader.style.display = "block"; // Show loader

        const firstName = document.getElementById("first-name").value.trim();
        const lastName = document.getElementById("last-name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!firstName || !lastName || !email || !password) {
            alert("Please fill in all fields.");
            loader.style.display = "none";
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters long.");
            loader.style.display = "none";
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Save user data in Firestore
            await setDoc(doc(db, "users", user.uid), {
                firstName,
                lastName,
                email,
                uid: user.uid,
            });

            alert("Sign-up successful! Redirecting...");
            window.location.href = "dashboard.html"; // Redirect after sign-up
        } catch (error) {
            alert(`Error: ${error.message}`);
        } finally {
            loader.style.display = "none"; // Hide loader
        }
    });

    // Handle Google sign-in
    googleSignInBtn.addEventListener("click", async function () {
        loader.style.display = "block";

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Save user data in Firestore if not already stored
            await setDoc(doc(db, "users", user.uid), {
                firstName: user.displayName.split(" ")[0] || "",
                lastName: user.displayName.split(" ")[1] || "",
                email: user.email,
                uid: user.uid,
            }, { merge: true });

            alert(`Welcome, ${user.displayName}! Redirecting...`);
            window.location.href = "dashboard.html"; // Redirect after Google sign-in
        } catch (error) {
            alert(`Google Sign-In Error: ${error.message}`);
        } finally {
            loader.style.display = "none";
        }
    });
});
window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
    'size': 'invisible',
    'callback': function(response) {
        console.log("reCAPTCHA verified!");
    }
});
