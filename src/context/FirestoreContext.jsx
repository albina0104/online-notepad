import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useAuthContext } from './AuthContext';
import Loaders from '../handlers/dataLoaders';

const FirestoreContext = createContext(null);

function FirestoreContextProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const { currentUser } = useAuthContext();
  const { notesLoader } = Loaders;

  const loadNotes = async () => {
    setNotes(await notesLoader(currentUser?.uid));
  };

  const value = { notes, loadNotes };

  return (
    <FirestoreContext.Provider value={value}>
      {children}
    </FirestoreContext.Provider>
  );
}
FirestoreContextProvider.propTypes = {
  children: PropTypes.object,
};

export function useFirestoreContext() {
  return useContext(FirestoreContext);
}

export default FirestoreContextProvider;
