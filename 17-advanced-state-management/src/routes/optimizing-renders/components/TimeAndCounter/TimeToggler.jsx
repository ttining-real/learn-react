import { func, node } from 'prop-types';
import useRenderCountLog from '@/hooks/useRenderCountLog';
import S from './style.module.css';

TimeToggler.propTypes = {
  children: node.isRequired,
  onToggle: func,
};

function TimeToggler({ children, onToggle }) {
  useRenderCountLog('TimeToggler', '#f55b5b', 500);

  return (
    <button type="button" className={S.button} onClick={onToggle}>
      {children}
    </button>
  );
}

export default TimeToggler;
