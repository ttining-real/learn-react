import { func, number } from 'prop-types';
import { getNoteItem } from '../api/getNote';
import BackLink from '../components/BackLink';
import PrintError from '../components/PrintError';
import './NoteDetailPage.css';
import { ROUTES } from '../constants/routes';

NoteDetailPage.propTypes = {
  noteId: number.isRequired,
  onChangeRoute: func,
};

function NoteDetailPage({ noteId, onChangeRoute }) {
  const note = getNoteItem(noteId);
  const handleBackToList = () => onChangeRoute(ROUTES.list);

  return (
    <div className="NoteDetailPage">
      <BackLink onClick={handleBackToList} />
      {!note && <PrintError>`{noteId}` 노트가 존재하지 않습니다.</PrintError>}
      {note && (
        <>
          <h2>{note.title}</h2>
          <span>{note.expand.user.name}</span>
          <div dangerouslySetInnerHTML={{ __html: note.content }} />
        </>
      )}
    </div>
  );
}

export default NoteDetailPage;
