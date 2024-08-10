import S from './Square.module.css';

function Square() {
  return (
    <button className={S.component} disabled>
      🟨
    </button>
  );
}

export default Square;
