import PropTypes from 'prop-types';
import timestampToDate from '../functions/timestampToDate';

function NoteCard({ noteTitle, noteText, noteUpdatedAt }) {
  return (
    <>
      <div className='col'>
        <div className='card text-center h-100'>
          <div className='card-header'>
            <h5 className='card-title'>{noteTitle}</h5>
          </div>
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
  noteText: PropTypes.string,
  noteTitle: PropTypes.string,
  noteUpdatedAt: PropTypes.object,
};

export default NoteCard;
