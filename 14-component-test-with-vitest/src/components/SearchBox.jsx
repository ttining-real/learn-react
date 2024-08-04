// --------------------------------------------------------------------------
// ✅ 테스트 시나리오
// --------------------------------------------------------------------------
// - [ ] 사용자가 내용 입력 후, Enter 키를 누르면 onSearch 함수가 실행됩니다.
//   - 검색 인풋이 문서에 존재하는 지 확인합니다.
//   - 사용자가 검색 인풋에 검색어를 입력하고, Enter 키를 누릅니다.
//   - onSearch 모의 함수(vi.fn())가 입력한 검색어와 함께 호출되었는 지 확인합니다.
// - [ ] 사용자가 아무 내용 입력 없이 Enter 키를 누르면 onSearch 함수가 실행되지 않습니다.
//   - 사용자가 검색 인풋에 아무 내용도 입력하지 않고, Enter 키를 누릅니다.
//   - onSearch 모의 함수(vi.fn())가 호출되지 않았음을 확인합니다.
// --------------------------------------------------------------------------

import { func } from 'prop-types';

SearchBox.propTypes = {
  onSearch: func,
};

/**@type {({ onSearch}: { onSearch: (searchText: string) => void}) => JSX.Element} */
function SearchBox({ onSearch }) {
  // React 훅 함수를 선행 학습한 수강생은 아래 명령형 코드 대신,
  // React의 선언형 방식으로 컴포넌트 코드를 작성 후 테스트 할 수 있습니다.
  const handleSearch = (e) => {
    e.stopPropagation();

    const { type, key, target } = e;
    const inputedValue = target.value.trim();

    if (!inputedValue) {
      console.warn('검색어가 입력되지 않았습니다.');
      return;
    }

    if (type === 'change' || (type === 'keydown' && key === 'Enter')) {
      onSearch?.(inputedValue);
    }
  };

  return (
    <div className="SearchBox">
      <label htmlFor="">검색</label>
      <input
        type="search"
        placeholder="검색어 입력"
        onChange={handleSearch}
        onKeyDown={handleSearch}
      />
    </div>
  );
}

export default SearchBox;
