import { useAuthContext } from '../context/AuthContext';

export default function LoginButton() {
  const { login } = useAuthContext();
  return (
    <button type='button' className='btn btn-warning' onClick={login}>
      Login
    </button>
  );
}
