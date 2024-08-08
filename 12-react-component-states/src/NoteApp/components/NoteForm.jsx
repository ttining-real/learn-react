import { useId, useState } from 'react';
import { oneOf } from 'prop-types';
import { NoteType } from '../types/note';
import { getUserList } from '../api/getUser';
import { convertHTMLToText } from '@/utils/convertTextToHTMLString';
import './NoteForm.css';

// 데이터를 1회 가져오도록 설정
const userList = getUserList();

NoteForm.propTypes = {
  mode: oneOf(['create', 'edit']),
  note: NoteType, // optional
};

function NoteForm({ mode = 'create', note }) {
  const titleId = useId();
  const contentId = useId();
  const userId = useId();

  // [상태 선언]
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    userId: 0,
  });

  // [상태 업데이트 기능]
  // - 노트 제목, 내용, 작성자 정보를 하나의 핸들러를 사용해 업데이트 수행해야 함
  const handleUpdateFormData = (e) => {
    const { name, value } = e.target;

    const nextFormData = {
      ...formData,
      [name]: value,
    };

    setFormData(nextFormData);
  };

  // 노트 생성 기능
  const handleSubmit = (e) => {
    e.preventDefault();

    // 폼의 데이터 관리 방식 선택
    // - [x] 폼의 데이터를 리액트로 관리할 것인가? (객체 타입으로 관리: 성능 이슈 주의!!!!!)
    // - [ ] 아니면 네이티브(웹)로 관리할 것인가? (성능 이슈 없어요~)
  };

  // 노트 초기화 기능
  const handleReset = (e) => {
    e.preventDefault();
  };

  // 노트 삭제 기능
  const handleDelete = () => {
    console.log('delete');
  };

  // [파생된 상태]
  // "생성" 또는 "수정" 모드 여부 확인
  const isCreateMode = mode.includes('create');
  // "생성" 또는 "수정" 모드에 따라 화면에 표시될 버튼 레이블 설정
  const submitButtonLabel = isCreateMode ? '추가' : '수정';

  //
  // if (note) {
  //   note.content;
  // }

  return (
    <form className="NoteForm" onSubmit={handleSubmit} onReset={handleReset}>
      <div className="formControl">
        <label htmlFor={titleId}>제목</label>
        <input
          type="text"
          id={titleId}
          name="title"
          value={formData.title}
          onChange={handleUpdateFormData}
          // defaultValue={note?.title}
        />
      </div>

      <div className="formControl">
        <label htmlFor={contentId}>내용</label>
        <textarea
          id={contentId}
          name="content"
          value={formData.content}
          onChange={handleUpdateFormData}
          // defaultValue={note && convertHTMLToText(note.content)}
        />
      </div>

      {isCreateMode && (
        <div className="formControl">
          <label htmlFor={userId}>작성자</label>
          <select
            id={userId}
            name="userId"
            value={formData.userId}
            onChange={handleUpdateFormData}
          >
            <option>작성자 선택</option>
            {userList.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="buttonGroup">
        <button type="submit">{submitButtonLabel}</button>

        {isCreateMode ? (
          <button type="reset">초기화</button>
        ) : (
          <button type="button" onClick={handleDelete}>
            삭제
          </button>
        )}
      </div>
    </form>
  );
}

export default NoteForm;
