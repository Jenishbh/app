// functions/index.js
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.setManagerRole = functions.auth.user().onCreate((user) => {
  const managersList = ["test@gmail.com"]; // Replace with real manager emails
  if (managersList.includes(user.email)) {
    return admin.auth().setCustomUserClaims(user.uid, {role: "manager"});
  } else {
    return admin.auth().setCustomUserClaims(user.uid, {role: "user"});
  }
});
