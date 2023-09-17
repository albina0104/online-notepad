import { Link, useNavigate } from 'react-router-dom';
import Firestore from '../handlers/firestore';
import { useAuthContext } from '../context/AuthContext';

function LoginButton() {
  const { login } = useAuthContext();
  return (
    <button type='button' className='btn btn-warning' onClick={login}>
      Login
    </button>
  );
}

function LogoutButton() {
  const { logout } = useAuthContext();
  return (
    <button type='button' className='btn btn-danger' onClick={logout}>
      Logout
    </button>
  );
}

function Navigation() {
  const { currentUser } = useAuthContext();
  const { createNote } = Firestore;
  const navigate = useNavigate();

  const newNote = async () => {
    const { uid } = currentUser;
    const noteRef = await createNote(uid);
    navigate(`/note/${noteRef}`);
  };

  return (
    <ul className='navbar-nav me-auto mb-2 mb-md-0'>
      <li className='nav-item'>
        <Link to='/' className='nav-link active' aria-current='page'>
          Home
        </Link>
      </li>
      {currentUser && (
        <li className='nav-item'>
          <button type='button' onClick={newNote} className='nav-link'>
            ➕ New note
          </button>
        </li>
      )}
    </ul>
  );
}

function SearchForm() {
  return (
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
  );
}

function Dropdown() {
  const { currentUser } = useAuthContext();

  return (
    <ul className='navbar-nav mb-2 mb-md-0'>
      <li className='nav-item dropdown ms-2'>
        <button
          className='nav-link dropdown-toggle p-md-0'
          data-bs-toggle='dropdown'
          aria-expanded='false'
        >
          {currentUser ? (
            <img
              src={currentUser.photoURL}
              alt={currentUser.displayName}
              style={{ width: '36px', height: '36px', borderRadius: '50%' }}
            />
          ) : (
            'Login'
          )}
        </button>
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
                <LogoutButton />
              </li>
            </>
          )}
          {!currentUser && (
            <li>
              <LoginButton />
            </li>
          )}
        </ul>
      </li>
    </ul>
  );
}

function Navbar() {
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
            <Navigation />
            <SearchForm />
            <Dropdown />
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
