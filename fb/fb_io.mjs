/*******************************************************/
// fb_io.mjs
// Written by Idrees Munshi 
// 2026
/*******************************************************/
const COL_C = 'white';	    // These two const are part of the coloured 	
const COL_B = '#CD7F32';	//  console.log for functions scheme
console.log('%cfb_io.mjs running', 'color: blue; background-color: white;');

// Imports 
import { getDatabase, ref, set, get, update, query, limitToLast, orderByChild, serverTimestamp, remove, push, onValue } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import { GoogleAuthProvider, getAuth, signOut, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js";

// Exports
export var [database, app] = fb_initialise();
export var auth = getAuth();

export {
    fb_initialise, fb_writeRec, fb_readRec, fb_authState,
    fb_authenticate, fb_logout, getAuth, fb_push,
    fb_query, fb_showMessages
};

/*******************************************************/
// fb_initialise()
// Initialise connection to Firebase
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
// Input: N/A
// Returns: N/A
/*******************************************************/
async function fb_authenticate() {
    console.log('%c fb_authenticate(): ',
        'color: ' + COL_C + '; background-color: ' + COL_B + ';');

    if (getAuth() == null) {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });

        try {
            let result = await signInWithPopup(auth, provider)
            console.log(result);
        } catch (error) {
            reject(error);
        }
    }
}

onAuthStateChanged(auth, (user) => {
    if (user) {

    }
})

/*******************************************************/
// fb_writeRec
// Write record to Firebase
// Called in many locations throughout project, including during authentication
// Input: _path as a string (path to write to), _data as an object (data to write)
// Returns: N/A
/*******************************************************/
function fb_writeRec(_path, _data) {
    console.log('%c fb_writeRec(): ',
        'color: ' + COL_C + '; background-color: ' + COL_B + ';');

    const REF = ref(database, _path);
    set(REF, _data).then(() => {
        console.log('Data written successfully');
    }).catch((error) => {
        console.error('Error writing data: ', error);
    });
}

/*******************************************************/
// fb_readRec
// Read record from Firebase
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
// fb_authState()
// Return user login state
// Input: N/A
// Returns: N/A
/*******************************************************/
function fb_authState() {
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

/*******************************************************/
// fb_push()
// Generate message key
// Input: _path
// Returns: Unique message key
/*******************************************************/
function fb_push(_path) {
    console.log('%c fb_push(): ',
        'color: ' + COL_C + '; background-color: ' + COL_B + ';');

    const DB = getDatabase();
    const REF = ref(DB, _path);
    return push(REF);
}

/*******************************************************/
// fb_query
// Query Firebase
// Input: _path as a string (path to query), _limit as an integer (number of records to return)
// Returns: snapshot.val() which is an object containing the data read
/*******************************************************/
function fb_query(_path, _limit) {
    console.log('%c fb_query(): ',
        'color: ' + COL_C + '; background-color: ' + COL_B + ';');

    const DB = getDatabase();
    const REF = query(ref(DB, _path), orderByChild('timestamp'), limitToLast(_limit));
    return new Promise((resolve, reject) => {
        get(REF).then((snapshot) => {
            resolve(snapshot.val());
        }).catch((error) => {
            reject(error);
        })
    })
}

/*******************************************************/
// fb_showMessages()
// Read recent messages from database and display them
// Input: N/A
// Returns: N/A
/*******************************************************/
function fb_showMessages() {
    const DB = getDatabase();

    const messageQuery = query(ref(DB, `/messages`), orderByChild(`timestamp`), limitToLast(10));

    onValue(messageQuery, (snapshot) => {
        const CHATROOM = document.getElementById("chatroom");
        CHATROOM.innerHTML = ""

        const DATA = snapshot.val();
        const MESSAGES = Object.entries(DATA);
        console.log(MESSAGES);
        for (let i = 0; i < 10; i++) {
            let row = document.createElement(`li`);
            row.innerHTML = `<li id="message${i}">${MESSAGES[i][1].username} says: ${MESSAGES[i][1].message}</li>`
            // Timestamp can be converted to date and time later for flourish
            CHATROOM.appendChild(row);
        }
    })

}