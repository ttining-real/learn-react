// ---------------------------------------------------------
// STEP 1. Vanilla Script (ES + DOM API)
// STEP 2. Class Programming
// STEP 3. Web Components API
// ---------------------------------------------------------

// TODO: 드래깅 상태 제어를 위한 상수 선언
const DRAGGING_CLASSNAME = 'dragging';

// TODO: .list 요소 찾기
const list = document.querySelector('.list');
// console.log( list );

// TODO: .list 자식들(children, 집합) 찾기
let listItems = list.querySelectorAll('li'); // NodeList
// console.log( listItems );

// listItems = Array.from(listItems); // NodeList → Array
// console.log( listItems );

listItems = Array.from(list.querySelectorAll('li')); // NodeList → Array
// console.log( listItems );

// TODO: listItems 집합 순환 드래그 가능하게 처리
listItems.forEach((item) => {
  item.setAttribute('draggable', true);

  // TODO: 각 리스트 아이템에 드래그 이벤트 핸들링
  item.addEventListener('dragstart', (e) => {
    console.log(e.type, e.currentTarget);
    e.currentTarget.classList.add(DRAGGING_CLASSNAME);
  });
  
  item.addEventListener('dragend', (e) => {
    console.log(e.type, e.currentTarget);
    e.currentTarget.classList.remove(DRAGGING_CLASSNAME);
  })
})
