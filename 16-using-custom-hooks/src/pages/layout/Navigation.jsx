import { Link } from 'react-router-dom';
import S from './Navigation.module.css';

function Navigation() {
  return (
    <nav className={S.component}>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/notes">노트 목록</Link>
        </li>
        <li>
          <Link to="/notes/new">노트 생성</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
