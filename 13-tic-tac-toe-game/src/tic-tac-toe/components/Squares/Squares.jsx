// --------------------------------------------------------------------------
// ✅ 틱택토 게임 만들기 (Squares 컴포넌트)
// --------------------------------------------------------------------------
// - [x] squares 배열 데이터를 게임의 상수로 설정합니다.
// - [x] squares 배열 데이터의 초기 상태 값은 9개의 `null`로 구성합니다.
// - [x] squares 배열 데이터 모듈을 불러온 후, 순환해 Sqaure 컴포넌트를 리스트 렌더링 합니다.
// --------------------------------------------------------------------------

import S from './Squares.module.css';
import { useState } from 'react';
import { PLAYER, PLAYER_COUNT, INITIAL_SQUARES } from '@/tic-tac-toe/constants';
import Square from '../Square/Square';

// 상태를 가지는(Stateful) 컴포넌트
function Squares() {
  // [게임 상태] --------------------------------------------------------------

  // 게임판(9개의 말판) 상태를 나타내는 리액트의 상태 선언
  const [squares, setSquares] = useState(INITIAL_SQUARES);

  // [게임 상태 업데이트 기능] ----------------------------------------------------

  // 게임을 진행하는 함수
  // const playGame = (index) => {

  // ----------------------------------------------------------------------------
  // 리액트 렌더링 프로세스 플로우(진행 흐름)
  // ----------------------------------------------------------------------------

  // 게임 상태 변경 -> 리액트에게 렌더 트리거(요청) -> 리액트는 컴포넌트 다시 렌더링 -> 렌더 트리 생성
  // -> 리액트 돔 이전 렌더 트리 현재 렌더 트리 비교 -> 차이 발견 -> 실제 DOM 커밋(변경된 부분만 패치)

  // [우리들의 언어 작성 : 스크립트]
  // 리액트야 사용자가 4번 인덱스의 스퀘어를 클릭했다.
  // 게임을 진행하고 싶어해. 그러니 스퀘어의 집합인 스퀘어스의 상태를 변경할께.
  // 리액트는 이를 반영해서 화면을 업데이트 해주렴!

  // [리액트의 언어로 이야기를 해줘야 이해]
  // 리액트 도구의 사용법을 알고, 설명해줘야 알아들음
  // 리액트 상태 업데이트 API 방법 사용

  // const [state, setState] = useState(initialValue);
  // setState(nextState);
  // setState((prevState) => nextState);

  // 상태 업데이트 API (direct value)
  // 다음 스퀘어 집합의 상태
  // 이전 스퀘어 집합을 순환한다.

  //   const nextSquares = squares.map((square, idx) => {
  //     return idx === index ? currentPlayer : square;
  //   });

  // console.log({이전_상태: squares});
  // console.log({다음_상태: nextSquares});

  //   setSquares(nextSquares);

  // 상태 업데이트 API (callback)
  // setSquares((prevSquares) => {

  // 다음 번 컴포넌트 렌더링 시, 전달(계산)된 현재 시점의 상태: 이전 스퀘어 집합을 순환해서
  //   const nextSquares = prevSquares.map((square, squareIndex) => {

  // 개별 스퀘어의 인덱스와 사용자 행동에 따라 선택된 인덱스를 비교한다.
  // 만약 그 값이 동일하다면?
  //     if (squareIndex === index) {
  //       return currentPlayer;
  //     }

  // 동일하지 않은 경우 그냥 이전 값을 반환한다.
  //     return square;
  //   });

  // 반환한 값이 다음 번 렌더링에서의 (스냅샷) 상태 값
  //   return nextSquares;
  // });
  // }

  // const handlePlayGame = (index) => {
  //   return /* onPlay 속성에 연결된 이벤트 핸들러 */() => {
  //     const nextSquares = squares.map((square, idx) => {
  //       return idx === index ? currentPlayer : square;
  //     });

  //     return nextSquares;
  //   };
  // }

  const handlePlayGame = (index) => () => {
    // const nextSquares = squares.map((square, idx) =>
    //   idx === index ? currentPlayer : square
    // );

    // setSquares(nextSquares);

    setSquares((prevSquares) => {
      const nextSquares = prevSquares.map((square, idx) => {
        return idx === index ? currentPlayer : square;
      });

      return nextSquares;
    });
  };

  // [게임 파생된 상태] ----------------------------------------------------------

  // 게임 순서 (0, 1, 2, 3, ...)
  const gameIndex = squares.filter(Boolean).length;

  // 현재 게임 플레이어 ([0] PLAYER.ONE ↔ [1] PLAYER.TWO)
  // 첫번째 플레이어의 턴인가요?
  const isPlayerOneTurn = gameIndex % PLAYER_COUNT === 0;

  // 첫번째 플레이어의 턴이면 PLAYER.ONE 아니면 PLAYER.TWO
  const currentPlayer = isPlayerOneTurn ? PLAYER.ONE : PLAYER.TWO;

  console.log('렌더링\n\n', { squares, gameIndex, currentPlayer });

  return (
    <div className={S.component}>
      {/* 리액트 (JSX) 마크업 : 리스트 렌더링 */}
      {squares.map((square, index) => {
        return (
          <Square key={index} onPlay={handlePlayGame(index)}>
            {square}
          </Square>
        );
      })}
    </div>
  );
}

export default Squares;
