import S from './Board.module.css';
import Status from '@/tic-tac-toe/components/Status/Status';
import Squares from '@/tic-tac-toe/components/Squares/Squares';

function Board() {
  return (
    <div className={S.component}>
      <Status />
      <Squares />
    </div>
  );
}

export default Board;
