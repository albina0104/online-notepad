import { useState } from 'react';
import PropTypes from 'prop-types';
import Firestore from '../handlers/firestore';
import { useFirestoreContext } from '../context/FirestoreContext';
import { HexColorPicker } from 'react-colorful';

function ColorChooserModal({ noteId, noteColor }) {
  const { loadNotes } = useFirestoreContext();
  const { changeNoteColor } = Firestore;

  const [color, setColor] = useState(noteColor);

  const handleColorChange = async () => {
    await changeNoteColor(noteId, color);
    loadNotes();
  };

  return (
    <>
      <div
        className='modal modal-sm fade'
        id={`colorChooserModal-${noteId}`}
        tabIndex='-1'
        aria-labelledby={`colorChooserModalLabel-${noteId}`}
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h1
                className='modal-title fs-5'
                id={`colorChooserModalLabel-${noteId}`}
              >
                🎨 Choose note color
              </h1>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body mx-auto'>
              <HexColorPicker color={noteColor} onChange={setColor} />
            </div>
            <div className='modal-footer mx-auto'>
              <button
                type='button'
                className='btn btn-secondary'
                data-bs-dismiss='modal'
              >
                Close
              </button>
              <button
                type='button'
                className='btn btn-primary'
                onClick={handleColorChange}
                data-bs-dismiss='modal'
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
ColorChooserModal.propTypes = {
  noteId: PropTypes.string,
  noteColor: PropTypes.string,
};

export default ColorChooserModal;
