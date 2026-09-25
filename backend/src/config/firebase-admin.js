const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT || path.join(__dirname, '../../firebase-service-account.json');

try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    // Render/Production deployment mode (parses raw JSON string from env var)
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log('[Firebase Admin] Initialized from Environment Variable');
  } else if (fs.existsSync(serviceAccountPath)) {
    // Local development mode
    const serviceAccount = require(serviceAccountPath);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log('[Firebase Admin] Initialized with Service Account File');
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
