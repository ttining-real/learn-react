import './styles/main.css';
import S from './Game.module.css';
import Board from '@/tic-tac-toe/components/Board/Board';
import History from '@/tic-tac-toe/components/History/History';

function Game() {
  return (
    <div className={S.component}>
      <Board />
      <History />
    </div>
  );
}

export default Game;
