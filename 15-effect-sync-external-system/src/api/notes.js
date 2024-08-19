// --------------------------------------------------------------------------
// ✅ 클라이언트 측 Notes API (CRUD)
// --------------------------------------------------------------------------
// - [x] 생성(Create)
// - [x] 읽기(Read)
// - [ ] 수정(Update)
// - [ ] 삭제(Delete)
// --------------------------------------------------------------------------

// 백엔드 API 엔드포인트
const ENDPOINT = 'http://127.0.0.1:8090';
const REQUEST_OPTIONS = {
  headers: {
    'Content-Type': 'application/json',
  },
};

// 비동기(async) 함수 작성
// Create
/** @type {(newNote: { title: string, description: string }) => Promise<any>} */
export async function createNote(newNote) {
  // 외부 시스템(서버)에 데이터 생성 요청
  // POST 요청 URL
  const REQUEST_URL = `${ENDPOINT}/api/collections/notes/records`;

  // POST 요청 시, 전송할 JSON 포멧 문자열
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

  // 에러 핸들링
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
/** @type {(page?: number, perPage?: number) => Promise<any>} */
export async function readNotes(page = 1, perPage = 10) {
  const REQUEST_URL = `${ENDPOINT}/api/collections/notes/records?page=${page}&perPage=${perPage}`;
  const response = await fetch(REQUEST_URL);

  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: '서버에서 요청에 응답하지 않습니다.' }),
      { status: 500 }
    );
  }

  const responseData = await response.json();

  return responseData;
}

export async function readNoteOne() {}

// Update
export async function updateNote() {}

// Delete
export async function deleteNote() {}
