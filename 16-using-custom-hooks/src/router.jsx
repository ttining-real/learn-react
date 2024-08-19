import {
  createBrowserRouter,
  // createRoutesFromElements,
  // Route,
} from 'react-router-dom';

import HomePage from '@/pages/Home';
import NoteListPage from '@/pages/NoteList';
import NewNotePage from '@/pages/NewNote';
import NoteDetailPage from '@/pages/NoteDetail';
import RootLayout from '@/pages/layout/RootLayout';
import { element } from 'prop-types';

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

// React Router v6.4+ (data APIs ✅)
// /
//   notes    -> /notes
//     new    -> /notes/new
//     detail -> /notes/detail
//       edit -> /notes/detail/edit
//
//   admin     -> /admin
//     chart   -> /admin/chart
//     survey  -> /admin/survey
//     summary -> /admin/summary
const routes = [
  // Root Layout (Parent)
  {
    path: '/',
    element: <RootLayout />,

    // Nested Routes
    // Children components
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'notes',
        element: <NoteListPage />,
      },
      {
        path: 'notes/new',
        element: <NewNotePage />,
      },
      {
        path: 'notes/detail',
        element: <NoteDetailPage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
