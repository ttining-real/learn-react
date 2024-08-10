// 게임에서 사용되는 말(플레이어)를 상수로 정의합니다.
// const CONSTANT = VALUE
// 플레이어 : 🧀 vs. 🐭
export const PLAYER = {
  ONE: '🧀',
  TWO: '🐭',
};

// 게임 플레이어의 수
export const PLAYER_COUNT = Object.keys(PLAYER).length;

// 게임판: 초기 상태 값
// [ 0, 1, 2 ]
// [ 3, 4, 5 ]
// [ 6, 7, 8 ]
// export const INITIAL_SQUARES = [null, null, null, null, null, null, null, null, null];
export const INITIAL_SQUARES = Array(9).fill(null);

// 게임의 승리 조건
const WINNER_CONDITIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// 게임이 끝났는 지, 아직 게임 중인지 확인해 결과를 반환하는 함수
export const checkeWinner = () => {
  // ...
};
