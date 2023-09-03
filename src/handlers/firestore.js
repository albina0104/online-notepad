import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../lib/firebase.config';

const Firestore = {
  readNotes: async () => {
    return await getDocs(collection(db, 'notes'));
  },

  readNote: async (noteId) => {
    const docRef = doc(db, 'notes', noteId);
    const docSnap = await getDoc(docRef);

    return docSnap.data();
  },

  saveNote: async (noteId, title, color, text) => {
    const docRef = doc(db, 'notes', noteId);
    await updateDoc(docRef, {
      noteTitle: title,
      noteColor: color,
      noteText: text,
      noteUpdatedAt: serverTimestamp(),
    });
  },
};

export default Firestore;
