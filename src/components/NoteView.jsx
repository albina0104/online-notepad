import { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import timestampToDate from '../functions/timestampToDate';
import Firestore from '../handlers/firestore';
import Loaders from '../handlers/dataLoaders';

function NoteView() {
  const { noteLoader } = Loaders;

  const [note, setNote] = useState(null);
  const [noteLoading, setNoteLoading] = useState(true);
  const { noteId } = useParams();
  const titleRef = useRef(null);
  const colorRef = useRef(null);
  const textRef = useRef(null);
  const [updatedAt, setUpdatedAt] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    const title = titleRef.current.value;
    const color = colorRef.current.value;
    const text = textRef.current.value;

    const { saveNote } = Firestore;

    const updatedTime = await saveNote(noteId, title, color, text);
    setUpdatedAt(timestampToDate(updatedTime));
    alert('Note saved successfully!');
  };

  useEffect(() => {
    async function loadNote() {
      setNote(await noteLoader(noteId));
    }

    setNoteLoading(true);
    loadNote()
      .catch((error) => {
        console.error(error.message);
      })
      .finally(() => {
        setNoteLoading(false);
      });
  }, [noteId]);

  useEffect(() => {
    if (!noteLoading && note) {
      if (titleRef.current) {
        titleRef.current.value = note.noteTitle;
      }
      if (colorRef.current) {
        colorRef.current.value = note.noteColor;
      }
      if (textRef.current) {
        textRef.current.value = note.noteText;
      }
      setUpdatedAt(timestampToDate(note.noteUpdatedAt));
    }
  }, [noteLoading, note]);

  return noteLoading ? null : !note ? (
    <h1 className='mt-5 text-center'>
      Sorry, this note does not exist.
      <br />
      Or you don&#39;t have access.
    </h1>
  ) : (
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
          ></textarea>
        </div>
        <button type='submit' className='btn btn-primary mb-3'>
          Save
        </button>
        <div>Created at: {timestampToDate(note.noteCreatedAt)}</div>
        <div>Updated at: {updatedAt}</div>
      </form>
    </>
  );
}

export default NoteView;
