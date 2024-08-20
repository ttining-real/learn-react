import useDocumentTitle from '@/hooks/useDocumentTitle';
import { Link } from 'react-router-dom';
import S from './style.module.css';

function SignUpUser() {
  useDocumentTitle('사용자 회원가입');

  return (
    <main id="page" className={S.component}>
      <h1 className="headline">사용자 회원가입</h1>

      <div className="description">
        <p>회원가입 폼을 구현합니다.</p>
        <p>
          <Link to="/signin-user">로그인</Link> 페이지 이동
        </p>
      </div>
    </main>
  );
}

export default SignUpUser;
