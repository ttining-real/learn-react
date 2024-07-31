import { typeOf } from '../utils';
import reactImagePath from '../assets/react.svg?url';
import viteImagePath from '../assets/vite.svg?url';

function ConditionalRendering({ imageType }) {
  // 조건부 렌더링
  // 함수 몸체 (function body) 영역 안에서
  // 조건에 따라 렌더링 결과가 달라짐
  let imagePath = '';
  let printText = '';

  if (imageType.includes('react')) {
    imagePath = reactImagePath;
    printText = 'React';
  }

  if (imageType.includes('vite')) {
    imagePath = viteImagePath;
    printText = 'Vite';
  }

  return (
    <>
      <dt>조건부 렌더링(conditional rendering)</dt>
      <dd>
        <p>이미지 타입(image type)에 따라 렌더링 여부를 결정합니다.</p>
        <div className="conditionalRendering">
          {/* imageType 값이 'vite'인 경우 Vite 이미지를, 'react'인 경우 React 이미지를 화면에 표시합니다. */}
          <img src={imagePath} alt="" />
          {/* imageType이 'vite'인 경우 'Vite', 'react'인 경우 'React' 텍스트를 화면에 표시합니다. */}
          <p>{printText}</p>
        </div>
      </dd>
      <dd style={{ marginTop: 12 }}>
        <p>spinner 또는 vite 이미지가 랜덤으로 화면에 렌더링 되도록 합니다.</p>
        <div className="conditionalRendering">
          <img className="spinner" src="/icons/spinner.svg" alt="로딩 중..." />
          <img src="/vite.svg" alt="Vite" style={{ height: 42 }} />
        </div>
      </dd>
    </>
  );
}

export default ConditionalRendering;

ConditionalRendering.propTypes = {
  imageType(props, propName, componentName) {
    const propValue = props[propName];
    const propType = typeOf(propValue);
    const allowedType = 'string';

    // 타입 검사
    if (propType !== allowedType) {
      // 타입이 다르면 오류 처리
      throw new Error(
        `${componentName} 컴포넌트 ${propName} 속성 타입은 "${allowedType}" 타입이 요구되나, 실제 전달된 타입은 "${propType}"입니다.`
      );
    }

    // 그렇지 않으면 통과
  },
};
