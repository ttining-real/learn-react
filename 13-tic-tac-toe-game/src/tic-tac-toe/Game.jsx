// --------------------------------------------------------------------------
// ✅ 틱택토 게임 만들기 (Game 컴포넌트)
// --------------------------------------------------------------------------
// - [x] Game 컴포넌트 내부에서 게임 플레이어 말을 게임의 상수로 설정합니다.
// - [x] 게임의 상수인 플레이어를 Game 컴포넌트에서 모듈로 불러옵니다.
// - [x] 구현할 게임의 마크업을 분석해서 하위 컴포넌트 트리를 구성합니다. (컴포넌트 추출)
// - [x] Board 컴포넌트의 상태를 Game 컴포넌트로 끌어올립니다. (이유: History 컴포넌트와 상태 공유)
// --------------------------------------------------------------------------

import './styles/main.css';
import S from './Game.module.css';
import Board from './components/Board/Board';
import History from './components/History/History';
import { useState } from 'react';
import {
  checkeWinner,
  INITIAL_SQUARES,
  PLAYER,
  PLAYER_COUNT,
} from './constants';

function Game() {
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
        return idx === index ? nextPlayer : square;
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
  const nextPlayer = isPlayerOneTurn ? PLAYER.ONE : PLAYER.TWO; // '🧀'

  // 게임 상황은 어떠한가? 비겼는가?
  // 모든 게임판의 말이 채워졌고, 승자가 없네요? 그럼 게임은 비긴거죠!
  const isDraw = !winnerInfo && squares.every(Boolean);

  return (
    <div className={S.component}>
      <Board
        squares={squares}
        winnerInfo={winnerInfo}
        nextPlayer={nextPlayer}
        onPlay={handlePlayGame}
        isDraw={isDraw}
      />
      <History />
    </div>
  );
}

export default Game;
