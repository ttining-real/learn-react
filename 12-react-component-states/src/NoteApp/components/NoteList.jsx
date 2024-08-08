import { func } from 'prop-types';
import { NoteListType } from '../types/note';
import './NoteList.css';
import { ROUTES } from '../constants/routes';

NoteList.propTypes = {
  list: NoteListType.isRequired,
  onChangeRoute: func,
};

function NoteList({ list, onChangeRoute }) {
  const handleClick = (pickNoteId) => (e) => {
    e.preventDefault();
    onChangeRoute?.(ROUTES.detail, pickNoteId);
  };

  return (
    <div className="NoteList">
      <h2>노트 필기 목록</h2>
      <ul>
        {list.map((item) => {
          const slug = `#${item.title.replace(/\s+/g, '-')}`;

          return (
            <li key={item.id}>
              <a href={slug} onClick={handleClick(item.id)}>
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default NoteList;
