// --------------------------------------------------------------------------
// ✅ 데이터 뮤테이션
// --------------------------------------------------------------------------
// - [x] PocketBase 백엔드 솔루션을 서버로 사용합니다.
// - [x] 이벤트를 사용해 Promise 또는 Async / await 방법으로 데이터 뮤테이션을 요청합니다.
// - [ ] 데이터 뮤테이션 요청 응답이 성공인 경우, 리액트 앱 화면을 업데이트 합니다.
// - [ ] 데이터 뮤테이션 요청 응답에 문제가 발생한 경우, 오류 메시지를 렌더링합니다.
// --------------------------------------------------------------------------

import { createNote, readNotes } from '@/api/notes';
import S from './DataMutation.module.css';
import { useRef } from 'react';

function DataMutation() {
  const formRef = useRef(null);

  const handleReadNotes = async () => {
    const responseData = await readNotes();
    console.log(responseData);
  };

  const handleCreate = async () => {
    // 폼 요소에 접근 => 폼 데이터 객체 생성
    const formElement = formRef.current;
    const formData = new FormData(formElement);

    // 폼 데이터의 입력 값 가져오기
    const title = formData.get('title');
    const description = formData.get('description');

    // 서버에 요청 전송할 새 노트 객체 생성
    const newNote = { title, description };

    // 서버(외부 시스템) 요청/응답
    const responseData = await createNote(newNote);
    console.log(responseData);

    // 응답이 성공하면 폼 초기화
    formElement.reset();
  };

  return (
    <div className={S.component}>
      <form ref={formRef}>
        <div>
          <label htmlFor="noteTitle">제목</label>
          <input type="text" id="noteTitle" name="title" />
        </div>
        <div>
          <label htmlFor="noteDescription">내용</label>
          <textarea
            id="noteDescription"
            name="description"
            cols={20}
            rows={3}
          />
        </div>
      </form>
      <div
        role="group"
        style={{
          display: 'flex',
          gap: 8,
        }}
      >
        <button type="button" onClick={handleCreate}>
          노트 작성
        </button>
        <button type="button" onClick={handleReadNotes}>
          노트 읽기
        </button>
      </div>
    </div>
  );
}

export default DataMutation;
