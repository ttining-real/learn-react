// ------------------------------------------------------------------------------
// ✅ Counter 컴포넌트
// ------------------------------------------------------------------------------
// - [x] `count` 속성(prop, 기본 값: 1)을 전달받아 화면에 표시
// - [x] `step` 속성(기본 값: 1)을 전달받아 버튼 레이블에 표시
// - [x] `min` 속성(기본 값: 1) 보다 `count` 값이 크거나 같아야 함
// - [x] `max` 속성(기본 값: 1000) 보다 `count` 값이 작거나 같아야 함
// - [x] 사용자가 감소 버튼을 클릭하면 `count` 감소 (step 만큼)
// - [x] 사용자가 증가 버튼을 클릭하면 `count` 증가 (step 만큼)
// - [x] 사용자가 감소 버튼을 클릭했을 때 `count` 값이 `min` 보다 작거나 같을 경우 감소 버튼 비활성화
// - [x] 사용자가 증가 버튼을 클릭했을 때 `count` 값이 `max` 보다 크거나 같을 경우 증가 버튼 비활성화
// ------------------------------------------------------------------------------

import { useState } from 'react';
import { number } from 'prop-types';
import './Counter.css';

Counter.propTypes = {
  count: number,
  step: number,
  min: number,
  max: number,
};

/**@type {({ count?: number, step?: number, min?: number, max?: number }) => JSX.Element} */
function Counter({ count: initialCount = 1, step = 1, min = 1, max = 1000 }) {
  // only state
  // 참고: https://react.dev/reference/react/useState#usestate
  const [count, setCount] = useState(() => {
    if (initialCount < min || initialCount > max) {
      throw new Error(`count 값이 min 보다 작거나, max보다 큽니다.`);
    }

    return initialCount;
  });

  // only updator function
  // const [, setCount] = useState(initialCount);
  // console.log(count, setCount);

  const handleDecrease = () => {
    // console.log('decrease count');
    const nextCount = count - step;
    setCount(nextCount);
  };

  const handleIncrease = () => {
    // console.log('increase count');
    const nextCount = count + step;
    setCount(nextCount);
  };

  // 파생된 상태 (Derived States)
  // (컴포넌트의 상태(states) 또는 속성(props)에 의해 (다시) 계산되는 값이 기억된 지역 변수)
  const isDisabledDecrease = count <= min;
  const isDisabledIncrease = count >= max;

  return (
    <div className="Counter">
      <button
        type="button"
        disabled={isDisabledDecrease}
        onClick={handleDecrease}
      >
        -{step}
      </button>
      <output>{count}</output>
      <button
        type="button"
        disabled={isDisabledIncrease}
        onClick={handleIncrease}
      >
        +{step}
      </button>
    </div>
  );
}

export default Counter;
