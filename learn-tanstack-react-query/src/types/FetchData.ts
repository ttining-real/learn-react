// 데이터 가져오기 인터페이스
export interface FetchData<T> {
  status: STATUS;
  error: null | Error;
  data: null | T;
  isLoading: boolean;
  isError: boolean;
}

// 상태 타입
type STATUS = 'pending' | 'loading' | 'success' | 'error';
