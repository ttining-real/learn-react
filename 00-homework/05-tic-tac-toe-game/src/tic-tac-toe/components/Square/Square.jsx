import S from './Square.module.css';
import { node, func, object } from 'prop-types';

Square.propTypes = {
  children: node,
  onPlay: func,
  style: object,
};

function Square({ children, onPlay, style }) {
  // 파생된 상태 (children이 null 또는 undefined일 때 false, 그 외의 값은 true)
  const isDisabled = !!children;
  return (
    <button
      className={S.component}
      disabled={isDisabled}
      onClick={onPlay}
      style={style}
    >
      {children}
    </button>
  );
}

export default Square;
