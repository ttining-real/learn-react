// --------------------------------------------------------------------------
// ✅ Figma → SVG 패스 애니메이션
// --------------------------------------------------------------------------
// - [x] Figma를 사용해 SVG 패스 애니메이션을 적용할 아이콘 또는 다이어그램을 그립니다.
// - [x] 드로잉 시, 고려할 점
//   - [x] Stroke 속성으로 그립니다.
// - [x] 애니메이션을 적용하기 위해 고려할 점
//   - [x] strokeDasharray
//   - [x] strokeDashoffset
//   - [x] visibility
//   - [x] pathLength
// --------------------------------------------------------------------------
import { number, string } from 'prop-types';
import S from './PracticeSVGPathAnimation.module.css';
import { timeline } from 'motion';
import { useRef } from 'react';

PracticeSVGPathAnimation.propTypes = {
  strokeColor: string,
  strokeWidth: number,
};

function PracticeSVGPathAnimation({
  strokeColor = '#4729B4',
  strokeWidth = 4,
}) {
  const svgRef = useRef(null);

  const handleSVGPathAnimation = () => {
    const { current: el } = svgRef;

    const [circle1, circle2] = Array.from(el.querySelectorAll('circle'));
    const line = el.querySelector('line');

    timeline(
      [
        [circle1, { strokeDashoffset: [1, 0], visibility: ['visible'] }],
        [line, { strokeDashoffset: [1, 0], visibility: ['visible'] }],
        [circle2, { strokeDashoffset: [1, 0], visibility: ['visible'] }],
      ],
      {
        duration: 1.8,
        delay: 0.2,
        easing: 'cubic-bezier(0.79,0.14,0.15,0.86)',
      }
    );
  };

  return (
    <>
      <button
        type="button"
        className={S.button}
        onClick={handleSVGPathAnimation}
      >
        SVG 패스 애니메이션
      </button>

      <div className={S.component}>
        <svg
          ref={svgRef}
          width={212}
          height={41}
          viewBox="0 0 210 41"
          fill="none"
        >
          <circle
            cx="20.5"
            cy="20.5"
            r="17.5"
            stroke={strokeColor}
            strokeDasharray={1}
            strokeDashoffset={0}
            strokeWidth={strokeWidth}
            pathLength={1}
          />
          <line
            x1={36}
            y1={20}
            x2={173}
            y2={20}
            stroke={strokeColor}
            strokeDasharray={1}
            strokeDashoffset={0}
            strokeWidth={strokeWidth}
            pathLength={1}
          />
          <circle
            cx="189.5"
            cy="20.5"
            r="17.5"
            stroke={strokeColor}
            strokeDasharray={1}
            strokeDashoffset={0}
            strokeWidth={strokeWidth}
            pathLength={1}
            style={{ transform: 'rotateX(180deg) rotateY(180deg)' }}
          />
        </svg>
      </div>
    </>
  );
}

export default PracticeSVGPathAnimation;
