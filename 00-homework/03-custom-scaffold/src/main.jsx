import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/test/App.jsx';

const domNode = document.getElementById('react-app');
createRoot(domNode).render(
  <StrictMode>
    <App />
  </StrictMode>
);
