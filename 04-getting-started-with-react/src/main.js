// Virtual DOM
// 가상 문서 객체 모델
// 실제 DOM을 추상화(단순화)

// virtual
import { createElement } from './lib/virtual/index.js';
// virtual-dom
import { createRoot } from './lib/virtual-dom/index.js'

// console.log(typeof createElement);

/* ----------------------------------------------------------------------- */
// 가상(추상화된, 단순화된) 요소(엘리먼트) 생성

// 자식(하위) 요소
const figcaptionVElement = createElement('figcaption');
// console.log(figcaptionVElement);

// 부모(상위) 요소
// API : createElement(type, props, child1, child2, ..., childN)
// API : createElement(type, props, ...children)
const figureVElement = createElement('figure', null, figcaptionVElement);
// console.log(figureVElement);

// virtual-dom / createRoot
// 가상 요소를 실제 DOM 요소로 렌더링

// API : createRoot(container)
const virtualRootElement = document.getElementById('virtual-dom');
const vRoot = createRoot(virtualRootElement);
vRoot.render(figureVElement);
console.log(vRoot.render);


/* ----------------------------------------------------------------------- */

// 실제 DOM
// 웹 API를 사용해서 문서 객체(Document Object)를 생성하는 방법
// <figure></figure> 요소를 생성하고 싶어요. -> document.createElement('figure')

// 부모(상위) 요소
const figureElement = document.createElement('figure');
// console.dir(figureElement); // 실제 DOM 객체는 복잡하다.

// 자식(하위) 요소
const figcaptionElement = document.createElement('figcaption');

// 요소 간 관계 형성
figureElement.append(figcaptionElement);

// 실제 DOM에 마운트(mount, 착장 === 렌더링)
const actualDomElement = document.getElementById('actual-dom');
console.log(actualDomElement);

actualDomElement.append(figureElement);