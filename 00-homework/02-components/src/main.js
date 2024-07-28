import React from 'https://esm.sh/react';
import { createRoot } from 'https://esm.sh/react-dom';

// import ButtonListPage from './pages/ButtonListPage.js';
import Layout from './pages/layout.js';


// 리액트 앱을 렌더링 할 DOM 요소 참조
const container = document.getElementById('react-app');

// DOM 요소가 존재한다면?
if (container) {
  // 페이지 컴포넌트 렌더링
  // createRoot(container).render(React.createElement(AvatarListPage));
  createRoot(container).render(React.createElement(Layout));
}
// 존재하지 않는다면?
else {
  // 개발자에게 경고
  console.warn('문서에 "#app" 요소가 존재하지 않습니다.');
}