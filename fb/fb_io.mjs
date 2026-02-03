/*******************************************************/
// fb_io.mjs
// Written by Idrees Munshi 
// 2026
/*******************************************************/
const COL_C = 'white';	    // These two const are part of the coloured 	
const COL_B = '#CD7F32';	//  console.log for functions scheme
console.log('%cfb_io.mjs running', 'color: blue; background-color: white;');

// Imports 
import { getDatabase, ref, set, get, update, query, limitToLast, orderByChild, serverTimestamp, remove } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import { GoogleAuthProvider, getAuth, signOut, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js";

// Exports
export var [database, app] = fb_initialise();
export {
    fb_initialise
}

/*******************************************************/
// fb_initialise()
// Initialise connection to Firebase
// Called by end_gameScoreScreen.html
// Input: N/A
// Returns: database, app
/*******************************************************/
function fb_initialise() {
    console.log('%c fb_initialise(): ',
        'color: ' + COL_C + '; background-color: ' + COL_B + ';');

    // Config for FB app
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: "AIzaSyCMMs5kHbSUMnPyf2UWcKSy19HvB-PcV1U",
        authDomain: "comp-idrees-munshi.firebaseapp.com",
        projectId: "comp-idrees-munshi",
        storageBucket: "comp-idrees-munshi.firebasestorage.app",
        messagingSenderId: "619179593445",
        appId: "1:619179593445:web:1dfc6163eeb080e8da8e0c",
        measurementId: "G-PSEYN1X511"
    };

    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    return [database, app];
}