import { useState, createContext, useContext } from 'react';
import FirebaseAuth from '../handlers/auth';
import PropTypes from 'prop-types';

const { signIn, signOut, getCurrentUser } = FirebaseAuth;
const AuthContext = createContext(null);

function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  const login = () => {
    setUserLoading(true);
    signIn()
      .then(setCurrentUser)
      .then(() => setUserLoading(false));
  };
  const logout = () => {
    setUserLoading(true);
    signOut()
      .then(() => setCurrentUser(null))
      .then(() => console.log('logout was successful'))
      .then(() => setUserLoading(false));
  };
  const authenticate = () => {
    setUserLoading(true);
    getCurrentUser()
      .then(setCurrentUser)
      .then(() => setUserLoading(false));
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, userLoading, login, logout, authenticate }}
    >
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
