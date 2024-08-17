/* eslint-disable react/no-unescaped-entities */
// --------------------------------------------------------------------------
// ✅ 데이터 패칭
// --------------------------------------------------------------------------
// - [ ] API 서버에 데이터를 요청해 응답받은 데이터를 렌더링합니다.
// - [ ] 이펙트를 사용해 Promise 또는 Async / await를 사용해 데이터 가져오기를 요청합니다.
// - [ ] 데이터 가져오기 요청 응답이 성공인 경우, 리액트 앱에 데이터를 렌더링합니다.
// - [ ] 데이터 가져오기 요청 응답에 문제가 발생한 경우, 리액트 앱에 오류 메시지를 렌더링합니다.
// - [ ] 개발 중에는 <StrictMode>에 의해 컴포넌트의 이펙트가 2번 실행됩니다.
// - [ ] 이펙트 콜백 함수(1) → 클린업 함수(2) → 이펙트 콜백 함수(2) 순으로 실행됩니다.
// - [ ] 관련없는 패치가 앱에 영향을 주지않도록 클린업 함수에서 무시하도록 설정합니다.
// - [ ] AbortController를 사용해 중복된 네트워크 요청을 중단합니다.
// --------------------------------------------------------------------------
// ✅ 이펙트가 아닌 경우
// --------------------------------------------------------------------------
// - [ ] 애플리케이션 초기화 (컴포넌트 외부에서 실행: 1회 실행 보장)
// - [ ] 사용자 액션에 의해 실행되는 기능 (이벤트 사용)
// --------------------------------------------------------------------------

import { useState } from 'react';
import S from './DataFetching.module.css';

// eslint-disable-next-line no-unused-vars
const ENDPOINT = '//yamoo9.pockethost.io/api/collections/olive_oil/records';

function DataFetching() {
  // 서버에 요청해서 데이터를 가져올 때
  // 클라이언트 환경에 리액트를 사용해 고려해야할 상태는 무엇 무엇을 선언해야 할까요?

  // 로딩 중인지 아닌지 여부 상태
  const [isLoading] = useState(false);

  // 응답이 실패한 경우, 오류 상태
  const [error] = useState(null);

  // 응답이 성공한 경우, 앱에 설정할 데이터 상태
  const [data] = useState(null);

  // 조건부 렌더링

  // 로딩 중인가? 로딩 스피너 표시하기
  if (isLoading) {
    return <p>데이터 로딩 중...</p>;
  }

  // 오류가 발생했는가? 오류 메시지 표시하기
  if (error) {
    return <p role="alert">오류 발생! "{error.message}"</p>;
  }

  // 데이터가 존재하는가? 데이터 표시하기
  if (data) {
    console.log(data.items.length);
  }

  return (
    <div className={S.component}>
      <p>서버에 데이터 가져오기 요청 후, 앱 화면 업데이트</p>
    </div>
  );
}

export default DataFetching;
