import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Firestore from '../handlers/firestore';
import timestampToDate from '../functions/timestampToDate';
import { useFirestoreContext } from '../context/FirestoreContext';

function NoteControls() {
  return (
    <div
      className='btn-group float-end'
      role='group'
      style={{ display: 'inline-block', width: '30px', height: '30px' }}
    >
      <button
        type='button'
        className='btn'
        data-bs-toggle='dropdown'
        aria-expanded='false'
      >
        ...
      </button>
      <ul className='dropdown-menu'>
        <li>
          <a className='dropdown-item' href='#'>
            🎨 Change note color
          </a>
        </li>
        <li>
          <a className='dropdown-item' href='#'>
            ✏️ Edit note
          </a>
        </li>
        <li>
          <button type='button' aria-label='Delete note' className='btn'>
            🗑️ Delete note
          </button>
        </li>
      </ul>
    </div>
  );
}

function NoteCard({ noteId, noteTitle, noteColor, noteText, noteUpdatedAt }) {
  const { loadNotes } = useFirestoreContext();
  const { deleteNote } = Firestore;

  const handleDelete = async () => {
    await deleteNote(noteId);
    alert('Note deleted successfully!');
    loadNotes();
  };

  return (
    <>
      <div className='col'>
        <div
          className='card text-center h-100'
          style={{ backgroundColor: noteColor }}
        >
          <div className='card-header'>
            <Link to={`note/${noteId}`} style={{ display: 'inline-block' }}>
              <h5 className='card-title'>{noteTitle}</h5>
            </Link>
            <NoteControls />
          </div>
          <div className='card-body'>
            <p className='card-text'>{noteText}</p>
            <a href='#' className='btn'>
              🎨
            </a>
            <a href='#' className='btn'>
              ✏️
            </a>
            <button
              type='button'
              aria-label='Delete note'
              onClick={handleDelete}
              className='btn'
            >
              🗑️
            </button>
          </div>
          <div className='card-footer text-body-secondary'>
            Updated at {timestampToDate(noteUpdatedAt)}
          </div>
        </div>
      </div>
    </>
  );
}
NoteCard.propTypes = {
  noteId: PropTypes.string,
  noteText: PropTypes.string,
  noteColor: PropTypes.string,
  noteTitle: PropTypes.string,
  noteUpdatedAt: PropTypes.object,
};

export default NoteCard;
