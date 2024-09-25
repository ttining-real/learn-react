import { useRef } from "react";

/** 캐시 아이템 인터페이스 */
interface CacheItem {
  id?: number;
  name?: string;
}

/** 캐시 관리 로그 훅 */
export function useCacheLog<T extends object, A extends CacheItem>(
  enabled: boolean = false,
  cache: T,
  cacheItem?: A
) {

  // 로그 참조
  const logRef = useRef(null);

  // 로그 활성화 상태인 경우에만 작동
  if (enabled) {
    // 캐시 데이터 값 배열
    const cacheData = Object.values(cache);
    
    // 현재 캐시 데이터 추출
    const currentCacheData = cacheData.at(-1)?.data;

    // 현재 캐시 데이터가 있고, 로그 참조된 값과 현재 캐시 데이터가 다를 경우에만 작동
    if (currentCacheData && !Object.is(logRef.current, currentCacheData)) {
      console.group('데이터 캐싱');
      console.log(cacheData);
      console.groupEnd();
      // 로그 참조에 현재 캐시 데이터 할당
      logRef.current = currentCacheData;
    } 
    // 그렇지 않은 경우
    else {
      // 캐시 아이템이 있을 경우
      if (cacheItem) {
        console.group('캐싱된 데이터 사용');
        // 캐시 데이터 찾기
        const { data } = cacheData.find(({ data }) => data.name === cacheItem.name);
        console.log(data.id, data.name);
        console.groupEnd();
      }
    }
  }
}