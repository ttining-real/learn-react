// --------------------------------------------------------------------------
// ✅ 틱택토 게임 만들기 (Squares 컴포넌트)
// --------------------------------------------------------------------------
// - [x] squares 배열 데이터를 게임의 상수로 설정합니다.
// - [x] squares 배열 데이터의 초기 상태 값은 9개의 `null`로 구성합니다.
// - [x] squares 배열 데이터 모듈을 불러온 후, 순환해 Sqaure 컴포넌트를 리스트 렌더링 합니다.
// --------------------------------------------------------------------------

import S from './Squares.module.css';
import { useState } from 'react';
import {
  PLAYER,
  PLAYER_COUNT,
  INITIAL_SQUARES,
  checkeWinner,
  WINNERS_COLOR,
} from '@/tic-tac-toe/constants';
import Square from '../Square/Square';

// 상태를 가지는(Stateful) 컴포넌트
function Squares() {
  // [게임 상태] --------------------------------------------------------------

  // 게임판(9개의 말판) 상태를 나타내는 리액트의 상태 선언
  const [squares, setSquares] = useState(INITIAL_SQUARES);

  // [게임 상태 업데이트 기능] ----------------------------------------------------

  // 게임을 진행하는 함수
  const handlePlayGame = (index) => () => {
    // 사용자가 액션을 취해 게임을 진행하려 할 때?
    // 이미 게임이 종료된 경우?
    if (winnerInfo) {
      // GAME OVER 메시지를 사용자에게 출력
      alert('GAME OVER');
      // 함수 실행되지 않도록 함수 종료(return)
      return;
    }

    // 아직 게임이 진행중인 경우?
    // 아래 코드 실행

    // 아직 진행 중이라면? 게임 진행 (리액트에게 렌더 요청 -> 화면 변경)
    setSquares((prevSquares) => {
      const nextSquares = prevSquares.map((square, idx) => {
        return idx === index ? currentPlayer : square;
      });

      return nextSquares;
    });
  };

  // [게임 파생된 상태] ----------------------------------------------------------

  // 게임이 끝났는가? 아니면 아직 진행 중인가?
  // 게임이 끝났다면? 게임이 끝났음을 사용자에게 고하게!
  // 반환 값에 따라 게임을 진행할 지, 아닐 지 결정
  // squares?, isPlayerOneTurn?, gameIndex?, currentPlayer?
  // const winner = checkeWinner(squares);
  // console.log('승자는?', winner);
  const winnerInfo = checkeWinner(squares);

  // 게임 순서 (0, 1, 2, 3, ...)
  const gameIndex = squares.filter(Boolean).length; // 0

  // 현재 게임 플레이어 ([0] PLAYER.ONE ↔ [1] PLAYER.TWO)
  // 첫번째 플레이어의 턴인가요?
  const isPlayerOneTurn = gameIndex % PLAYER_COUNT === 0; // true
  // 첫번째 플레이어의 턴이면 PLAYER.ONE 아니면 PLAYER.TWO
  const currentPlayer = isPlayerOneTurn ? PLAYER.ONE : PLAYER.TWO; // '🧀'

  return (
    <div className={S.component}>
      {/* 리액트 (JSX) 마크업 : 리스트 렌더링 */}
      {squares.map((square, index) => {
        // 배경 색칠 공부를 위한 스타일 객체를 정의해봐요!
        const winnerStyles = {
          backgroundColor: null,
        };

        // 리액트~ 게임 승자가 있나요?
        // winnerInfo는 null 또는 { winner, condition } 둘 중 하나!
        if (winnerInfo) {
          // 오호? 승자가 있군요! 승자의 조건을 알려주세요!
          const [x, y, z] = winnerInfo.condition;

          // 그럼 승자의 스퀘어(말판)에 색칠을 할께요!
          if (index === x || index === y || index === z) {
            winnerStyles.backgroundColor = WINNERS_COLOR;
          }
        }

        return (
          <Square
            key={index}
            style={winnerStyles}
            onPlay={handlePlayGame(index)}
          >
            {square}
          </Square>
        );
      })}
    </div>
  );
}

export default Squares;
