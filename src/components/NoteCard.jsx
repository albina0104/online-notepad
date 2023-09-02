import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import timestampToDate from '../functions/timestampToDate';

function NoteCard({ noteId, noteTitle, noteText, noteUpdatedAt }) {
  return (
    <>
      <div className='col'>
        <div className='card text-center h-100'>
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
            <a href='#' className='btn'>
              🗑️
            </a>
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
  noteTitle: PropTypes.string,
  noteUpdatedAt: PropTypes.object,
};

export default NoteCard;
