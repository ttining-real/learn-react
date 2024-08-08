import { useId } from 'react';
import { string, bool, func } from 'prop-types';
import './UserSearchBox.css';

UserSearchBox.propTypes = {
  searchTerm: string.isRequired,
  isInstantSearch: bool,
  onSearch: func,
  onReset: func,
};

function UserSearchBox({
  searchTerm,
  isInstantSearch = false,
  onSearch,
  onReset,
}) {
  const id = useId();

  const handleSearch = (e) => {
    e.preventDefault();

    const input = document.getElementById(id);
    const button = input.closest('form').querySelector('[type="submit"]');
    const value = input.value.trim();

    if (value.length > 0) {
      onSearch?.(value);
      input.value = '';
      button.focus();
    } else {
      alert('검색어를 입력해주세요.');
      input.value = '';
      input.focus();
    }
  };

  const handleReset = () => {
    onReset?.();
    const input = document.getElementById(id);
    input.focus();
  };

  let handleChange = null;

  if (isInstantSearch) {
    handleChange = (e) => onSearch?.(e.target.value);
  }

  return (
    <form
      className="UserSearchBox"
      onSubmit={handleSearch}
      onReset={handleReset}
    >
      <div className="control">
        <label htmlFor={id}>사용자 검색</label>
        <input
          id={id}
          type="search"
          placeholder="사용자 정보 입력"
          defaultValue={searchTerm}
          // value={searchTerm}
          onChange={handleChange}
          // readOnly
        />
      </div>

      {/* 조건부 표시가 더 나은 선택 */}
      <button hidden={isInstantSearch} type="submit">
        찾기
      </button>
      <button hidden={isInstantSearch} type="reset">
        목록 초기화
      </button>

      {/* 조건부 렌더링은 토글이 잦을 경우, 렌더링 비용 발생 */}
      {/* {isInstantSearch ? null : (
        <>
          <button type="submit">찾기</button>
          <button type="reset">목록 초기화</button>
        </>
      )} */}
    </form>
  );
}

export default UserSearchBox;
