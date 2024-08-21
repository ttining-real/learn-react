import { func, node } from 'prop-types';
import S from './style.module.css';
import useRenderCountLog from '@/hooks/useRenderCountLog';
import { memo } from 'react';

TimeToggler.propTypes = {
  children: node.isRequired,
  onToggle: func,
};

function TimeToggler({ children, onToggle }) {
  useRenderCountLog('TimeToggler', '#f97172', 600, 18);

  return (
    <button type="button" className={S.button} onClick={onToggle}>
      {children}
    </button>
  );
}

export default memo(TimeToggler);
