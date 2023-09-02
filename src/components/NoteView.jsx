function NoteView() {
  return (
    <>
      <h1 className='mt-4 mb-4 text-center'>Note</h1>
      <form className='ms-4 me-4 mb-4'>
        <div className='mb-3'>
          <label htmlFor='noteTitle' className='form-label'>
            Note title
          </label>
          <input
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
            type='color'
            className='form-control form-control-color'
            id='colorInput'
            value='#ffffff'
            title='Choose your color'
          ></input>
        </div>
        <div className='mb-3'>
          <label htmlFor='noteText' className='form-label'>
            Note text
          </label>
          <textarea className='form-control' id='noteText' rows='3'></textarea>
        </div>
        <button type='submit' className='btn btn-primary mb-3'>
          Save
        </button>
        <div>Created at:</div>
        <div>Updated at:</div>
      </form>
    </>
  );
}

export default NoteView;
