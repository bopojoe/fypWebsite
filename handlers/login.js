let express = require('express');
let handler = express.Router();

var firebase = require("firebase/app");
//Initialize Firebase
firebase.initializeApp({
    apiKey: "AIzaSyDusnCoIf78UhpGEAh0SDRPZlYVooR9S88",
    authDomain: "finalyearproject-281817.firebaseapp.com",
    databaseURL: "https://finalyearproject-281817.firebaseio.com",
    projectId: "finalyearproject-281817",
    storageBucket: "finalyearproject-281817.appspot.com",
    messagingSenderId: "466084356519",
    appId: "1:466084356519:web:95db0c6de7517af7c11682",
    measurementId: "G-3637EP171E"
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
            res.redirect("/loggedIn");

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