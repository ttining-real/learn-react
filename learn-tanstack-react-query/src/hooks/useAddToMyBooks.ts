import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addToMyBooks } from '@/api/mutateMyBooks';
import { type MyBooks } from '@/types/MyBooks';
import { type Book } from '@/types/Books';

/** 마이 북스 리스트에 북 추가 뮤테이션 */
export function useAddToMyBooks() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToMyBooks,
    onSuccess: () => {
      // 쿼리 캐시 무효화(invalidate) 설정
      return queryClient.invalidateQueries({
        queryKey: ['my_books'],
      });
    },
  });
}

/** 마이 북스 리스트에 북 추가 뮤테이션 & 옵티미스틱 업데이트 */
export function useAddToMyBooksOptimitic(book: Book) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => addToMyBooks(book.id),
    // 뮤테이션 실행 시, 콜백 실행
    onMutate: async () => {

      // 이전 쿼리 취소
      await queryClient.cancelQueries({ queryKey: ['my_books'] });

      // 이전 쿼리 데이터 스냅샷 생성
      const snapshot = queryClient.getQueriesData({ queryKey: ['my_books'] });

      // 낙관적인 결과를 쿼리 데이터로 쓰기
      queryClient.setQueryData(['my_books'], (prevMyBooks: MyBooks) => {
        const newItem = {
          bookId: book.id,
          expand: {
            bookId: {
              cover: book.cover.split('/').at(-1),
              cover_url: book.cover,
              title: { ko: book.title.ko },
            },
          },
        };

        return { ...prevMyBooks, items: [...prevMyBooks.items, newItem] };
      });

      // 롤백 함수 반환
      return () => {
        // 이전 쿼리 데이터 스냅샷으로 롤백
        queryClient.setQueryData(['my_books'], snapshot);
      };
    },
    // 뮤테이션 오류 발생 시, 콜백 실행
    onError: (_error, _variables, rollback) => {
      // 롤백 (이전 쿼리 데이터 스냅샷으로 캐싱 데이터 복구)
      rollback?.();
    },
    // 뮤테이션 종료 시, 콜백 실행
    onSettled: () => {
      // 쿼리 캐시 무효화(invalidate) 설정
      return queryClient.invalidateQueries({
        queryKey: ['my_books'],
      });
    },
  });
}
