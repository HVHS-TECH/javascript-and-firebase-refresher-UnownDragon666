/*******************************************************/
// fb_main.mjs
// Written by Idrees Munshi 
// 2026
/*******************************************************/
console.log('%cfb_main.mjs running', 'color: blue; background-color: white;');

// Imports
import {
    fb_initialise, fb_writeRec, fb_readRec, fb_profileAuthState,
    fb_authenticate, fb_logout
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
function upload() {
    // If not logged in, authenticate
    let user = fb_authenticate();

    console.log(user);

    // Get message
    let message = document.getElementById("i_text").value;

    // Write message to database
    fb_writeRec('/messages', { user: null, message: message, timestamp: Date.now() });
}

function showMessage() {
    fb_readRec('/messages/message').then((data) => {
        document.getElementById("message").innerHTML = data;
    })
}