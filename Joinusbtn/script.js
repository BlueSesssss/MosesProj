import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithPopup,
    signOut,
    GoogleAuthProvider,
    onAuthStateChanged
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyADuDbkzTgTwL4rviKK0LFIwHGVXaqGizE",
    authDomain: "donarc-728b7.firebaseapp.com",
    projectId: "donarc-728b7",
    storageBucket: "donarc-728b7.appspot.com",
    messagingSenderId: "750915012102",
    appId: "1:750915012102:web:c8ad2383789dd9ff952587",
    measurementId: "G-FKJCE3Y193",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

const profileMenu = document.getElementById("profile-menu");
const joinUsBtn = document.querySelector(".join-us-btn");
const signOutBtn = document.getElementById("sign-out");
const profileIcon = document.getElementById("profile-icon");

onAuthStateChanged(auth, async (user) => {
    if (user) {
        joinUsBtn.style.display = "none";
        profileMenu.style.display = "block";
        
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (!userDoc.exists()) {
            await setDoc(doc(db, "users", user.uid), {
                firstName: user.displayName?.split(" ")[0] || "",
                lastName: user.displayName?.split(" ")[1] || "",
                email: user.email,
                uid: user.uid,
            });
        }

        if (user.photoURL) {
            profileIcon.src = user.photoURL;
        } else {
            profileIcon.src = "default-profile.png";
        }
    } else {
        joinUsBtn.style.display = "block";
        profileMenu.style.display = "none";
    }
});

signOutBtn.addEventListener("click", async () => {
    await signOut(auth);
    window.location.reload();
});

// Email/password sign-up
const form = document.querySelector(".signup-form form");
form.addEventListener("submit", async function (event) {
    event.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    if (password.length < 8) {
        alert("Password must be at least 8 characters long.");
        return;
    }
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        alert("Sign-up successful!");
        window.location.href = "dashboard.html";
    } catch (error) {
        alert(error.message);
    }
});

// Google sign-in
const googleSignInBtn = document.querySelector(".google-signin-btn");
googleSignInBtn.addEventListener("click", async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        alert(`Welcome, ${result.user.displayName}!`);
        window.location.href = "dashboard.html";
    } catch (error) {
        alert(error.message);
    }
});
