import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/main.css';
import App from './App';

const reactApp = document.getElementById('react-app');

if (!reactApp) throw new Error('문서에 #react-app 요소가 존재하지 않습니다.');

createRoot(reactApp).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// 참고: https://ko.vitejs.dev/guide/build#load-error-handling
globalThis.addEventListener('vite:preloadError', () => {
  location.reload();
});
