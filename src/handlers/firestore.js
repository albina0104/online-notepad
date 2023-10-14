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
    try {
      const q = query(
        collection(db, 'notes'),
        where('noteAuthorUid', '==', uid)
      );
      return await getDocs(q);
    } catch {
      console.error('Could not read notes from Firestore');
    }
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
    try {
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
    } catch {
      console.error('Could not save note to Firestore');
    }
  },

  createNote: async (uid) => {
    try {
      const docRef = await addDoc(collection(db, 'notes'), {
        noteAuthorUid: uid,
        noteTitle: '',
        noteColor: '#ffffff',
        noteText: '',
        noteCreatedAt: serverTimestamp(),
        noteUpdatedAt: serverTimestamp(),
      });
      return docRef.id;
    } catch {
      console.error('Could not create note');
    }
  },

  deleteNote: async (noteId) => {
    try {
      await deleteDoc(doc(db, 'notes', noteId));
    } catch {
      console.error('Could not delete note');
    }
  },

  changeNoteColor: async (noteId, color) => {
    try {
      const docRef = doc(db, 'notes', noteId);
      await updateDoc(docRef, { noteColor: color });
    } catch {
      console.error('Could not change note color');
    }
  },
};

export default Firestore;
