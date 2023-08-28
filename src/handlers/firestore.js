import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase.config';

const Firestore = {
  readNotes: async () => {
    const querySnapshot = await getDocs(collection(db, 'notes'));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
  },
};

export default Firestore;
