import { memo } from 'react';
import { node, oneOf } from 'prop-types';
import { useCountStore } from './@store';
import S from './style.module.css';

CountButton.propTypes = {
  children: node,
  type: oneOf(['+', '-']),
};

function CountButton({ children, type = '+', ...restProps }) {
  const handler = useCountStore((s) =>
    type === '+' ? s.increment : s.decrement
  );

  return (
    <button type="button" className={S.button} onClick={handler} {...restProps}>
      {children}
    </button>
  );
}

export default memo(CountButton);
