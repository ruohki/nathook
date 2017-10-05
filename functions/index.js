const functions = require('firebase-functions');
const admin = require('firebase-admin');

/* const firebase = require('firebase/app');
require("firebase/database");
 */
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
admin.initializeApp(functions.config().firebase);

exports.webhook = functions.https.onRequest((request, response) => {
  const { id = false } = request.query;
  console.log(request.body);
  admin.database().ref(`users/${id}/projects`).push(JSON.parse(request.body.payload));
  //firebase.database().ref(`/projects/${id}`).set({test: Date.now()});
  response.json({result: true});
});

/*
"action": "opened",
  "issue": {
    "url": "https://api.github.com/repos/octocat/Hello-World/issues/1347",
    "number": 1347,
    ...
  },
  "repository" : {
    "id": 1296269,
    "full_name": "octocat/Hello-World",
    "owner": {
      "login": "octocat",
      "id": 1,
      ...
    },
    ...
  },
  "sender": {
    "login": "octocat",
    "id": 1,
    ...
  }
*/