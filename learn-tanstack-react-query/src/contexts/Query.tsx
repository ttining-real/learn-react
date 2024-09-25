/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";
import { type ImmerHook, useImmer } from "use-immer";

/** 쿼리 컨텍스트 */
const QueryContext = createContext<ImmerHook<{[key: string]: unknown }> | null>(null);

/** 쿼리 프로바이더 래퍼 컴포넌트 */ 
export function QueryProvider(props: { children: React.ReactNode }): JSX.Element {
  
  // [상태] 쿼리 캐시
  const queryValues = useImmer({});

  // [공급] 쿼리 캐시
  return <QueryContext.Provider value={queryValues} {...props} />
}

/** 쿼리 캐시 관리 훅 */
export function useQueryCache(): ImmerHook<{[key: string]: unknown }> {
  
  // 쿼리 캐시 값 가져오기
  const queryCache = useContext(QueryContext);

  // 에러 핸들링
  if (!queryCache) throw new Error('useQueryCache() 훅은 QueryProvider 내부에서만 사용 가능합니다.');

  // 쿼리 캐시 값 반환
  return queryCache;
}