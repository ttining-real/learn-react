/* eslint-disable no-unused-vars */
import { useReducer } from 'react';
import listReducer from '@/stores/list';

function ListManager() {
  const [list] = useReducer(listReducer, ['one', 'zero']);

  const handleAddItem = () => {};

  const handleEditItem = () => {};

  const handleRemoveItem = () => {};

  const handleFilterItems = () => {};

  return (
    <div>
      <h2 className="headline2">배열 관리자</h2>

      <ul>
        {list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default ListManager;
