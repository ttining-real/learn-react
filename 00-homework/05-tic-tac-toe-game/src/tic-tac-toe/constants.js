// 게임 플레이어 상수 정의
export const PLAYER = {
  ONE: '🧀',
  TWO: '🐭',
};

// 초기 게임판
export const INITIAL_SQUARES = Array(9).fill(null);

// 게임 플레이어 목록
export const PLAYER_LIST = Object.values(PLAYER);

// 게임 플레이어 수
export const PLAYER_COUNT = Object.keys(PLAYER).length;

export const WINNER_COLOR = '#ffe4a4';

export const WINNER_CONDITIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const checkedWinner = (squares) => {
  // console.log(squares);

  let winnerInfo = null;

  for (const [x, y, z] of WINNER_CONDITIONS) {
    const winner = squares[x];

    if (winner && winner === squares[y] && winner === squares[z]) {
      console.log('GAME OVER');

      winnerInfo = {
        winner,
        condition: [x, y, z],
      };

      break;
    }
  }

  return winnerInfo;
};
