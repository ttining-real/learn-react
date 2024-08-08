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
// - [x] 사용자 Enter 키 입력 시, 찾기
// - [x] 찾기 실행 후, 검색 입력 필드 초기화
// - [x] 사용자 입력 경고 후, 검색 필드에 초점 이동
// - [x] 사용자 목록 초기화 기능 추가 (초기화 버튼)
// - [x] 사용자 목록 초기화 후, 검색 필드에 초점 이동
// - [ ] 사용자 입력 즉시, 찾기 기능 추가
// - [ ] 잦은 상태 업데이트, 리-렌더 이슈
// - [ ] 사용자 입력 디바운싱 or 쓰로틀링
// --------------------------------------------------------------------------

import { useState } from 'react';
import usersData from '@/data/users.json';
import UserSearchBox from './components/UserSearchBox';
import UserListCount from './components/UserListCount';
import UsersList from './components/UsersList';

function UsersPage() {
  // [상태 선언] ---------------------------------------------------
  const [users] = useState(usersData);
  const [searchTerm, setSearchTerm] = useState('');

  // [상태 업데이트] ------------------------------------------------
  // 컴포넌트 상태 업데이트 함수를 실행하는 기능(함수)
  const handleSearch = (userInput) => setSearchTerm(userInput);
  const handleReset = () => setSearchTerm('');

  // [파생된 상태] -------------------------------------------------
  const searchedUsersList = users.filter(
    (user) =>
      user.name.includes(searchTerm) ||
      user.email.includes(searchTerm) ||
      user.city.includes(searchTerm)
  );

  return (
    <div className="UsersPage">
      <UserSearchBox
        searchTerm={searchTerm}
        onSearch={handleSearch}
        onReset={handleReset}
      />
      <UsersList users={searchedUsersList} />
      <UserListCount
        searchedUsersCount={searchedUsersList.length}
        totalUsersCount={users.length}
      />
    </div>
  );
}

export default UsersPage;
