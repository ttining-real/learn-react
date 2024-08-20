import useDocumentTitle from '@/hooks/useDocumentTitle';
import S from './style.module.css';
import { Link } from 'react-router-dom';

function SignInUser() {
  useDocumentTitle('사용자 로그인');
  return (
    <main id="page" className={S.component}>
      <h1 className="headline">사용자 로그인</h1>

      <div className="description">
        <p>로그인 폼을 구현합니다.</p>
        <p>
          <Link to="/signup-user">회원가입</Link> 페이지로 이동
        </p>
      </div>
    </main>
  );
}

export default SignInUser;
