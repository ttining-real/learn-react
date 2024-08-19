/* eslint-disable no-unused-vars */
import {
  createBrowserRouter,
  // createRoutesFromElements,
  // Route,
} from 'react-router-dom';

import HomePage from '@/pages/Home';
import NoteListPage from '@/pages/NoteList';
import NewNotePage from '@/pages/NewNote';
import NoteDetailPage from '@/pages/NoteDetail';

// React Router v6.4+ (data APIs ✅)
const routes = [
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

const router = createBrowserRouter(routes);

// Legacy React Router v6.3-
// const routesFromElement = createRoutesFromElements(
//   <>
//     <Route path="/" element={<HomePage />} />
//     <Route path="/notes" element={<NoteListPage />} />
//     <Route path="/notes/new" element={<NewNotePage />} />
//     <Route path="/notes/detail" element={<NoteDetailPage />} />
//   </>
// );

// const router = createBrowserRouter(routesFromElement);

export default router;
