import admin from 'firebase-admin';
import require from 'requirejs';

const firebase_service = require('../../../config/firebase_config.json');

admin.initializeApp({
  credential: admin.credential.cert(firebase_service),
});

export const firebaseAdmin = {
  send: async (message) => {
    try {
      await admin.messaging().send(message);
      return 'Successfully notification sent';
    } catch (err) {
      console.log(err);
      return null;
    }
  },
};
