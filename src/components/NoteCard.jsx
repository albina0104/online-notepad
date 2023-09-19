import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Firestore from '../handlers/firestore';
import timestampToDate from '../functions/timestampToDate';

function NoteCard({ noteId, noteTitle, noteColor, noteText, noteUpdatedAt }) {
  const { deleteNote } = Firestore;

  const handleDelete = async () => {
    await deleteNote(noteId);
    alert('Note deleted successfully!');
  };

  return (
    <>
      <div className='col'>
        <div
          className='card text-center h-100'
          style={{ backgroundColor: noteColor }}
        >
          <Link to={`note/${noteId}`} className='card-header'>
            <h5 className='card-title'>{noteTitle}</h5>
          </Link>
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
