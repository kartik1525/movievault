const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT || path.join(__dirname, '../../firebase-service-account.json');

try {
  if (fs.existsSync(serviceAccountPath)) {
    const serviceAccount = require(serviceAccountPath);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log('[Firebase Admin] Initialized with Service Account');
  } else {
    // Scaffold initialization when service account is absent in local dev environment
    admin.initializeApp({
      projectId: process.env.FIREBASE_PROJECT_ID || 'cinevault-demo',
    });
    console.log('[Firebase Admin] Initialized in default mode');
  }
} catch (error) {
  console.warn('[Firebase Admin Warning] Initialization failed:', error.message);
}

module.exports = admin;
