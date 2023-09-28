import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Firestore from '../handlers/firestore';
import timestampToDate from '../functions/timestampToDate';
import { useFirestoreContext } from '../context/FirestoreContext';

function NoteControls({ noteId, noteColor }) {
  const { loadNotes } = useFirestoreContext();
  const { deleteNote, changeNoteColor } = Firestore;

  const handleColorChange = async (noteId, event) => {
    await changeNoteColor(noteId, event.target.value);
    loadNotes();
  };

  const handleDelete = async () => {
    await deleteNote(noteId);
    alert('Note deleted successfully!');
    loadNotes();
  };

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
            <label style={{ position: 'relative' }}>
              <input
                type='color'
                className='form-control form-control-color'
                name='colorInput'
                id='colorInput'
                defaultValue={noteColor}
                title='Choose your color'
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  opacity: '0',
                }}
                onChange={(event) => {
                  handleColorChange(noteId, event);
                }}
              ></input>
              🎨 Change note color
            </label>
          </a>
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
          className='card text-center h-100'
          style={{ backgroundColor: noteColor }}
        >
          <div className='card-header'>
            <Link to={`note/${noteId}`} style={{ display: 'inline-block' }}>
              <h5 className='card-title'>{noteTitle}</h5>
            </Link>
            <NoteControls noteId={noteId} noteColor={noteColor} />
          </div>
          <div className='card-body'>
            <p className='card-text'>{noteText}</p>
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
