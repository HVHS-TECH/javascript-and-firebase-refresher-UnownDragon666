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
    fb_initialise, fb_writeRec, fb_readRec, fb_profileAuthState,
    fb_authenticate, fb_logout
};

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


/*******************************************************/
// fb_authenticate()
// Authenticate with Google
// Called in index.html, by button in sidebar
// Input: N/A
// Returns: N/A
/*******************************************************/
function fb_authenticate() {
    console.log('%c fb_authenticate(): ',
        'color: ' + COL_C + '; background-color: ' + COL_B + ';');

    return new Promise((resolve, reject) => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });

        onAuthStateChanged(auth, (user) => {
            if (user) {
                resolve(user);
            } else {
                signInWithPopup(auth, provider).then((result) => {
                    console.log(result);
                    auth.onAuthStateChanged((user) => {
                        resolve(user);
                    })
                }).catch((error) => {
                    reject(error);
                });
            }
        })
    })
}


/*******************************************************/
// fb_writeRec
// Write record to Firebase
// Called in many locations throughout project, including during authertication
// Input: _path as a string (path to write to), _data as an object (data to write)
// Returns: N/A
/*******************************************************/
function fb_writeRec(_path, _data) {
    console.log('%c fb_writeRec(): ',
        'color: ' + COL_C + '; background-color: ' + COL_B + ';');

    const DB = getDatabase();
    const REF = ref(DB, _path);
    set(REF, _data).then(() => {
        console.log('Data written successfully');
    }).catch((error) => {
        console.error('Error writing data: ', error);
    });
}


/*******************************************************/
// fb_readRec
// Read record from Firebase
// Called in fb_authenticate to check if user exists
// Input: _path as a string (path to read from)
// Returns: snapshot.val() which is an object containing the data read
/*******************************************************/
function fb_readRec(_path) {
    console.log('%c fb_readRec(): ',
        'color: ' + COL_C + '; background-color: ' + COL_B + ';');

    const DB = getDatabase();
    const REF = ref(DB, _path);
    return get(REF).then((snapshot) => {
        return snapshot.val();
    }).catch((error) => {
        console.error(error);
    })
}

/*******************************************************/
// fb_profileAuthState()
// Check if user is logged in
// Called in gmAcc_profile.html
// Input: N/A
// Returns: N/A
/*******************************************************/
function fb_profileAuthState() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        return new Promise((resolve, reject) => {
            if (user) {
                resolve(user);
            } else {
                reject("No user logged in");
            }
        })
    })
}

/*******************************************************/
// fb_logout()
// Log out of Firebase
// Called in index.html, by button in sidebar
// Input: N/A
// Returns: N/A
/*******************************************************/
function fb_logout() {
    console.log('%c fb_logout(): ',
        'color: ' + COL_C + '; background-color: ' + COL_B + ';');

    const auth = getAuth();
    signOut(auth).then(() => {
        console.log('User signed out');
    }).catch((error) => {
        console.error(error);
    });
}

