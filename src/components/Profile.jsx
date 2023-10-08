import { useAuthContext } from '../context/AuthContext';

function Profile() {
  const { currentUser } = useAuthContext();

  return (
    <>
      <h1 className='mt-5 mb-4 text-center'>Profile</h1>
      <div className='d-flex justify-content-center'>
        <div className='card mb-3' style={{ maxWidth: '540px' }}>
          <div className='row g-0'>
            <div className='col-md-4'>
              <img
                src={currentUser?.photoURL}
                className='img-fluid rounded-start'
                alt={currentUser?.displayName}
                style={{ width: '200px', height: 'auto' }}
              />
            </div>
            <div className='col-md-8'>
              <div className='card-body'>
                <h2 className='card-title'>{currentUser?.displayName}</h2>
                <p className='card-text'>{currentUser?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
