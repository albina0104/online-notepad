import { useEffect } from 'react';
import './App.css';
import Firestore from './handlers/firestore';
import Navbar from './components/Navbar';
import NoteList from './components/NoteList';

function App() {
  const { readNotes } = Firestore;

  useEffect(() => {
    readNotes();
  }, []);

  return (
    <>
      <Navbar />
      <NoteList />
    </>
  );
}

export default App;
