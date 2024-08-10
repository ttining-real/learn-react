import S from './Squares.module.css';
import { useState } from 'react';
import { PLAYER, PLAYER_COUNT, INITIAL_SQUARES } from '@/tic-tac-toe/constants';
import Square from '../Square/Square';

function Squares() {
  // [게임 상태] --------------------------------------------------------------

  const [squares, setSquares] = useState(INITIAL_SQUARES);

  // [게임 상태 업데이트 기능] ----------------------------------------------------

  const handlePlay = (index) => () => {
    console.log(`play game #${index}`);
  };

  // [게임 파생된 상태] ----------------------------------------------------------

  // 게임 순서
  const gameIndex = squares.filter(Boolean).length % PLAYER_COUNT;

  // 현재 게임 플레이어
  const currentPlayer = gameIndex === 0 ? PLAYER.ONE : PLAYER.TWO;

  return (
    <div className={S.component}>
      {squares.map((square, index) => {
        return (
          <Square key={index} onPlay={handlePlay(index)}>
            {square}
          </Square>
        );
      })}
    </div>
  );
}

export default Squares;
