import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import AuthContextProvider, { useAuthContext } from './context/AuthContext';
import FirestoreContextProvider from './context/FirestoreContext';
import Navbar from './components/Navbar.jsx';
import NoteList from './components/NoteList.jsx';
import NoteView from './components/NoteView.jsx';
import Loaders from './handlers/dataLoaders';

const { noteLoader } = Loaders;

function Router() {
  const { authenticate } = useAuthContext();

  const router = createBrowserRouter([
    {
      element: (
        <>
          <Navbar />
          <Outlet />
        </>
      ),
      children: [
        {
          path: '/',
          element: <NoteList />,
        },
        {
          path: 'note/:noteId',
          element: <NoteView />,
          loader: noteLoader,
        },
      ],
    },
  ]);

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
