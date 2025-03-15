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

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Form Submission
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from refreshing the page

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;

    db.collection("contacts").add({
        name: name,
        email: email,
        message: message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        document.getElementById("formMessage").innerText = "Message sent successfully!";
        document.getElementById("formMessage").style.color = "green";
        document.getElementById("contactForm").reset();
    })
    .catch(error => {
        document.getElementById("formMessage").innerText = "Error sending message!";
        document.getElementById("formMessage").style.color = "red";
        console.error("Error writing document: ", error);
    });
});
