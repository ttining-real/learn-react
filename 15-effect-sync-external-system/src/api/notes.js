// --------------------------------------------------------------------------
// ✅ 클라이언트 측 Notes API (CRUD)
// --------------------------------------------------------------------------
// - [x] 생성(Create)
// - [ ] 읽기(Read)
// - [ ] 수정(Update)
// - [ ] 삭제(Delete)
// --------------------------------------------------------------------------

// 백엔드 API 엔드포인트
const ENDPOINT = 'http://127.0.0.1:8090';
const REQUEST_OPTIONS = {
  headers: {
    'Content-type': 'application/json',
  },
};

// 비동기 함수 작성
// Create
/** @type {(newNote: { title: string, description: string })} */
export async function createNote(newNote) {
  // 외부 시스템(서버)에 데이터 생성 요청
  // POST 요청 URL
  const REQUEST_URL = `${ENDPOINT}/api/collections/notes/records`;
  // POST 요청 시, 전송할 JSON 포맷 문자열
  const body = JSON.stringify({
    title: newNote.title,
    description: newNote.description,
  });

  // 서버에서 응답
  const response = await fetch(REQUEST_URL, {
    method: 'POST',
    body,
    ...REQUEST_OPTIONS,
  });

  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: '서버에서 요청에 응답하지 않습니다.' }),
      { status: 500 }
    );
  }

  const responseData = await response.json();

  return responseData;
}

// Read
export async function readNotes() {}
export async function readNoteOne() {}

// Update
export async function updateNote() {}

// Delete
export async function deleteNote() {}
