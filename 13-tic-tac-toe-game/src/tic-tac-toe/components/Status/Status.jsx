// --------------------------------------------------------------------------
// ✅ 틱택토 게임 만들기 (Status 컴포넌트)
// --------------------------------------------------------------------------
// - [ ]
// --------------------------------------------------------------------------

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
    return <h2 className={S.component}>위너!! {winner}</h2>;
  }

  if (isDraw) {
    return <h2 className={S.component}>웁스... 비겼네... 😩 한 판 더?!</h2>;
  }

  return <h2 className={S.component}>다음 플레이어 : {nextPlayer}</h2>;
}

export default Status;
