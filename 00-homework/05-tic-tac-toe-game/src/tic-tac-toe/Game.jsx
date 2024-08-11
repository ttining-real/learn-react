import './styles/main.css';
import S from './Game.module.css';
import Board from '@/tic-tac-toe/components/Board/Board';
import History from '@/tic-tac-toe/components/History/History';
import { useState } from 'react';
import {
  PLAYER,
  INITIAL_SQUARES,
  PLAYER_COUNT,
  checkedWinner,
} from '@/tic-tac-toe/constants';

function Game() {
  // 게임 상태
  const [gameHistory, setGameHistory] = useState([INITIAL_SQUARES]);

  // 게임 순서
  const [gameIndex, setGameIndex] = useState(0);

  // 게임 상태 업데이트
  const handlePlayGame = (index) => () => {
    if (winnerInfo) {
      alert('GAME OVER');
      return;
    }

    const nextGameIndex = gameIndex + 1;
    setGameIndex(nextGameIndex);

    const nextSquares = currentSquares.map((square, idx) => {
      return idx === index ? currentPlayer : square;
    });

    const nextGameHistory = [
      ...gameHistory.slice(0, nextGameIndex),
      nextSquares,
    ];
    setGameHistory(nextGameHistory);
  };

  const handleTimeTravel = (index) => {
    setGameIndex(index);
  };

  const currentSquares = gameHistory[gameIndex];

  const winnerInfo = checkedWinner(currentSquares);

  // 다음 게임 순서
  // const nextGameIndex = gameIndex + 1;
  // setGameIndex(nextGameIndex);

  // squares 배열에서 truthy 값의 수
  // const gameIndex = squares.filter(Boolean).length;

  // 현재 플레이어가 누구인지 계산
  const isPlayerOneTurn =
    currentSquares.filter(Boolean).length % PLAYER_COUNT === 0;
  // 현재 플레이어
  const currentPlayer = isPlayerOneTurn ? PLAYER.ONE : PLAYER.TWO;

  const isDraw = !winnerInfo && currentSquares.every(Boolean);

  return (
    <div className={S.component}>
      <Board
        squares={currentSquares}
        winnerInfo={winnerInfo}
        nextPlayer={currentPlayer}
        onPlay={handlePlayGame}
        isDraw={isDraw}
      />
      <History
        gameHistory={gameHistory}
        gameIndex={gameIndex}
        onTimeTravel={handleTimeTravel}
      />
    </div>
  );
}

export default Game;
