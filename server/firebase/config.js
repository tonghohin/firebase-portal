const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const { initializeApp, cert } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const { getFirestore } = require("firebase-admin/firestore");

const admin = initializeApp({ credential: cert(JSON.parse(process.env.ADMIN_SDK)) });
const auth = getAuth(admin);
const db = getFirestore(admin);

module.exports = { auth, db };
