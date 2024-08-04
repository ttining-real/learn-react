// --------------------------------------------------------------------------
// ✅ 테스트 시나리오
// --------------------------------------------------------------------------
// - 컴포넌트 렌더링 관점에서 어떤 테스트를 수행할 지 고민해 작성하세요.
// --------------------------------------------------------------------------

import { string, number } from 'prop-types';

ExtandableText.propTypes = {
  text: string.isRequired,
  limit: number,
};

/**@type {({ text, limit }: { text: string, limit?: number }) => JSX.Element} */
function ExtandableText({ text: originalText, limit = 100 }) {
  let displayText = '';

  // React 훅 함수를 선행 학습한 수강생은 아래 명령형 코드 대신,
  // React의 선언형 방식으로 컴포넌트 코드를 작성 후 테스트 할 수 있습니다.
  const isALotText = originalText.length > limit;

  if (isALotText) {
    displayText = originalText.slice(0, limit) + '...';
  }

  const handleToggle = () => {
    const component = document.querySelector('.ExtandableText');
    const paragraph = component.querySelector('p');
    const button = component.querySelector('button');

    if (paragraph.textContent.length - 3 <= limit) {
      paragraph.textContent = originalText;
      button.textContent = '접기';
    } else {
      paragraph.textContent = displayText;
      button.textContent = '펼치기';
    }
  };

  return (
    <div className="ExtandableText">
      <p>{isALotText ? displayText : originalText}</p>
      {isALotText && (
        <button type="button" onClick={handleToggle}>
          펼치기
        </button>
      )}
    </div>
  );
}

export default ExtandableText;
