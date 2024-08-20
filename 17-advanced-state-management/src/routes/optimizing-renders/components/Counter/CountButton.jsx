import { func, node } from 'prop-types';
import S from './style.module.css';

CountButton.propTypes = {
  children: node.isRequired,
  onUpdate: func,
};

function CountButton({ children, onUpdate, ...restProps }) {
  return (
    <button
      type="button"
      className={S.button}
      onClick={onUpdate}
      {...restProps}
    >
      {children}
    </button>
  );
}

export default CountButton;
