import { object } from 'prop-types';
import S from './style.module.css';

GrandChild.propTypes = {
  data: object,
};

function GrandChild({ data }) {
  console.log(data);

  return (
    <div className={S.box}>
      <strong className={S.label}>Grand Child</strong>
      {data.message && <p>{data.message}</p>}
    </div>
  );
}

export default GrandChild;
