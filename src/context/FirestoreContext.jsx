import { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import { useAuthContext } from './AuthContext';
import Loaders from '../handlers/dataLoaders';

const FirestoreContext = createContext(null);

const notes = [];
const initialState = {
  visibleNotes: notes,
  allNotes: notes,
};

function reducer(state, action) {
  switch (action.type) {
    case 'setNotes':
      return {
        visibleNotes: action.payload,
        allNotes: action.payload,
      };
    case 'filterNotes':
      return {
        ...state,
        visibleNotes: action.payload,
      };
    default:
      return state;
  }
}

function FirestoreContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { currentUser } = useAuthContext();
  const { notesLoader } = Loaders;

  const loadNotes = async () => {
    const notes = await notesLoader(currentUser?.uid);
    dispatch({ type: 'setNotes', payload: notes });
  };

  const filterNotes = (searchText) => {
    if (searchText === '') {
      dispatch({ type: 'setNotes', payload: state.allNotes });
      return;
    }
    searchText = searchText.toLowerCase();
    const filteredNotes = [];
    state.allNotes.forEach((note) => {
      if (
        note.noteTitle.toLowerCase().includes(searchText) ||
        note.noteText.toLowerCase().includes(searchText)
      ) {
        filteredNotes.push(note);
      }
    });
    dispatch({ type: 'filterNotes', payload: filteredNotes });
  };

  const value = { state, dispatch, loadNotes, filterNotes };

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
