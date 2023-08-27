function NoteCard() {
  return (
    <>
      <div className='col'>
        <div className='card text-center h-100'>
          <div className='card-header'>
            <h5 className='card-title'>My note title </h5>
          </div>
          <div className='card-body'>
            <p className='card-text'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis,
              voluptas.
            </p>
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
          <div className='card-footer text-body-secondary'>2 days ago</div>
        </div>
      </div>
    </>
  );
}

export default NoteCard;
