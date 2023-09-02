import Firestore from './firestore';

const Loaders = {
  notesLoader: async () => {
    const { readNotes } = Firestore;
    const notesList = [];
    const notes = await readNotes();

    notes.forEach((doc) => {
      notesList.push({ noteId: doc.id, ...doc.data() });
    });

    return notesList;
  },
};

export default Loaders;
