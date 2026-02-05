/*******************************************************/
// fb_main.mjs
// Written by Idrees Munshi 
// 2026
/*******************************************************/
console.log('%cfb_main.mjs running', 'color: blue; background-color: white;');

// Imports
import {
    fb_initialise, fb_writeRec, fb_readRec, fb_authenticate, 
    fb_logout, getAuth,
    fb_push
} from './fb_io.mjs';

window.init = fb_initialise;
window.upload = upload;
window.showMessage = showMessage;
window.logout = fb_logout;

/*******************************************************/
// upload()
// Uploads message to database
// Input: N/A
// Returns: N/A
/*******************************************************/
async function upload() {
    // If not logged in, authenticate
    await fb_authenticate();

    let auth = getAuth();
    if (auth.currentUser != null) {
        console.log(auth.currentUser);
        fb_writeRec(`/users/${auth.currentUser.uid}`, { username: auth.currentUser.displayName })

        // Get message
        let message = document.getElementById("i_text").value;

        // Write message to database
        const KEY = fb_push(`/messages`);
        console.log(KEY);
        fb_writeRec(`/messages/${KEY.key}`, { uid: auth.currentUser.uid, username: auth.currentUser.displayName, message: message, timestamp: Date.now() });
    } else {
        console.log("OH NO")
    }
}

function showMessage() {
    fb_readRec('/messages/message').then((data) => {
        document.getElementById("message").innerHTML = data;
    })
}