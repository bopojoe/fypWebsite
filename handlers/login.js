let express = require('express');
let handler = express.Router();

var firebase = require("firebase/app");
//Initialize Firebase
firebase.initializeApp({
    apiKey: "AIzaSyDnSLJ5GgoNeIeugyY7PqyMQu291lu-yi4",
    authDomain: "iosappfyp.firebaseapp.com",
    databaseURL: "https://iosappfyp.firebaseio.com",
    projectId: "iosappfyp",
    storageBucket: "iosappfyp.appspot.com",
    messagingSenderId: "511167822434",
    appId: "1:511167822434:web:a4dd9f70f4adeb200eaf3b"
});
// var config = require("../configs/firebase.js")
// firebase.initializeApp(config);

require("firebase/auth");

var isUser = false;

handler.authenticate =  (req, res) => {
    test(req.body.email, req.body.password)

     firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log(`user joged in with id ${user.uid}`);
            isUser = true;
            res.redirect("/");

        } else {
            console.log("no user");
        }

    });



}

function check() {
    var returnValue = ""
    return returnValue = isUser ? "/" : "/login"
}
function test(email, password) {

    if (email && password != "") {
        console.log(email, password);
    }

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, error)
    });
}
module.exports = handler;