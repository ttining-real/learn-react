// --------------------------------------------------------------------------
// ✅ 이벤트 전파
// --------------------------------------------------------------------------
// - [ ] 전파 중지
// - [ ] 전파 대안으로 핸들러 전달
// - [ ] 기본 작동 방지
// --------------------------------------------------------------------------

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
      <div
        onClick={(e) => {
          console.log('cyan', e.target);
        }}
        className="box"
        style={styles.cyan}
      >
        {/* 하위 컴포넌트 : 동호 */}
        <div
          onClick={(e) => {
            console.log('magenta', e.target);
          }}
          className="box"
          style={styles.magenta}
        >
          {/* 자손 컴포넌트 : 재명 */}
          <div
            onClick={(e) => {
              console.log('yellow', e.target);
            }}
            className="box"
            style={styles.yellow}
          ></div>
        </div>
      </div>
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
};

export default EventPropagation;
