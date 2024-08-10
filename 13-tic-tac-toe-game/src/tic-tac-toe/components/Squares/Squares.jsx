// --------------------------------------------------------------------------
// ✅ 틱택토 게임 만들기 (Squares 컴포넌트)
// --------------------------------------------------------------------------
// - [x] squares 배열 데이터를 게임의 상수로 설정합니다.
// - [x] squares 배열 데이터의 초기 상태 값은 9개의 `null`로 구성합니다.
// - [x] squares 배열 데이터 모듈을 불러온 후, 순환해 Sqaure 컴포넌트를 리스트 렌더링 합니다.
// --------------------------------------------------------------------------

import S from './Squares.module.css';
import { arrayOf, func, number, oneOf, shape } from 'prop-types';
import { PLAYER_LIST, WINNERS_COLOR } from '@/tic-tac-toe/constants';
import Square from '../Square/Square';

const OneOfPlayerType = oneOf(PLAYER_LIST);
const OneOfPlayerListType = arrayOf(OneOfPlayerType);
const WinnerInfoType = shape({
  winner: OneOfPlayerType,
  condition: arrayOf(number),
});

Squares.propTypes = {
  squares: OneOfPlayerListType.isRequired,
  winnerInfo: WinnerInfoType,
  onPlay: func,
};

// 상태를 가지지 않는(Stateless) 컴포넌트
function Squares({ squares, winnerInfo, onPlay }) {
  return (
    <div className={S.component}>
      {/* 리액트 (JSX) 마크업 : 리스트 렌더링 */}
      {squares.map((square, index) => {
        // 배경 색칠 공부를 위한 스타일 객체를 정의해봐요!
        const winnerStyles = {
          backgroundColor: null,
        };

        // 리액트~ 게임 승자가 있나요?
        // winnerInfo는 null 또는 { winner, condition } 둘 중 하나!
        if (winnerInfo) {
          // 오호? 승자가 있군요! 승자의 조건을 알려주세요!
          const [x, y, z] = winnerInfo.condition;

          // 그럼 승자의 스퀘어(말판)에 색칠을 할께요!
          if (index === x || index === y || index === z) {
            winnerStyles.backgroundColor = WINNERS_COLOR;
          }
        }

        return (
          <Square key={index} style={winnerStyles} onPlay={onPlay(index)}>
            {square}
          </Square>
        );
      })}
    </div>
  );
}

export default Squares;
