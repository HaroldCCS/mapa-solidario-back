import admin from 'firebase-admin';

// import credentials from './credentials';

admin.initializeApp({
  credential: admin.credential.cert({} as any)
});

export default admin;
