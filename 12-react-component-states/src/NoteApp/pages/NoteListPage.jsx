import { useState } from 'react';
import { func } from 'prop-types';
import { getNoteList } from '../api/getNote';
import NoteList from '../components/NoteList';
import './NoteListPage.css';
import { ROUTES } from '../constants/routes';

NoteListPage.propTypes = {
  onChangeRoute: func.isRequired,
};

function NoteListPage({ onChangeRoute }) {
  // 화면에 표시할 노트의 목록 상태
  const [list] = useState(() => getNoteList());

  const handleClick = (e) => {
    e.preventDefault();
    onChangeRoute(ROUTES.create);
  };

  return (
    <div className="NoteListPage">
      <NoteList list={list} />
      <a onClick={handleClick} className="createNoteLink" href="#create-note">
        노트 작성
      </a>
    </div>
  );
}

export default NoteListPage;
