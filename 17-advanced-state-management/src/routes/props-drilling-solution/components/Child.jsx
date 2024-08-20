import { object } from 'prop-types';
import S from './style.module.css';
import GrandChild from './GrandChild';

Child.propTypes = {
  data: object,
};

function Child({ data }) {
  return (
    <div className={S.box}>
      <strong className={S.label}>Child</strong>
      <GrandChild data={data} />
    </div>
  );
}

export default Child;
