import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  addDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../lib/firebase.config';

const Firestore = {
  readNotes: async (uid) => {
    const q = query(collection(db, 'notes'), where('noteAuthorUid', '==', uid));
    return await getDocs(q);
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

  createNote: async (uid) => {
    const docRef = await addDoc(collection(db, 'notes'), {
      noteAuthorUid: uid,
      noteTitle: '',
      noteColor: '#ffffff',
      noteText: '',
      noteCreatedAt: serverTimestamp(),
      noteUpdatedAt: serverTimestamp(),
    });
    return docRef.id;
  },

  deleteNote: async (noteId) => {
    await deleteDoc(doc(db, 'notes', noteId));
  },
};

export default Firestore;
