import React, { createElement as h } from 'https://esm.sh/react';
import { createRoot } from 'https://esm.sh/react-dom';

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

// 컴포넌트란? 재사용 메커니즘(클래스 또는 함수)을 사용해 리액트 엘리먼트를 반환하는 것을 말합니다.

// 1. 리액트 클래스 컴포넌트 (재사용)
// 리액트 컴포넌트는 반드시 파스칼케이스(ParcalCase) 유형으로 이름으로 작성
// 웹 컴포넌트 반드시 이름을 케밥케이스 유형으로 작성 (예: <euid-list>)
class ArchitectureList extends React.Component {
  // 컨스트럭터(construcgtor)
  // constructor(props/* 컴포넌트 속성 */) {
  //   // 반드시 [ super ] 실행이 필요함.
  //   super(props);

  //   // 암묵적으로 클래스로부터 생성된 인스턴스
  //   // return this;

  //   // 상태 설정
  //   // this 이벤트 바인딩
  // }
  
  // 렌더(render) 메서드 (인스턴스 공용)
  render() {

    // 컴포넌트 속성(props) 접근
    // props는 읽기 전용(readonly)
    // console.log(this.props); // { id, count }

    // 컴포넌트의 자식들은 배열이다.
    const children = Array(this.props.count).fill(null).map((_, index) => 
      h('li', {}, `${index + 1}01`)
    );

    console.log(children)

    // 리액트 엘리먼트 반환
    return h(
      'ul', 
      { id: this.props.id, className: 'architectures', lang: 'en' }, 
      children
    );
  }
}

// 리액트 월드에서 컴포넌트를 사용해 리액트 엘리먼트를 생성하려면?
// 별칭 h === React.createElement(컴포넌트_참조)
const list1 = h(ArchitectureList, { id: 'list-1', count: 3 });
const list2 = h(ArchitectureList, { id: 'list-2', count: 5 });
const list3 = h(ArchitectureList, { id: 'list-3', count: 11 });
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