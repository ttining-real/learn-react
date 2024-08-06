import { useId, useState } from 'react';
import './UserSearchBox.css';

function UserSearchBox() {
  const id = useId();

  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    console.log(searchTerm);
  };

  return (
    <div className="UserSearchBox">
      <div className="control">
        <label htmlFor={id}>사용자 검색</label>
        <input
          id={id}
          // value={searchTerm}
          defaultValue={searchTerm}
          // readOnly
          // onChange={handleChange}
          type="search"
          placeholder="사용자 이름 입력"
        />
      </div>
      <button type="button" onClick={handleSearch}>
        찾기
      </button>
    </div>
  );
}

export default UserSearchBox;
