import { NoteListType } from '../types/note';
import './NoteList.css';

NoteList.propTypes = {
  list: NoteListType.isRequired,
};

function NoteList({ list }) {
  return (
    <div className="NoteList">
      <h2>노트 필기 목록</h2>
      <ul>
        {list.map((item) => {
          const slug = `#${item.title.replace(/\s+/g, '-')}`;

          return (
            <li key={item.id}>
              <a href={slug}>{item.title}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default NoteList;
