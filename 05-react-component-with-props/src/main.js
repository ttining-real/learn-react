import React from 'https://esm.sh/react';
import { createRoot } from 'https://esm.sh/react-dom';

// 데이터 가져오기
import listData from './data/list.js';

// 컴포넌트 불러오기
import NumberList from './components/NumberList.js';
import ArchitectureList from './components/architectures/ArchitectureList.js';
import ArchitectureItem from './components/architectures/ArchitectureItem.js';


const container = document.getElementById('react-app');

if (container) {
  const architectureList = React.createElement(ArchitectureList, {
    lang: 'en',
    children: listData.items.map(({ id, title }) =>
      React.createElement(ArchitectureItem, { id, title })
    ),
  });

  createRoot(container).render(architectureList);
} else {
  alert('문서에 "#app" 요소가 존재하지 않습니다.');
}
