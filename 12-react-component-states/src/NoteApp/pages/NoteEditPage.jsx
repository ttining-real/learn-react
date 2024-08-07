import { number } from 'prop-types';
import { getNoteItem } from '../api/getNote';
import BackLink from '../components/BackLink';
import NoteForm from '../components/NoteForm';
import PrintError from '../components/PrintError';
import './NoteEditPage.css';

NoteEditPage.propTypes = {
  noteId: number.isRequired,
};

function NoteEditPage({ noteId }) {
  const note = getNoteItem(noteId);

  return (
    <div className="NoteEditPage">
      <BackLink />
      {!note && <PrintError>`{noteId}` 노트가 존재하지 않습니다.</PrintError>}
      {note && (
        <>
          <h2>노트 편집</h2>
          <NoteForm mode="edit" note={note} />
        </>
      )}
    </div>
  );
}

export default NoteEditPage;
