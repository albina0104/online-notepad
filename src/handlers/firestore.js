import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase.config';

const Firestore = {
  readNotes: async () => {
    return await getDocs(collection(db, 'notes'));
  },
};

export default Firestore;
