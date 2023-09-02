import { useEffect, useState } from 'react';
import './App.css';
import Firestore from './handlers/firestore';
import Navbar from './components/Navbar';
import NoteList from './components/NoteList';

function App() {
  const { readNotes } = Firestore;
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const notesList = [];
    readNotes().then((docs) => {
      docs.forEach((doc) => {
        notesList.push({ noteId: doc.id, ...doc.data() });
      });
      setNotes(notesList);
    });
  }, []);

  return (
    <>
      <Navbar />
      <NoteList notes={notes} />
    </>
  );
}

export default App;
