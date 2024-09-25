/** 특정 범위의 숫자 배열을 반환하는 유틸리티 함수 */
export function range(
  start: number = 0,
  count: number = 10,
  step: number = 1
): number[] {
  const rangeResults: number[] = [];

  Array(count)
    .fill(null)
    .forEach((_, index) => {
      rangeResults.push(index === 0 ? start : (start += step));
    });

  return rangeResults;
}