import { randomNumber, typeOf } from '../utils';

function DataBinding({ statusMessages }) {
  // [미션] 랜덤 로직을 작성해서 임의의 상태 메시지가 표시되도록 설정합니다.
  console.log(statusMessages);
  const statusMessage =
    statusMessages[randomNumber(0, statusMessages.length - 1)];

  // 리액트에서 이렇게 하는 거 아닙니다!!!
  // 전달된 props의 각 속성 타입 검사
  // if (!Array.isArray(statusMessages)) {
  //   console.warn('statusMessages가 배열이 아니야! 다시 확인해~');
  //   return null;
  // }

  return (
    <>
      <dt>데이터 바인딩(data binding)</dt>
      <dd>
        <p>상태 메시지(status message)를 연결해 화면에 출력합니다.</p>
        <span className="status">
          {/* statusMessage 값을 화면에 표시합니다. (랜덤 표시도 도전!) */}
          {statusMessage}
        </span>
      </dd>
    </>
  );
}

export default DataBinding;

// 컴포넌트 속성 타입 검사
// Prop Types Validation

// 리액트가 제공하는 방법
// Component.propTypes

DataBinding.propTypes = {
  statusMessages(props, propName, componentName) {
    // 컴포넌트 속성의 값은?
    const propValue = props[propName];

    // 컴포넌트 속성 값의 타입은? (문자 값을 원함)
    const propType = typeOf(propValue); // 'array'

    // 허용할 데이터 타입 이름은?
    const allowedType = 'array';

    // 검사 수행
    if (propType !== allowedType) {
      // 오류가 있으면 오류 메시지 출력
      // 메시지는 `[      ] 컴포넌트 [     ] 속성 타입은 "[    ]" 타입이 요구되나, 실제 전달된 타입은 "[    ]"입니다.`
      throw new Error(
        `${componentName} 컴포넌트 ${propName} 속성 타입은 "${allowedType}" 타입이 요구되나, 실제 전달된 타입은 "${propType}"입니다.`
      );
    }
    // 오류가 없으면 패스
  },
};
