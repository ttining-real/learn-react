import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>홈 페이지</h1>
      <p>싱글 페이지 애플리케이션의 홈 페이지입니다.</p>

      {/* <a href="/notes">노트 목록</a> */}
      {/* <Link to={"/notes"}>노트 목록</Link> */}
      <div style={{ display: 'flex', gap: 8 }}>
        <Link to="/notes">노트 목록 1</Link>
        <Link to={{ pathname: '/notes' }}>노트 목록 2</Link>
      </div>
    </div>
  );
}

export default HomePage;
