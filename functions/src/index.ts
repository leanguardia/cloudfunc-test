import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((req, res) => {
 res.send("Hello from Firebase!");
});

export const addMessage = functions.https.onRequest((req, res) => {
    const original = req.query.text;
    admin.database().ref('/messages').push({original: original}).then((snapshot) => {
        res.redirect(303, snapshot.ref.toString());
    });
});

export const makeUppercase = functions.database.ref('/messages/{pushId}/original')
    .onCreate((snapshot, context) => {
        const original = snapshot.val();
        console.log('Uppercasing', context.params.pushId, original);
        const uppercase = original.toUpperCase();
        return snapshot.ref.parent.child('uppercase').set(uppercase);
    });