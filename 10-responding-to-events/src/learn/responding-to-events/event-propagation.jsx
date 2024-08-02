// --------------------------------------------------------------------------
// ✅ 이벤트 전파
// --------------------------------------------------------------------------
// - [x] 전파 중지 (개별적으로 할 수 있음)
// - [x] 전파 대안으로 핸들러 전달
// - [x] 기본 작동 방지
// --------------------------------------------------------------------------

import LayoutBox from './LayoutBox';

// RGB 모드
// CMYK 모드

// event.preventDefault(); // 이벤트 기본 작동을 차단

// Event Delegation (위임)
// Event Propagation (전파)
// event.stopPropagation(); // 이벤트 전파 중지

function EventPropagation() {
  return (
    <details>
      <summary>
        <b>이벤트 전파 &amp; 기본 작동 방지</b>
      </summary>
      {/* 상위 컴포넌트 : 정민 */}
      <LayoutBox
        style={styles.cyan}
        onClick={(e) => {
          console.log('cyan', e.target);
        }}
      >
        <LayoutBox
          style={styles.magenta}
          onClick={(e) => {
            console.log('magenta', e.target);
          }}
        >
          <LayoutBox
            style={styles.yellow}
            onClick={(e) => {
              console.log('yellow', e.target);
            }}
          >
            <LayoutBox
              style={styles.purple}
              onClick={(e) => {
                console.log('purple', e.target);
              }}
            ></LayoutBox>
          </LayoutBox>
        </LayoutBox>
      </LayoutBox>
    </details>
  );
}

const styles = {
  cyan: {
    '--color': 'var(--cyan)',
  },
  magenta: {
    '--color': 'var(--magenta)',
  },
  yellow: {
    '--color': 'var(--yellow)',
  },
  purple: {
    '--color': 'var(--purple, #7423f6)',
  },
};

export default EventPropagation;
