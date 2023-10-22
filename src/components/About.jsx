import './about.css';

export function About() {
  return (
    <>
      <h1 className='mt-5 mb-4 text-center'>About</h1>
      <div className='d-flex justify-content-center text-center'>
        <div className='card mb-3' style={{ maxWidth: '540px' }}>
          <div className='row g-0'>
            <div className='col-md-4'>
              <img
                src='./my_photo.jpg'
                className='img-fluid rounded-start my-photo'
                alt='Albina Salkayeva'
              />
            </div>
            <div className='col-md-8'>
              <div className='card-body'>
                <p className='card-text fs-3'>
                  Author of the project - Albina Salkayeva
                </p>
                <p className='card-text'></p>
                <p className='card-text fs-5'>
                  Source code on GitHub{' '}
                  <a
                    href='https://github.com/albina0104/online-notepad'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <img
                      src='./github-icon.svg'
                      alt='GitHub icon'
                      style={{ width: '32px', height: '32px' }}
                    />
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
