import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
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
};

export default Firestore;
