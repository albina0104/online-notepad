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

  noteLoader: async ({ params }) => {
    const { readNote } = Firestore;
    return await readNote(params.noteId);
  },
};

export default Loaders;
