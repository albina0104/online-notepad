import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../lib/firebase.config';

const googleProvider = new GoogleAuthProvider();

const FirebaseAuth = {
  signIn: async () => {
    const { user } = await signInWithPopup(auth, googleProvider);
    return user;
  },

  signOut: async () => {
    await signOut(auth);
  },

  getCurrentUser: () => {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
        resolve(user);
      });
    });
  },
};

export default FirebaseAuth;
