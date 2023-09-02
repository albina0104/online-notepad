import { useLoaderData } from 'react-router-dom';
import NoteCard from './NoteCard';

function NoteList() {
  const notes = useLoaderData();

  return (
    <>
      <h1 className='text-center mt-4 mb-4'>My Notes</h1>
      <div className='container mb-4'>
        <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6 g-4'>
          {notes.map((note) => (
            <NoteCard key={note.noteId} {...note} />
          ))}
        </div>
      </div>
    </>
  );
}

export default NoteList;
