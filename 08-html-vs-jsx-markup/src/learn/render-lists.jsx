import { array } from '../utils/prop-types';

function RenderLists({ items /* string[], Array<string> */ }) {
  // 함수 내부에 리스트 렌더링 코드를 작성해보세요.
  // react.d.ts
  // { @@typeof: 'Symbol(react.element)', ... }
  // JSDOC
  /**@type{() => Array<React.ReactElement>} */
  // const renderList = (options = {}) => {
  // const renderList = ({ reverse = false } = {}) => {
  //   // const { reverse = false } = options;
  //   // console.log({ reverse });

  //   let listItems = items; // 대기 → 로딩 실패 순

  //   if (reverse) {
  //     // [1] listItems = items.reverse();
  //     // listItems = items.reverse(); // 참조된 items을 직접 변경 (순서 바꾸기)
  //     // listItems = items.slice().reverse();
  //     // listItems = [...items].reverse();

  //     // [2] listItems = items.toReversed();
  //     listItems = items.toReversed(); // ES 2023 (v14) 추가
  //   }

  //   // 리스트 렌더링 결과 반환
  //   // - [ ] Array.prototype.forEach?
  //   // - [x] Array.prototype.map?
  //   return listItems.map((item) /* string */ => {
  //     // console.log(item);
  //     // JSX(React Element) Markup
  //     return <li key={item}>{item}</li>;
  //   });
  // };

  // const reversedList = renderList().toReversed();

  // 문
  let demoListUsingStatement = [];

  for (let item of items) {
    demoListUsingStatement.push(<li key={item.toString()}>{item}</li>);
  }

  // 식
  const demoList = items.map((item, index) => {
    return <li key={index.toString()}>{item}</li>;
  });

  const renderDemoList = () =>
    items.map((item, index) => {
      return <li key={index.toString()}>{item}</li>;
    });

  return (
    <>
      <dt>리스트 렌더링(list rendering)</dt>
      <dd>
        {/* 직접 포함 */}
        <ul>
          {items.map((item, index) => {
            return <li key={index.toString()}>{item}</li>;
          })}
        </ul>
        {/* 문에서 처리된 결과 값을 할당받은 지역 변수 참조 */}
        <ul>{demoListUsingStatement}</ul>
        {/* 함수 몸체의 지역 변수 참조 */}
        <ul>{demoList}</ul>
        {/* 함수 실행 결과 값 활용 */}
        <ul>{renderDemoList()}</ul>
      </dd>
      <dd>
        <p>상태 메시지(status messages) 배열을 리스트 렌더링합니다.</p>
        {/* 함수 실행 -> 결과 값 반환 (식에서 사용 가능) */}
        {/* <ul className="renderList">{renderList()}</ul> */}
        {/* 인라인 코드 로직 삽입 (식에서 사용 가능, 다만 문 제외) */}
        <ul>
          {items.map((item) => (
            <li key={item.toString()}>{item}</li>
          ))}
        </ul>
      </dd>
      <dd>
        <p>상태 메시지(status messages) 배열을 역순 정렬하여 렌더링합니다.</p>
        {/* 함수 몸체의 변수 참조 (식에서 사용 가능) */}
        {/* <ul className="renderList">{reversedList}</ul> */}

        {/* 인라인 코드 로직 삽입 (식에서 사용 가능, 다만 문 제외) */}
        {items.toReversed().map((item) => (
          <li key={item.toString()}>{item}</li>
        ))}
      </dd>
      <dd>
        <p>
          React 라이브러리(reactLibrary) 객체의 키, 값을 <q>설명 목록</q>으로
          렌더링합니다.
        </p>
        <dl className="reactLibrary">
          {/* 여기서 설명 목록으로 리스트 렌더링 합니다. */}
        </dl>
      </dd>
    </>
  );
}

export default RenderLists;

RenderLists.propTypes = {
  // items: oneOf(statusMessages)
  items: array, // [권장] arrayOf(string) | arrayOf(number)
};
