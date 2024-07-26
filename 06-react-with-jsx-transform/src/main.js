import React from 'https://esm.sh/react';
import { createRoot } from 'https://esm.sh/react-dom';
// import { ArchitectureListPage } from './pages/ArchitectureListPage.js';
import AvatarListPage from './pages/AvatarListPage.js';

// 리액트 앱을 렌더링 할 DOM 요소 참조
const container = document.getElementById('react-app');

// DOM 요소가 존재한다면?
if (container) {
  // DOM 요소를 리액트 돔 루트로 만든 후, 리액트 앱 렌더링
  // 페이지 컴포넌트 렌더링
  createRoot(container).render(React.createElement(AvatarListPage));
}
// 존재하지 않는다면?
else {
  // 개발자에게 경고
  console.warn('문서에 "#app" 요소가 존재하지 않습니다.');
}

// TODO: Avatar 컴포넌트 및 페이지 컴포넌트 작성 후 화면에 표시(렌더링)
// 1. 페이지 컴포넌트 작성 및 main.js 연결
// 2. Avatar 컴포넌트 작성 및 status 속성(prop) 설정
// 2. status 속성(prop)에 따라 화면에 표시되는 Avatar 구성
