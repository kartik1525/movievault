import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile as firebaseUpdateProfile,
  sendEmailVerification,
} from 'firebase/auth';
import { auth } from '@/config/firebase';
import { syncUser } from '@/api/backend';
import { setAuthToken } from '@/api/axios';

export async function loginUser(email: string, pass: string) {
  const userCredential = await signInWithEmailAndPassword(auth, email, pass);
  const token = await userCredential.user.getIdToken();
  setAuthToken(token);
  try {
    await syncUser();
  } catch {
    // Backend may be offline in dev, allow auth to proceed
  }
  return userCredential.user;
}

export async function registerUser(email: string, pass: string, displayName: string) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
  await firebaseUpdateProfile(userCredential.user, { displayName });
  try {
    await sendEmailVerification(userCredential.user);
  } catch {
    // Ignore if email verification fails in dev environment
  }
  const token = await userCredential.user.getIdToken();
  setAuthToken(token);
  try {
    await syncUser();
  } catch {
    // Ignore backend offline in dev
  }
  return userCredential.user;
}

export async function logoutUser() {
  await firebaseSignOut(auth);
  setAuthToken(null);
}

export async function resetPassword(email: string) {
  await sendPasswordResetEmail(auth, email);
}

export async function updateUserDisplayName(displayName: string) {
  if (auth.currentUser) {
    await firebaseUpdateProfile(auth.currentUser, { displayName });
    try {
      await syncUser();
    } catch {
      // Ignore backend offline
    }
  }
}
