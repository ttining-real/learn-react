import React from 'https://esm.sh/react';
import { createRoot } from 'https://esm.sh/react-dom';

// 데이터 가져오기
import listData from './data/list.js';

// 컴포넌트 불러오기
import NumberList from './components/NumberList.function.js';
import ArchitectureList from './components/architectures/ArchitectureList.class.js';
import ArchitectureListFunc from './components/architectures/ArchitectureList.function.js';
import ArchitectureItem from './components/architectures/ArchitectureItem.class.js';

// 리액트 앱을 렌더링 할 DOM 요소 참조
const container = document.getElementById('react-app');

// DOM 요소가 존재한다면?
if (container) {
  // ArchitectureList 컴포넌트 -> 리액트 엘리먼트 생성
  // ArchitectureList 컴포넌트에 속성(props) 전달
  const architectureList = React.createElement(ArchitectureList, {
    lang: 'en',
    children: listData.items.map(({ id, title }) =>
      React.createElement(ArchitectureItem, { id, title })
    ),
  });

  // NumberList 컴포넌트 -> 리액트 엘리먼트 생성
  // NumberList 컴포넌트에 속성(props) 전달
  const numberList = React.createElement(NumberList, { count: 9 });

  // ArchitectureListFunc 컴포넌트 -> 리액트 엘리먼트 생성
  // 필요한 경우 컴포넌트 속성(props)를 전달
  const architectureListFunc = React.createElement(ArchitectureListFunc, {
    lang: 'en',
  });

  // DOM 요소를 리액트 돔 루트로 만든 후, 리액트 앱 렌더링
  createRoot(container).render(architectureListFunc);
}
// 존재하지 않는다면?
else {
  // 개발자에게 경고
  console.warn('문서에 "#app" 요소가 존재하지 않습니다.');
}
