import S from './Square.module.css';

function Square({ children }) {
  // 파생된 상태 (children이 null 또는 undefined일 때 false, 그 외의 값은 true)
  const isDisabled = !!children;
  return (
    <button className={S.component} disabled={isDisabled}>
      {children}
    </button>
  );
}

export default Square;
