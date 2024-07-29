import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// console.log(React.version, ReactDOM);

// Vite 클라이언트 환경(브라우저)에서 사용 가능한 환경 변수
console.log(import.meta.env);

function App() {
  return (
    <div className='App'>
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
