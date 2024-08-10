import S from './Squares.module.css';
import { PLAYER } from '@/tic-tac-toe/constants';
import Square from '../Square/Square';

function Squares() {
  return (
    <div className={S.component}>
      <Square />
      <Square>{PLAYER.ONE}</Square>
      <Square>{PLAYER.TWO}</Square>
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
    </div>
  );
}

export default Squares;
