// --------------------------------------------------------------------------
// ✅ 문서 제목 동기화
// --------------------------------------------------------------------------
// - [ ] 카운터 앱의 count 상태가 변경되면 문서 제목을 동기화합니다.
// - [ ] step 값이 변경될 때에는 불필요한 문서 제목 동기화가 되지 않도록 설정합니다.
// --------------------------------------------------------------------------

import { useId, useState, useEffect } from 'react';
import S from './Counter.module.css';

function Counter() {
  const id = useId();
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const handleDecrease = () => {
    let nextCount = count - step;
    if (nextCount <= 1) nextCount = 1;
    setCount(nextCount);
  };

  const handleIncrease = () => {
    setCount(count + step);
  };

  const handleChangeStep = (e) => {
    setStep(Number(e.target.value));
  };

  const isDisabled = count <= 1;

  // [순수한 로직]
  // 리액트 렌더링 프로세스와 관련된 것만 코드가 존재해야 한다.
  // 부수 효과 코드 작성
  // const decreaseButton = document.querySelector('[aria-label="카운트 감소"]');
  // console.log('리액트 함수 컴포넌트 바디', decreaseButton); // null

  // * [이펙트] React.useEffect()
  // 첫 번째 인수 : 이펙트 콜백 함수 설정
  // ㄴ DOM 커밋 이후 시점에 실행
  // ㄴ 상태가 업데이트 될 때마다 실행

  // 두 번째 인수 : 종속성(의존성) - 배열
  // ㄴ 배열이 비어있는 경우, 마운트 시점에서 1회 실행된다. (단, StrictMode에서는 2회 실행)
  // ㄴ 아예 설정되지 않은 경우(undefined), 매번 실행된다.

  // isMounted 변수를 사용한 조건문 처리 => X
  // let isMounted = false;

  useEffect(() => {
    // console.log('this is a effect callback');
    // 이 안에서 리액트 엘리먼트가 변환된 실제 DOM 트리의 요소에 접근이 가능할까?

    const decreaseButton = document.querySelector('[aria-label="카운트 감소"]');
    // console.log('이펙트 함수 내부', decreaseButton); // button
    decreaseButton.setAttribute(
      'title',
      decreaseButton.getAttribute('aria-label')
    );

    console.log('카운트 감소 버튼에 title 속성을 추가!');
  }, []);

  useEffect(() => {
    const increaseButton = document.querySelector('[aria-label="카운트 증가"]');
    // console.log('이펙트 함수 내부', increaseButton); // button
    increaseButton.setAttribute(
      'title',
      increaseButton.getAttribute('aria-label')
    );

    console.log('카운트 증가 버튼에 title 속성을 추가!');
  }, []);

  return (
    <>
      <div className={S.component}>
        <button
          type="button"
          aria-label="카운트 감소"
          title="카운트 감소"
          disabled={isDisabled}
          onClick={handleDecrease}
        >
          <svg
            fill="none"
            strokeWidth={1.5}
            width={12}
            height={12}
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
        <output>{count}</output>
        <button
          type="button"
          aria-label="카운트 증가"
          title="카운트 증가"
          onClick={handleIncrease}
        >
          <svg
            fill="none"
            strokeWidth={1.5}
            stroke="currentColor"
            width={12}
            height={12}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 15.75 7.5-7.5 7.5 7.5"
            />
          </svg>
        </button>
      </div>
      <div className={S.changeStep}>
        <label htmlFor={id}>step 변경</label>
        <input type="number" id={id} value={step} onChange={handleChangeStep} />
      </div>
    </>
  );
}

export default Counter;
