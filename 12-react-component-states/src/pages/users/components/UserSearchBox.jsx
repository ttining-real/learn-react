import { useId } from 'react';
import { string, func } from 'prop-types';
import './UserSearchBox.css';

UserSearchBox.propTypes = {
  searchTerm: string.isRequired,
  onSearch: func,
  onReset: func,
};

function UserSearchBox({ searchTerm, onSearch, onReset }) {
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
          // onChange={handleChange}
          // readOnly
        />
      </div>
      <button type="submit">찾기</button>
      <button type="reset">목록 초기화</button>
    </form>
  );
}

export default UserSearchBox;
