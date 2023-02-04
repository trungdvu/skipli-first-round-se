import * as firebaseAdmin from "firebase-admin";

import * as serviceAccount from "../config/firebase-adminsdk-service-account.json";

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount as any),
});

const db = firebaseAdmin.firestore();

export const UserCol = db.collection("users");

export { firebaseAdmin, db };
