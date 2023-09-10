import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import AuthContextProvider, { useAuthContext } from './context/AuthContext';
import Navbar from './components/Navbar.jsx';
import NoteList from './components/NoteList.jsx';
import NoteView from './components/NoteView.jsx';
import Loaders from './handlers/dataLoaders';

const { notesLoader, noteLoader } = Loaders;

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
        loader: notesLoader,
      },
      {
        path: 'note/:noteId',
        element: <NoteView />,
        loader: noteLoader,
      },
    ],
  },
]);

function Router() {
  const { authenticate } = useAuthContext();

  useEffect(() => {
    authenticate();
  }, []);

  return <RouterProvider router={router} />;
}

function App() {
  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  );
}

export default App;
