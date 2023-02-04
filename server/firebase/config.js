const { initializeApp, cert } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("./adminSDK.json");

const admin = initializeApp({ credential: cert(serviceAccount) });
const auth = getAuth(admin);
const db = getFirestore(admin);

module.exports = { auth, db };
