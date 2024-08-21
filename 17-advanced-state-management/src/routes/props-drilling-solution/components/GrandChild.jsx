import { useContext } from 'react';
import S from './style.module.css';

// 컨텍스트 불러오기
import { pageContext } from '../context';

function GrandChild() {
  // 컨텍스트 값 가져오기
  const { message, color } = useContext(pageContext);

  return (
    <div className={S.box} style={{ backgroundColor: color }}>
      <strong className={S.label}>Grand Child</strong>
      <p>{message}</p>
    </div>
  );
}

export default GrandChild;
