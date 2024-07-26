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

// 2. 함수 컴포넌트 (재사용)

function render() {
  const children = listData.items.map(({ id, title }) => {
    
    // TODO: 컴포넌트 정의(with 속성) & 추출
    // <li> 리액트 엘리먼트를 생성하는 클래스 컴포넌트를 작성하세요.
    // 컴포넌트 이름은 여러분이 생각하는 "그것"입니다. (여러분의 작명 센스를 볼께요.)

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

  // TODO: 컴포넌트 정의(with 속성) & 추출
  // <ul> 리액트 컴포넌트를 생성하는 클래스 컴포넌트를 작성하세요.
  // 컴포넌트 이름은 여러분이 생각하는 "그것"입니다. (여러분의 작명 센스를 볼께요.)
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
    h(NumberList, { count: 7 })
  )

  reactDomRoot.render(listContainer);
}

function unmount() {
  reactDomRoot.unmount();
}

render();