import {
  createBrowserRouter as createRouter,
  RouterProvider,
} from 'react-router-dom';
import HomePage from '@/pages/Home';
import NoteListPage from '@/pages/NoteList';
import NewNotePage from '@/pages/NewNote';
import NoteDetailPage from '@/pages/NoteDetail';

const routes = [
  // Route object
  // { path?: string, element?: React.ReactNode | null }
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/notes',
    element: <NoteListPage />,
  },
  {
    path: '/notes/new',
    element: <NewNotePage />,
  },
  {
    path: '/notes/detail',
    element: <NoteDetailPage />,
  },
];

const router = createRouter(routes);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
