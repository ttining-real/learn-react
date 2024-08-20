import { object } from 'prop-types';
import S from './style.module.css';
import Parent from './Parent';

GrandParent.propTypes = {
  data: object,
};

function GrandParent({ data }) {
  return (
    <div className={S.box}>
      <strong className={S.label}>Grand Parent</strong>
      <Parent data={data} />
    </div>
  );
}

export default GrandParent;
