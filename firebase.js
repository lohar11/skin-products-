import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js"; 
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCHZX5ImciW3PCnwQQcFgGhuCBrljqlJx0",
  authDomain: "login-example-2831e.firebaseapp.com",
  projectId: "login-example-2831e",
  storageBucket: "login-example-2831e.appspot.com",
  messagingSenderId: "370204501307",
  appId: "1:370204501307:web:84ca0a6079c13587e3831e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Signup Function
document.getElementById('signupForm').addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const dob = document.getElementById('signupDOB').value;

    if (!name || !email || !password || !confirmPassword || !dob) {
        alert("Please fill in all fields.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            // Store user data in localStorage
            const userData = { name, email, password, dob };
            localStorage.setItem("userData", JSON.stringify(userData));

            alert("Account Created Successfully!");
            window.location.reload(); // Reload to show login form
        })
        .catch((error) => {
            alert(error.message);
        });
});

// Login Function
document.getElementById('loginForm').addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            // Check if user data exists
            const storedUserData = JSON.parse(localStorage.getItem("userData"));

            if (storedUserData && storedUserData.email === email && storedUserData.password === password) {
                alert("Login Successful!");
                window.location.href = "web6.html";
            } else {
                alert("User not found! Please sign up.");
            }
        })
        .catch((error) => {
            alert(error.message);
        });
});

// Show Signup Form
document.getElementById('showSignUp').addEventListener("click", function () {
    document.getElementById('loginForm').classList.add("hidden");
    document.getElementById('signupForm').classList.remove("hidden");
});

// Show Login Form
document.getElementById('showLogin').addEventListener("click", function () {
    document.getElementById('signupForm').classList.add("hidden");
    document.getElementById('loginForm').classList.remove("hidden");
});