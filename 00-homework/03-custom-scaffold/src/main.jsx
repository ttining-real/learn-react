import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/pages/App.jsx';
import '@/style/main.scss';

const domNode = document.getElementById('react-app');
createRoot(domNode).render(
  <StrictMode>
    <App />
  </StrictMode>
);
