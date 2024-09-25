import { useImmer } from 'use-immer';
import { useCallback, useEffect, useMemo } from 'react';
import type { FetchData } from '@/types/FetchData';

/** 서버 URL에 데이터 요청해 가져오기 훅 */
function useFetch<T>(url: string, { enabled = true } = {}) {

  // [상태] 서버 데이터 초기화
  const [data, setData] = useImmer<FetchData<T>>({
    status: 'pending',
    error: null,
    data: null,
    isLoading: false,
    isError: false,
  });

  // 서버에서 데이터를 가져오는 메모이제이션 함수
  const fetchData = useCallback(async () => {
    // 데이터 가져오기 상태 초기화
    setData((draft) => {
      draft.status = 'loading';
      draft.error = null;
      draft.isLoading = true;
      draft.isError = false;
    });

    try {
      const response = await fetch(url, {
        headers: { 'Content-Type': 'application/json' },
      });

      // 응답이 실패한 경우
      if (!response.ok) {
        const { status, statusText } = response;
        const errorMessage = await response.text();

        // 오류 전달
        throw new Error(
          `[ ${status} / ${ errorMessage ?? statusText } ] 네트워크 요청/응답에 실패했습니다.`
        );
      }

      // 응답이 성공한 경우
      const data = await response.json();

      // 서버 데이터를 상태로 업데이트
      setData((draft) => {
        draft.data = data;
        draft.status = 'success';
      });
    } catch (error) {
      // 중복 요청 취소가 아닌 경우
      if (!(error as Error).name.includes('Abort')) {
        // 오류 데이터를 상태로 업데이트
        setData((draft) => {
          draft.error = error as Error;
          draft.status = 'error';
          draft.isError = true;
          draft.isLoading = false;
        });
      }
    }
  }, [url, setData]);

  // [이펙트]
  useEffect(() => {

    // enabled 조건이 거짓인 경우, 종료
    if (!enabled) return;

    // 무시 설정
    let ignore = false;

    // 중복 요청 취소를 위한 설정
    const abortController = new AbortController();

    // 서버에서 데이터 가져오기 함수
    const fetchData = async () => {
      // 데이터 가져오기 상태 초기화
      setData((draft) => {
        draft.status = 'loading';
        draft.error = null;
        draft.isLoading = true;
        draft.isError = false;
      });

      try {
        // 서버에 데이터 가져오기 요청
        const response = await fetch(url, {
          signal: abortController.signal,
          headers: { 'Content-Type': 'application/json' },
        });
        
        // 응답이 실패한 경우
        if (!response.ok) {
          const { status, statusText } = response;
          const errorMessage = await response.text();

          // 오류 전달
          throw new Error(
            `[ ${status} / ${ errorMessage ?? statusText } ] 네트워크 요청/응답에 실패했습니다.`
          );
        }

        // 응답이 성공한 경우
        const data = await response.json();

        // 무시 설정이 false인 경우에만 상태 업데이트
        if (!ignore) {
          // 서버 데이터를 상태로 업데이트
          setData((draft) => {
            draft.data = data;
            draft.status = 'success';
            draft.isLoading = false;
          });
        }
      } catch (error) {

        // 중복 요청 취소가 아닌 경우
        if (!(error as Error).name.includes('Abort')) {
          // 오류 데이터를 상태로 업데이트
          setData((draft) => {
            draft.error = error as Error;
            draft.status = 'error';
            draft.isError = true;
            draft.isLoading = false;
          });
        }
      }
    };

    // 서버에서 데이터 가져오도록 요청
    fetchData();

    // 클린업
    return () => {
      // 중복 요청 취소
      abortController.abort();
      // 무시 활성화
      ignore = true;
    };
  }, [url, setData, enabled]);

  // [메모] useFetch 훅 함수의 반환 값
  return useMemo(
    () => ({ ...data, refetch: fetchData }),
    [data, fetchData]
  );
}

export default useFetch;
