import { useEffect } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import AuthContextProvider, { useAuthContext } from './context/AuthContext';
import FirestoreContextProvider from './context/FirestoreContext';
import Navbar from './components/Navbar.jsx';
import Index from './components/Index.jsx';
import NoteList from './components/NoteList.jsx';
import NoteView from './components/NoteView.jsx';
import Protected from './components/Protected.jsx';
import ErrorPage from './components/ErrorPage.jsx';
import NotFound from './components/NotFound.jsx';
import Loaders from './handlers/dataLoaders';

const { noteLoader } = Loaders;

function Router() {
  const { currentUser, authenticate } = useAuthContext();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path='/'
        element={
          <>
            <Navbar />
            <Outlet />
          </>
        }
        errorElement={
          <>
            <Navbar />
            <ErrorPage />
          </>
        }
      >
        <Route
          path='/'
          element={
            !currentUser ? (
              <Index />
            ) : (
              <Protected currentUser={currentUser}>
                <NoteList />
              </Protected>
            )
          }
        />
        <Route
          path='note/:noteId'
          element={
            <Protected currentUser={currentUser}>
              <NoteView />
            </Protected>
          }
          loader={noteLoader}
        />
        <Route path='*' element={<NotFound />} />
      </Route>
    )
  );

  useEffect(() => {
    authenticate();
  }, []);

  return <RouterProvider router={router} />;
}

function App() {
  return (
    <AuthContextProvider>
      <FirestoreContextProvider>
        <Router />
      </FirestoreContextProvider>
    </AuthContextProvider>
  );
}

export default App;
