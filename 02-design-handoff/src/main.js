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
// let listItems = list.querySelectorAll('li'); // NodeList
// console.log( listItems );

// listItems = Array.from(listItems); // NodeList → Array
// console.log( listItems );

const listItems = Array.from(list.querySelectorAll('li')); // NodeList → Array
// console.log( listItems );

// TODO: listItems 집합 순환 드래그 가능하게 처리
listItems.forEach((item) => {
  item.setAttribute('draggable', true);
  // item.setAttribute('tabindex', 0);
  // item.style.cursor = 'move';

  // TODO: 각 리스트 아이템에 드래그 이벤트 핸들링
  item.addEventListener('dragstart', (e) => {
    // console.log(e.type, e.currentTarget);
    e.currentTarget.classList.add(DRAGGING_CLASSNAME);
  });
  
  item.addEventListener('dragend', (e) => {
    // console.log(e.type, e.currentTarget);
    e.currentTarget.classList.remove(DRAGGING_CLASSNAME);
  })
})

// TODO: list 드래그 이벤트 핸들링
list.addEventListener('dragover', (e) => {
  e.preventDefault(); // 브라우저 기본 작동 중지 (동작? 작동? 용어적 의미 생각)

  // TODO: 현재 드래깅 중인 아이템 찾기
  const draggedItem = listItems.find((item) =>
    item.classList.contains(DRAGGING_CLASSNAME)
  );

  // TODO: 드래깅 중인 요소가 아닌 나머지 아이템 집합 찾기
  const restItems = listItems.filter((item) => !Object.is(item, draggedItem));

  // TODO: 나머지 아이템 중에 드래깅 요소가 드래깅 중인 화면 상의 높이와
  //       드롭 대상 요소의 화면에서의 top 위치 + (높이 * 0.5) 비교해서 교체할 아이템 찾기

  // 드래깅 중인 요소가 리스트 안에서 움직일 때 화면에서의 높이 값 (이벤트 감지)
  // console.log(e.clientY);

  const replaceItem = restItems.find((item, index) => {
    // console.log(index, item.offsetTop);
    // console.log(index, item.offsetHeight);
    // console.log(index, item.offsetHeight * 0.5);

    return e.clientY <= item.offsetTop + item.offsetHeight * 0.5;
  });

  // list.insertBefore(draggedItem, replaceItem);
  if (replaceItem) {
    list.insertBefore(draggedItem, replaceItem);
  } else {
    list.appendChild(draggedItem);
  }
});
