import S from './Board.module.css';
import Status from '@/tic-tac-toe/components/Status/Status';
import Squares from '@/tic-tac-toe/components/Squares/Squares';
import { useState } from 'react';
import {
  PLAYER,
  INITIAL_SQUARES,
  PLAYER_COUNT,
  checkedWinner,
  // WINNER_COLOR,
} from '@/tic-tac-toe/constants';

function Board() {
  // 게임 상태
  const [squares, setSquares] = useState(INITIAL_SQUARES);

  // 게임 상태 업데이트
  const handlePlayGame = (index) => () => {
    if (winnerInfo) {
      alert('GAME OVER');
      return;
    }
    setSquares((prevSquares) => {
      // 새로운 배열 반환
      const nextSquares = prevSquares.map((square, squareIndex) => {
        // 현재 반복 중인 요소와 클릭된 칸의 인덱스가 같다면, 현재 플레이어 반환
        if (squareIndex === index) {
          return currentPlayer;
        }
        // 클릭된 칸이 아니면 상태 유지
        return square;
      });

      // 업데이트 된 상태 저장
      return nextSquares;
    });
  };

  const winnerInfo = checkedWinner(squares);

  // squares 배열에서 truthy 값의 수
  const gameIndex = squares.filter(Boolean).length;
  // 현재 플레이어가 누구인지 계산
  const isPlayerOneTurn = gameIndex % PLAYER_COUNT === 0;
  // 현재 플레이어
  const currentPlayer = isPlayerOneTurn ? PLAYER.ONE : PLAYER.TWO;

  const isDraw = !winnerInfo && squares.every(Boolean);

  return (
    <div className={S.component}>
      <Status
        winnerInfo={winnerInfo}
        nextPlayer={currentPlayer}
        isDraw={isDraw}
      />
      <Squares
        squares={squares}
        winnerInfo={winnerInfo}
        onPlay={handlePlayGame}
      />
    </div>
  );
}

export default Board;
