import { useRef } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import timestampToDate from '../functions/timestampToDate';
import Firestore from '../handlers/firestore';

function NoteView() {
  const note = useLoaderData();
  const { noteId } = useParams();
  const titleRef = useRef(null);
  const colorRef = useRef(null);
  const textRef = useRef(null);

  const submit = async (e) => {
    e.preventDefault();
    const title = titleRef.current.value;
    const color = colorRef.current.value;
    const text = textRef.current.value;

    const { saveNote } = Firestore;

    await saveNote(noteId, title, color, text);
    alert('Note saved successfully!');
  };

  return (
    <>
      <h1 className='mt-4 mb-4 text-center'>Note</h1>
      <form onSubmit={submit} className='ms-4 me-4 mb-4'>
        <div className='mb-3'>
          <label htmlFor='noteTitle' className='form-label'>
            Note title
          </label>
          <input
            ref={titleRef}
            type='text'
            className='form-control form-control-lg'
            id='noteTitle'
            defaultValue={note.noteTitle}
          />
        </div>
        <label htmlFor='colorInput' className='form-label'>
          Note color
        </label>
        <div className='mb-3'>
          <input
            ref={colorRef}
            type='color'
            className='form-control form-control-color'
            id='colorInput'
            defaultValue={note.noteColor}
            title='Choose your color'
          ></input>
        </div>
        <div className='mb-3'>
          <label htmlFor='noteText' className='form-label'>
            Note text
          </label>
          <textarea
            ref={textRef}
            className='form-control'
            id='noteText'
            rows='3'
            defaultValue={note.noteText}
          ></textarea>
        </div>
        <button type='submit' className='btn btn-primary mb-3'>
          Save
        </button>
        <div>Created at: {timestampToDate(note.noteCreatedAt)}</div>
        <div>Updated at: {timestampToDate(note.noteUpdatedAt)}</div>
      </form>
    </>
  );
}

export default NoteView;
