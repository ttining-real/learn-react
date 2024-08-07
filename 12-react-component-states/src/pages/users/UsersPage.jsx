// --------------------------------------------------------------------------
// ✅ UsersPage 컴포넌트
// --------------------------------------------------------------------------
// - [x] data/users.json 파일에서 사용자 목록 데이터 불러오기
// - [x] 사용자 검색 필드 및 목록, 검색 정보를 화면에 렌더링
// - [x] 사용자 목록 정보 데이터를 순환해 화면에 리스트 렌더링
// - [x] 사용자 정보 검색 시, 검색된 데이터만 사용자 목록 업데이트
// - [x] 사용자 정보 검색 시, 검색 정보 업데이트
// --------------------------------------------------------------------------
// ⭐️ 추가 실습
// --------------------------------------------------------------------------
// - [ ] 사용자 Enter 키 입력 시, 찾기
// - [ ] 사용자 입력 경고 후, 초점 이동
// - [ ] 사용자 목록 초기화 기능 추가
// - [ ] 사용자 입력 즉시, 찾기 기능 추가
// - [ ] 잦은 상태 업데이트, 리-렌더 이슈
// - [ ] 사용자 입력 디바운싱 or 쓰로틀링
// - [ ] 사용자 목록 검색 정보를
// --------------------------------------------------------------------------

import { useState } from 'react';
import usersData from '@/data/users.json';
import UserSearchBox from './components/UserSearchBox';
import UserListCount from './components/UserListCount';
import UsersList from './components/UsersList';

function UsersPage() {
  // 리액트 컴포넌트 상태 관리
  const [users] = useState(usersData);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (userInput) => {
    setSearchTerm(userInput);
  };

  // 포함 가능한 로직
  // 상태 쓰기(C)/읽기(R)/수정(U)/삭제(D)
  // 오직 이 컴포넌트 내부에서만 가능 (리액트에 변경 요청)

  // 사용자가 입력한 검색어로부터 필터링 된 사용자 목록을 [ UsersList ] 컴포넌트에 전달
  const searchedUsersList = users.filter(
    (user) =>
      user.name.includes(searchTerm) ||
      user.email.includes(searchTerm) ||
      user.city.includes(searchTerm)
  );

  const currentSearchedUsersCount = searchedUsersList.length;
  const totalUsersCount = users.length;

  return (
    <div className="UsersPage">
      <UserSearchBox searchTerm={searchTerm} onSearch={handleSearch} />
      <UsersList users={searchedUsersList} />
      <UserListCount
        currentSearchedUsersCount={currentSearchedUsersCount}
        totalUsersCount={totalUsersCount}
      />
    </div>
  );
}

export default UsersPage;
