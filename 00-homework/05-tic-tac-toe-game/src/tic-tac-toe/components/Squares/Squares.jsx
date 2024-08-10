import S from './Squares.module.css';
import { useState } from 'react';
import { PLAYER, INITIAL_SQUARES, PLAYER_COUNT } from '@/tic-tac-toe/constants';
import Square from '@/tic-tac-toe/components/Square/Square';

function Squares() {
  // 게임 상태
  const [squares, setSquares] = useState(INITIAL_SQUARES);
  console.log(squares);

  // 게임 상태 업데이트
  const handlePlayGame = (index) => () => {
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

  // squares 배열에서 truthy 값의 수
  const gameIndex = squares.filter(Boolean).length;
  // 현재 플레이어가 누구인지 계산
  const isPlayerOneTurn = gameIndex % PLAYER_COUNT === 0;
  // 현재 플레이어
  const currentPlayer = isPlayerOneTurn ? PLAYER.ONE : PLAYER.TWO;

  return (
    <div className={S.component}>
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
