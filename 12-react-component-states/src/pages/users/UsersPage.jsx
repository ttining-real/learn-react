// --------------------------------------------------------------------------
// ✅ UsersPage 컴포넌트
// --------------------------------------------------------------------------
// - [x] data/users.json 파일에서 사용자 목록 데이터 불러오기
// - [ ] 사용자 검색 필드 및 목록, 검색 정보를 화면에 렌더링
// - [ ] 사용자 목록 정보 데이터를 순환해 화면에 리스트 렌더링
// - [ ] 사용자 정보 검색 시, 검색된 데이터만 사용자 목록 업데이트
// - [ ] 사용자 정보 검색 시, 검색 정보 업데이트
// --------------------------------------------------------------------------

import { useState } from 'react';
import usersData from './data/users.json';
import UserSearchBox from './components/UserSearchBox';
import UserListCount from './components/UserListCount';
import UsersList from './components/UsersList';

function UsersPage() {
  // 리액트 컴포넌트 상태 관리
  const [users] = useState(usersData);

  // 포함 가능한 로직
  // 상태 쓰기(C)/읽기(R)/수정(U)/삭제(D)
  // 오직 이 컴포넌트 내부에서만 가능 (리액트에 변경 요청)

  return (
    <div className="UsersPage">
      <UserSearchBox />
      <UsersList users={users} />
      <UserListCount />
    </div>
  );
}

export default UsersPage;
