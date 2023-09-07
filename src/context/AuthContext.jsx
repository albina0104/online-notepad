import { useState, createContext, useContext } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext(null);

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
AuthContextProvider.propTypes = {
  children: PropTypes.object,
};

export default AuthContextProvider;

export function useAuthContext() {
  return useContext(AuthContext);
}
