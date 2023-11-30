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

exports.deleteOldReservations = functions.pubsub
    .schedule("every 24 hours").onRun(async (context) => {
      const today = new Date();
      const tablesRef = admin.firestore().collection("Tables");

      const tablesSnapshot = await tablesRef.get();

      for (const tableDoc of tablesSnapshot.docs) {
        const reservationsRef = tableDoc.ref.collection("Reservation");
        const reservationsSnapshot = await reservationsRef
            .where("Date", "<", admin.firestore.Timestamp.fromDate(today))
            .get();

        const batch = admin.firestore().batch();
        reservationsSnapshot.forEach((doc) => {
          batch.delete(doc.ref);
        });

        await batch.commit();
      }

      return null;
    });


