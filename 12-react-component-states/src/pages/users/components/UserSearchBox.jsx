import { useId } from 'react';
import { string, func } from 'prop-types';
import './UserSearchBox.css';

UserSearchBox.propTypes = {
  searchTerm: string.isRequired,
  onSearch: func, // optional
};

function UserSearchBox({ searchTerm, onSearch }) {
  const id = useId();

  const handleSearch = (e) => {
    // 브라우저의 기본 작동 방지
    // <form> 요소의 action에 설정된 주소로 폼 데이터 전송 시도
    e.preventDefault();

    // Side Effects
    // DOM 접근, 속성 값 읽기
    const input = document.getElementById(id);
    const button = input.closest('form').querySelector('[type="submit"]');
    const value = input.value.trim();

    if (value.length > 0) {
      // 사용자 찾기 기능 실행
      onSearch?.(value);
      // 실행 이후, 검색 필드 초기화
      input.value = '';
      // 검색 기능은 찾기 버튼을 눌렀을 때
      // 실행되므로 버튼 요소에 초점 이동
      button.focus();
    } else {
      alert('검색어를 입력해주세요.');
      input.value = '';
      input.focus();
    }
  };

  return (
    <form className="UserSearchBox" onSubmit={handleSearch}>
      <div className="control">
        <label htmlFor={id}>사용자 검색</label>
        <input
          id={id}
          type="search"
          placeholder="사용자 정보 입력"
          defaultValue={searchTerm}
          // value={searchTerm}
          // onChange={handleChange}
          // readOnly
        />
      </div>
      <button type="submit">찾기</button>
    </form>
  );
}

export default UserSearchBox;
