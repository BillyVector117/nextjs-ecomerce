// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

/// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCvHkAvqEXq9suCPphMswHEEvoSbNbRUho",
    authDomain: "fir-project-99843.firebaseapp.com",
    databaseURL: "https://fir-project-99843.firebaseio.com",
    projectId: "fir-project-99843",
    storageBucket: "fir-project-99843.appspot.com",
    messagingSenderId: "348622005402",
    appId: "1:348622005402:web:5909b75ccb8f10c09c2b23"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig, 'firebaseProject');

const auth = getAuth(firebase);

export { auth };


