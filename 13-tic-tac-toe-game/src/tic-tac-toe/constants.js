// 게임에서 사용되는 말(플레이어)를 상수로 정의합니다.
// const CONSTANT = VALUE
// 플레이어 : 🧀 vs. 🐭
export const PLAYER = {
  ONE: '🧀',
  TWO: '🐭',
};

export const PLAYER_COUNT = Object.keys(PLAYER).length;

// 스퀘어 집합: 초기 상태 값
export const INITIAL_SQUARES = Array(9).fill(null);
