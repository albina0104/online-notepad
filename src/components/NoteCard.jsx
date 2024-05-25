import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Firestore from '../handlers/firestore';
import timestampToDate from '../functions/timestampToDate';
import { useFirestoreContext } from '../context/FirestoreContext';
import ColorChooserModal from './ColorChooserModal';

function NoteControls({ noteId, noteColor }) {
  const { loadNotes } = useFirestoreContext();
  const { deleteNote } = Firestore;

  const handleDelete = async () => {
    await deleteNote(noteId);
    alert('Note deleted successfully!');
    loadNotes();
  };

  return (
    <div
      className='btn-group'
      role='group'
      style={{
        display: 'block',
        position: 'absolute',
        top: 'var(--bs-border-width)',
        right: 'var(--bs-border-width)',
      }}
    >
      <button
        type='button'
        className='btn'
        data-bs-toggle='dropdown'
        aria-expanded='false'
        style={{
          width: '30px',
          height: '30px',
          padding: '0',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          borderRadius: '0 var(--bs-border-radius)',
        }}
      >
        ...
      </button>
      <ul className='dropdown-menu'>
        <li>
          <button
            type='button'
            className='btn btn-primary dropdown-item'
            data-bs-toggle='modal'
            data-bs-target={`#colorChooserModal-${noteId}`}
          >
            🎨 Change note color
          </button>
        </li>
        <li>
          <Link to={`note/${noteId}`} className='btn dropdown-item'>
            ✏️ Edit note
          </Link>
        </li>
        <li>
          <button
            type='button'
            aria-label='Delete note'
            onClick={handleDelete}
            className='btn dropdown-item'
          >
            🗑️ Delete note
          </button>
        </li>
      </ul>
      <ColorChooserModal noteId={noteId} noteColor={noteColor} />
    </div>
  );
}
NoteControls.propTypes = {
  noteId: PropTypes.string,
  noteColor: PropTypes.string,
};

function NoteCard({ noteId, noteTitle, noteColor, noteText, noteUpdatedAt }) {
  return (
    <>
      <div className='col'>
        <div
          style={{
            position: 'relative',
          }}
        >
          <Link
            to={`note/${noteId}`}
            style={{
              textDecoration: 'none',
            }}
          >
            <div
              className='card text-center h-100'
              style={{ backgroundColor: noteColor }}
            >
              <div
                className='card-header'
                style={{ position: 'relative', minHeight: '31px' }}
              >
                <h5 className='card-title ps-3 pe-3'>{noteTitle}</h5>
              </div>
              <div className='card-body'>
                <p className='card-text'>{noteText}</p>
              </div>
              <div className='card-footer text-body-secondary'>
                {timestampToDate(noteUpdatedAt)}
              </div>
            </div>
          </Link>
          <NoteControls noteId={noteId} noteColor={noteColor} />
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
