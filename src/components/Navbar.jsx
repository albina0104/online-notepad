import { Link, useNavigate } from 'react-router-dom';
import Firestore from '../handlers/firestore';
import { useAuthContext } from '../context/AuthContext';

function Login() {
  const { login } = useAuthContext();
  return (
    <button type='button' className='btn btn-warning' onClick={login}>
      Login
    </button>
  );
}

function Logout() {
  const { logout } = useAuthContext();
  return (
    <button type='button' className='btn btn-danger' onClick={logout}>
      Logout
    </button>
  );
}

function Navbar() {
  const { currentUser } = useAuthContext();

  const { createNote } = Firestore;
  const navigate = useNavigate();

  const newNote = async () => {
    const noteRef = await createNote();
    navigate(`/note/${noteRef}`);
  };

  return (
    <>
      <nav className='navbar navbar-expand-md bg-body-tertiary sticky-top'>
        <div className='container-fluid'>
          <Link to='/' className='navbar-brand'>
            📒 Online Notepad
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav me-auto mb-2 mb-md-0'>
              <li className='nav-item'>
                <Link to='/' className='nav-link active' aria-current='page'>
                  Home
                </Link>
              </li>
              <li className='nav-item'>
                <button type='button' onClick={newNote} className='nav-link'>
                  ➕ New note
                </button>
              </li>
            </ul>
            <form className='d-flex' role='search'>
              <input
                className='form-control me-2'
                type='search'
                placeholder='Search'
                aria-label='Search'
              />
              <button className='btn btn-outline-success' type='submit'>
                Search
              </button>
            </form>
            <li className='nav-item dropdown list-unstyled ms-2'>
              <a
                className='nav-link dropdown-toggle'
                href='#'
                role='button'
                data-bs-toggle='dropdown'
                aria-expanded='false'
              >
                {currentUser ? (
                  <img
                    src={currentUser.photoURL}
                    alt={currentUser.displayName}
                    width={'36px'}
                    height={'36px'}
                    style={{ borderRadius: '50%' }}
                  />
                ) : (
                  'Login'
                )}
              </a>
              <ul className='dropdown-menu dropdown-menu-end text-center'>
                {currentUser && (
                  <>
                    <li>
                      <a className='dropdown-item' href='#'>
                        {currentUser.displayName}
                      </a>
                    </li>
                    <li>
                      <hr className='dropdown-divider' />
                    </li>
                    <li>
                      <Logout />
                    </li>
                  </>
                )}
                {!currentUser && (
                  <li>
                    <Login />
                  </li>
                )}
              </ul>
            </li>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
