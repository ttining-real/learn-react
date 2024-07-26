import React, { createElement as h } from 'https://esm.sh/react';
import { createRoot } from 'https://esm.sh/react-dom';
import NumberList from './components/NumberList.js';


const listData = {
  items: [
    { id: '1', title: 'Climatology' },
    { id: '2', title: 'History of Architecture' },
    { id: '3', title: 'Graphics' },
    { id: '4', title: 'Building design' },
  ],
};

const container = document.getElementById('react-app');

const reactDomRoot = createRoot(container);



// 리액트 월드에서 컴포넌트를 사용해 리액트 엘리먼트를 생성하려면?
// 별칭 h === React.createElement(컴포넌트_참조)
const list1 = h(NumberList, { id: 'number-1', count: 3 });
const list2 = h(NumberList, { id: 'number-2', count: 5 });
const list3 = h(NumberList, { id: 'number-3', count: 11 });
// console.log(list1, list2, list3);

// 2. 함수 컴포넌트 (재사용)

function render() {
  const children = listData.items.map(({ id, title }) => {
    
    // 리액트 엘리먼트 (객체)
    const reactElement = h(
      'li',
      {
        key: id,
        className: 'item',
      },
      h('img', {
        src: `/architectures/architecture-${id}.jpg`,
        alt: '',
      }),
      h(
        'span',
        {
          className: 'content',
        },
        title
      ),
      h(
        'button',
        {
          type: 'button',
          title: '아이템 이동 (위/아래 화살표 키 활용)',
        },
        h('img', {
          src: '/icons/handle.svg',
          alt: '아이템 이동 (위/아래 화살표 키 활용)',
        })
      )
    );

    return reactElement;
  });

  const list = h(
    'ul', // 컴포넌트 타입
    { className: 'architectures', lang: 'en' }, // 컴포넌트 속성(props)
    ...children // 컴포넌트 자식들(칠드런) -> 리액트 엘리먼트 | 문자 | 숫자 | null 또는 데이터 배열
  );

  // ListContainer 리액트 엘리먼트
  const listContainer = h(
    'div',
    { className: 'list-container' },
    list,
    list1,
    list2,
    list3
  )

  reactDomRoot.render(listContainer);
}

function unmount() {
  reactDomRoot.unmount();
}

render();