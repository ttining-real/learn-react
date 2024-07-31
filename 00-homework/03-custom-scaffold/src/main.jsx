import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  return (
    <div className="App">
      <h1>React 웹 앱</h1>
    </div>
  );
}

const domNode = document.getElementById('react-app');
createRoot(domNode).render(
  <StrictMode>
    <App />
  </StrictMode>
);
