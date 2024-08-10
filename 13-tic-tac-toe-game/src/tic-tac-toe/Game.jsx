// --------------------------------------------------------------------------
// ✅ 틱택토 게임 만들기
// --------------------------------------------------------------------------
// - [ ] Game 컴포넌트 내부에서 게임 플레이어 말을 게임의 상수로 설정합니다.
// - [ ] 게임의 상수인 플레이어를 Game 컴포넌트에서 모듈로 불러옵니다.
// - [ ] 구현할 게임의 마크업을 분석해서 하위 컴포넌트 트리를 구성합니다. (컴포넌트 추출)
// --------------------------------------------------------------------------
import './styles/main.css';
import S from './Game.module.css';
import Board from './components/Board/Board';
import History from './components/History/History';
// import { PLAYER } from './constants';

// console.log(PLAYER.ONE);
// console.log(PLAYER.TWO);

function Game() {
  return (
    <div className={S.component}>
      <Board />
      <History />
    </div>
  );
}

export default Game;
