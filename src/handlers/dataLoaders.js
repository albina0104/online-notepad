import Firestore from './firestore';

const Loaders = {
  notesLoader: async (uid) => {
    const { readNotes } = Firestore;
    const notesList = [];

    if (uid) {
      const notes = await readNotes(uid);

      notes.forEach((doc) => {
        notesList.push({ noteId: doc.id, ...doc.data() });
      });
    }
    return notesList;
  },

  noteLoader: async (noteId) => {
    const { readNote } = Firestore;
    return await readNote(noteId);
  },
};

export default Loaders;
