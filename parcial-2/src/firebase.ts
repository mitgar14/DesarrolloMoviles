import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = { // hardcodeado por facilidad :P - igual todo esto se borra luego
    apiKey: "AIzaSyAksZHghmkz8VAKaBbyXBr_vH-2rSQG_a8",
    authDomain: "practicas-uao-c747c.firebaseapp.com",
    databaseURL: "https://practicas-uao-c747c-default-rtdb.firebaseio.com",
    projectId: "practicas-uao-c747c",
    storageBucket: "practicas-uao-c747c.firebasestorage.app",
    messagingSenderId: "657431629479",
    appId: "1:657431629479:web:e12e6f8780a9539ca35582"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const fsDb = getFirestore(app);
export const rtDb = getDatabase(app);