import { useState, createContext, useContext } from 'react';
import FirebaseAuth from '../handlers/auth';
import PropTypes from 'prop-types';

const { signIn, signOut, getCurrentUser } = FirebaseAuth;
const AuthContext = createContext(null);

function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  const login = () => signIn().then(setCurrentUser);
  const logout = () => {
    signOut()
      .then(() => setCurrentUser(null))
      .then(() => console.log('logout was successful'));
  };
  const authenticate = () => {
    getCurrentUser().then(setCurrentUser);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, authenticate }}>
      {children}
    </AuthContext.Provider>
  );
}
AuthContextProvider.propTypes = {
  children: PropTypes.object,
};

export function useAuthContext() {
  return useContext(AuthContext);
}

export default AuthContextProvider;
