import { isTrueOrFalse, typeOf } from '../utils';

// 이미지 경로 불러오기
import reactImagePath from '../assets/react.svg?url';
import viteImagePath from '../assets/vite.svg?url';
import nextJsImagePath from '../assets/next-js.svg?url';
import kakaoTalkImagePath from '../assets/kakao-talk.svg?url';

// 이미지 타입 배열 관리
const IMAGE_TYPES = ['react', 'vite', 'next.js', 'kakao talk'];

// 컴포넌트
function ConditionalRendering({ imageType }) {
  // 조건부 렌더링
  // 함수 몸체 (function body) 영역 안에서
  // 조건에 따라 렌더링 결과가 달라짐
  let imagePath = '';
  let printText = '';

  // 조건 "문"
  // if (imageType.toLowerCase().includes('react')) {
  //   imagePath = reactImagePath;
  //   printText = 'React';
  // }

  // if (imageType.toLowerCase().includes('vite')) {
  //   imagePath = viteImagePath;
  //   printText = 'Vite';
  // }

  // if (imageType.toLowerCase().includes('next.js')) {
  //   imagePath = nextJsImagePath;
  //   printText = 'Next.js';
  // }

  // if (imageType.toLowerCase().includes('kakao talk')) {
  //   imagePath = kakaoTalkImagePath;
  //   printText = 'Kakao Talk';
  // }

  // if 문 => switch 문으로 변경
  switch (imageType.toLowerCase()) {
    case 'react':
      imagePath = reactImagePath;
      printText = 'React';
      break;
    case 'vite':
      imagePath = viteImagePath;
      printText = 'Vite';
      break;
    case 'next.js':
      imagePath = nextJsImagePath;
      printText = 'Next.js';
      break;
    case 'kakao talk':
      imagePath = kakaoTalkImagePath;
      printText = 'Kakao Talk';
      break;
    default:
      printText = '허용된 이미지 타입이 존재하지 않습니다.';
  }

  // 값을 반환하는 함수 실행
  // const isShowSpinner = isTrueOrFalse(); // 참 또는 거짓

  // const spinnerOrVite =
  //   randomNumber(0, 1) > 0.5 ? (
  //     <img className="spinner" src="/icons/spinner.svg" alt="로딩 중..." />
  //   ) : (
  //     <img src="/vite.svg" alt="Vite" style={{ height: 42 }} />
  //   );

  // 3항 연산자 (표현) "식"
  const spinnerOrVite = isTrueOrFalse() ? (
    <img className="spinner" src="/icons/spinner.svg" alt="로딩 중..." />
  ) : (
    <img src="/vite.svg" alt="Vite" style={{ height: 42 }} />
  );

  // 논리 곱/합 연산자
  // 그리고(AND, &&), 또는(OR, ||)
  // const spinnerMessage = isShowSpinner ? '스피너 표시' : null;
  // const spinnerMessage = isShowSpinner && '스피너 표시';
  // const spinnerMessage = !isShowSpinner || '스피너 표시';

  // JSX 반환 (마크업 생성)
  // Q. JSX는 문(statement)이다? 표현식(expression)이다? => 표현식이다.
  //    JSX 내부에서는 오직 '식'만 사용 가능하다!!!
  return (
    <>
      {/* <dt>조건부 렌더링(conditional rendering)</dt> */}
      <dt>
        조건부 렌더링(conditional rendering) ({isTrueOrFalse() && '스피너 표시'}
        )
      </dt>
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
          {spinnerOrVite}
          {/* <img className="spinner" src="/icons/spinner.svg" alt="로딩 중..." />
          <img src="/vite.svg" alt="Vite" style={{ height: 42 }} /> */}
        </div>
      </dd>
    </>
  );
}

// 컴포넌트 기본 내보내기
export default ConditionalRendering;

// 컴포넌트 속성(들) 검사
ConditionalRendering.propTypes = {
  // imageType 속성 검사
  imageType(props, propName, componentName) {
    // 컴포넌트 속성 값
    const propValue = props[propName];

    // 컴포넌트 속성 값의 타입
    const propType = typeOf(propValue);

    // 컴포넌트 속성이 허용하는 타입
    const allowedType = 'string';

    // 정규식을 사용하여 특정 문자 값이 매칭(일치)되는 지 검토
    const typeMatchString = IMAGE_TYPES.reduce((result, type, index, array) => {
      const divider = index < array.length - 1 ? '|' : '';
      return result + type + divider;
    }, '');

    const typeMatch = new RegExp(`^(${typeMatchString})$`, 'i');

    // 타입 검사 수행
    if (propType !== allowedType || !typeMatch.test(propValue)) {
      // 타입이 다르면 오류 처리
      throw new Error(
        // `${componentName} 컴포넌트 ${propName} 속성 타입은 "${allowedType}" 타입이 요구되나, 실제 전달된 타입은 "${propType}"입니다.`
        `${componentName} 컴포넌트 ${propName} 속성에 설정 가능한 값은 "[${IMAGE_TYPES.toString()}]" 중 하나가 요구되나, 실제 전달된 속성 값은 "${propValue}"입니다.`
      );
    }

    // 타입이 동일하고 속성 값이 매칭(일치)되면 통과
  },
};
