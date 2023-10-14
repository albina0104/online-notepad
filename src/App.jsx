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
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import ErrorPage from './components/ErrorPage.jsx';
import NotFound from './components/NotFound.jsx';

function Router() {
  const { currentUser, authenticate, userLoading } = useAuthContext();

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
            userLoading ? null : !currentUser ? (
              <Index />
            ) : (
              <ProtectedRoute>
                <NoteList />
              </ProtectedRoute>
            )
          }
        />
        <Route
          path='note/:noteId'
          element={
            <ProtectedRoute>
              <NoteView />
            </ProtectedRoute>
          }
        />
        <Route
          path='profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
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
