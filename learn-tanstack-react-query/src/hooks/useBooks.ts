import { useCallback } from 'react';
import { queryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchBooks } from '@/api/fetchBooks';
import { type Books } from '@/types/Books';
import { preloadImage } from '@/utils';

// 환경 변수
const { VITE_PB: PB } = import.meta.env;

// 페이지 갯수
export const PER_PAGES = 4;

/** 북스 쿼리 옵션 객체를 생성하는 함수 */
export const getBooksQueryOptions = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['books', { page, perPage }],
    queryFn: () => fetchBooks(page, perPage),
    select: setPBImageUrl,
    placeholderData: (prevData) => prevData,
    enabled: page > 0,
    staleTime: 1000 * 10,
    gcTime: 1000 * 60,
  });

/** 북스 데이터 쿼리 훅 */
export function useBooks(page: number, perPage: number = PER_PAGES) {
  return useQuery(getBooksQueryOptions(page, perPage));
}

/** 북스 데이터 프리패치 쿼리 훅 */
export function usePrefetchBooks() {
  const queryClient = useQueryClient();

  return useCallback(
    async (page: number, perPage: number = PER_PAGES) => {
      const queryOptions = getBooksQueryOptions(page, perPage);
      
      // 북스 데이터 프리패치
      await queryClient.prefetchQuery(queryOptions);

      // 이미지 미리 가져오기 (사용자 경험 향상)
      const data = queryClient.getQueryData(queryOptions.queryKey);

      if (data) {
        setPBImageUrl(data).items.forEach(({ cover }) => preloadImage(cover));
      }
    },
    [queryClient]
  );
}

// 유틸리티 함수 (PocketBase 이미지 URL 업데이트)
function setPBImageUrl(data: Books) {
  const items = data.items.map((item) => {
    const coverUrl = `${PB}/api/files/books/${item.id}/${item.cover}`;
    return { ...item, cover: coverUrl };
  });

  return { ...data, items };
}
