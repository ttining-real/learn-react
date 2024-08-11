import S from './Board.module.css';
import Status from '@/tic-tac-toe/components/Status/Status';
import Squares from '@/tic-tac-toe/components/Squares/Squares';
import { bool, func } from 'prop-types';
import {
  OneOfPlayerListType,
  OneOfPlayerType,
  WinnerInfoType,
} from '@/tic-tac-toe/types/type.d';

Board.propTypes = {
  winnerInfo: WinnerInfoType,
  nextPlayer: OneOfPlayerType.isRequired,
  isDraw: bool.isRequired,
  squares: OneOfPlayerListType,
  onPlay: func,
};
function Board({ winnerInfo, nextPlayer, isDraw, squares, onPlay }) {
  return (
    <div className={S.component}>
      <Status
        winnerInfo={winnerInfo?.winner}
        nextPlayer={nextPlayer}
        isDraw={isDraw}
      />
      <Squares squares={squares} winnerInfo={winnerInfo} onPlay={onPlay} />
    </div>
  );
}

export default Board;
