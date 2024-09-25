import { useEffect } from 'react';
import { useQueryCache } from '@/contexts/Query';
import { useCacheLog } from './useLog';

/** 쿼리 데이터 인터페이스 */
interface QueryData<T = null> {
  status: 'pending' | 'loading' | 'success' | 'error';
  error: null | Error;
  data: T | null;
  isLoading: boolean;
  isError: boolean;
}

/** 초기 쿼리 데이터 */
const INITIAL_QUERY_DATA: QueryData = {
  status: 'pending',
  error: null,
  data: null,
  isLoading: false,
  isError: false,
};

/** 서버 데이터 패치 상태 관리 훅 */
function useQuery<T extends object>(
  url: string,
  { enabled = true, log = false } = {}
): QueryData<T> {
  
  // [상태] 쿼리 캐시 관리
  const [queryCache, setQueryCache] = useQueryCache();

  // [파생된 상태] 쿼리 캐시 데이터
  const queryCacheData = queryCache[url] as QueryData<T>;

  // [파생된 상태] 쿼리 캐싱 유무
  const isCaching = Boolean(queryCacheData && queryCacheData?.data);

  // [이펙트]
  useEffect(() => {
    
    // 업데이트 함수
    const update = (newState: Partial<QueryData<T>>) => {
      setQueryCache((draft) => {
        draft[url] = { ...(draft[url] as QueryData<T>), ...newState };
      });
    };

    // 무시 설정
    let ignore = false;

    // 중복 요청 취소를 위한 구성
    const abortController = new AbortController();

    // 데이터 가져오기 함수
    const fetchData = async () => {
      // 초기 상태 업데이트
      update({
        status: 'loading',
        isLoading: true,
        data: null,
        isError: false,
        error: null,
      });

      try {
        // 데이터 가져오기 요청
        const response = await fetch(url, {
          signal: abortController.signal,
          headers: { 'Content-Type': 'application/json' },
        });

        // 에러 핸들링
        if (!response.ok) {
          const { status, statusText } = response;
          const errorMessage = await response.text();
          // 오류 응답
          throw new Error(`[ ${status} / ${ errorMessage ?? statusText } ] 네트워크 요청/응답에 실패했습니다.`);
        }

        const data = await response.json();
        
        // 무시 설정이 아닌 경우에만, 상태 업데이트
        if (!ignore) {
          update({ status: 'success', isLoading: false, data });
        }
      } catch (error) {
        // 중복 요청 취소 오류가 아닌 경우에만 에러 핸들링
        if (!(error as Error).name.includes('Abort')) {
          // 상태 업데이트
          update({
            status: 'error',
            isLoading: false,
            data: null,
            error: error as Error,
            isError: false,
          });
        }
      }
    };

    // 활성 상태이고, 캐시된 상태가 아닌 경우에만 데이터 요청
    if (enabled && !isCaching) fetchData();

    // 클린업
    return () => {
      ignore = true;
      abortController.abort();
    };
  }, [url, enabled, isCaching, setQueryCache]);

  // [로그] 캐시 관리
  useCacheLog<QueryData<T>, T>(
    log,
    queryCache as unknown as QueryData<T>,
    queryCacheData?.data as T
  );

  // 반환
  return queryCacheData ?? INITIAL_QUERY_DATA;
}

export default useQuery;
