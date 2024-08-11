import S from './Status.module.css';
import { OneOfPlayerType } from '@/tic-tac-toe/types/type.d';
import { bool } from 'prop-types';

Status.propTypes = {
  winner: OneOfPlayerType,
  nextPlayer: OneOfPlayerType.isRequired,
  isDraw: bool,
};

function Status({ winner, nextPlayer, isDraw = false }) {
  if (winner) {
    return <h2 className={S.component}>승자! {winner}</h2>;
  }

  if (isDraw) {
    return <h2 className={S.component}>무승부 입니다! 😳</h2>;
  }

  return <h2 className={S.component}>다음 플레이어 : {nextPlayer}</h2>;
}
export default Status;
