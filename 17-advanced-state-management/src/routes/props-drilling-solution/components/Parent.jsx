import { object } from 'prop-types';
import S from './style.module.css';
import Child from './Child';

Parent.propTypes = {
  data: object,
};

function Parent({ data }) {
  return (
    <div className={S.box}>
      <strong className={S.label}>Parent</strong>
      <Child data={data} />
    </div>
  );
}

export default Parent;
