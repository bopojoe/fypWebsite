let express = require('express');
let handler = express.Router();

var list = []; 



handler.returnItems =  (req, res) => {
  let firebase = require("firebase/app");
var user = firebase.auth().currentUser;

if (user) {
  console.log(user)
} else {
  console.log("no user here...")
}


// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase.storage();

// Create a storage reference from our storage service
var storageRef = storage.ref();

// Create a reference under which you want to list
var listRef = storageRef.child('files/uid');

// Find all the prefixes and items.
listRef.listAll().then(function(res) {
  res.prefixes.forEach(function(folderRef) {
    // All the prefixes under listRef.
    // You may call listAll() recursively on them.
  });
  res.items.forEach(function(itemRef) {
    list.push(itemRef);
  });
}).catch(function(error) {
  // Uh-oh, an error occurred!
});
res.JSON(list);
}

exports.handler;