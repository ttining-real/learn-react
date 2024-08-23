import { Link } from 'react-router-dom';
import { IoLogoReact } from 'react-icons/io5';
import { useAuth } from '@/contexts/auth';
import S from './style.module.css';
import pb from '@/api/pb';

const DUMMY_IMAGE_URL = 'https://placehold.co/20x20?text=photo';

function AppHeader() {
  const { authInfo, resetAuth } = useAuth();

  const user = authInfo.user;

  const handleSignOut = () => {
    // 컨텍스트 사용자 정보 초기화
    resetAuth();
    // 포켓베이스 로그아웃 기능 실행
    pb.authStore.clear();
  };

  let profileImageUrl = DUMMY_IMAGE_URL;

  if (user) {
    profileImageUrl = pb.files.getUrl(user, user.avatar);
  }

  return (
    <header className={S.component}>
      <Link to="/" className={S.homeLink} aria-label="홈">
        <IoLogoReact />
      </Link>
      {user && (
        <div className={S.wrapper}>
          <div className={S.userInfo}>
            <img src={profileImageUrl} alt="" />
            {user.username}
          </div>
          <button type="button" onClick={handleSignOut}>
            로그아웃
          </button>
        </div>
      )}
    </header>
  );
}

export default AppHeader;
