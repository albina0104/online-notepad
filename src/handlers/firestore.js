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
    try {
      const docRef = doc(db, 'notes', noteId);
      const docSnap = await getDoc(docRef);
      return docSnap.data();
    } catch {
      console.error('Could not read the note from Firestore');
    }
  },

  saveNote: async (noteId, title, color, text) => {
    const { readNote } = Firestore;
    const docRef = doc(db, 'notes', noteId);
    await updateDoc(docRef, {
      noteTitle: title,
      noteColor: color,
      noteText: text,
      noteUpdatedAt: serverTimestamp(),
    });
    const { noteUpdatedAt } = await readNote(noteId);
    return noteUpdatedAt;
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

  changeNoteColor: async (noteId, color) => {
    const docRef = doc(db, 'notes', noteId);
    await updateDoc(docRef, { noteColor: color });
  },
};

export default Firestore;
