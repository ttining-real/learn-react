import S from './Squares.module.css';
import { WINNER_COLOR } from '@/tic-tac-toe/constants';
import Square from '@/tic-tac-toe/components/Square/Square';
import { func } from 'prop-types';
import {
  OneOfPlayerListType,
  WinnerInfoType,
} from '@/tic-tac-toe/types/type.d';

Squares.propTypes = {
  squares: OneOfPlayerListType.isRequired,
  winnerInfo: WinnerInfoType,
  onPlay: func,
};

function Squares({ squares, winnerInfo, onPlay }) {
  return (
    <div className={S.component}>
      {squares.map((square, index) => {
        const winnerStyles = {
          backgroundColor: null,
        };

        if (winnerInfo) {
          const [x, y, z] = winnerInfo.condition;

          if (index === x || index === y || index === z) {
            winnerStyles.backgroundColor = WINNER_COLOR;
          }
        }

        return (
          <Square key={index} onPlay={onPlay(index)} style={winnerStyles}>
            {square}
          </Square>
        );
      })}
    </div>
  );
}

export default Squares;
