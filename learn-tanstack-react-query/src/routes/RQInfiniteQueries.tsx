// --------------------------------------------------------------------------
// ✅ React Query 인피니트 쿼리 (Infinite Queries)
// --------------------------------------------------------------------------
// - [ ] 인피니트 쿼리 (Infinite Queries)
// --------------------------------------------------------------------------

import { useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { SectionWithHeading } from '@/components';
import Spinner from '@/assets/spinner.svg?react';
import { fetchBooks } from '@/api/fetchBooks';
import { PER_PAGES } from '@/hooks/useBooks';
import { useInView } from '@/hooks/useInView';

// 인피니트 쿼리 커스텀 훅
const useBooksInfiniteQuery = () => {
  return useInfiniteQuery({
    queryKey: ['books', 'infinite'],
    queryFn: ({ pageParam }) => fetchBooks(pageParam, PER_PAGES),
    initialPageParam: 1,
    getNextPageParam: ({ page, totalPages }) => {
      const nextPageParam = page + 1;
      if (nextPageParam >= totalPages) return undefined;
      return nextPageParam;
    },
  });
};

// 리액트 개발 도구에 표시될 컴포넌트 이름
Component.displayName = 'RQInfiniteQueries';

// 컴포넌트
export function Component(): JSX.Element {

  // [상태] 북스 인피니트 쿼리
  const booksInfiniteQuery = useBooksInfiniteQuery();
  const { isLoading, data, isFetchingNextPage, hasNextPage, fetchNextPage } = booksInfiniteQuery;

  // [상태] 스크롤 트리거
  const [usingScrollTrigger, setUsingScrollTrigger] = useState(false);

  // [상태 업데이트] 스크롤 트리거 업데이트 이벤트 핸들러
  const handleToggleScrollTrigger = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUsingScrollTrigger(e.target.checked);
  };

  // [참조] 스크롤 가능한 DOM 엘리먼트
  const rootRef = useRef<HTMLDivElement>(null);

  // [참조] 인뷰 감지 (useInView 커스텀 훅 활용)
  const { ref: inViewRef } = useInView<HTMLLIElement>({
    // 지정된 DOM 엘리먼트의 바운딩 박스를 IntersectionObserver의 뷰포트로 사용
    root: rootRef.current,
    // 교차(intersection) 계산에 사용될 루트의 바운딩 박스에 적용할 옵셋 설정
    // 교차 계산 시, 루트 영역의 크기를 키우거나 줄일 때 사용
    rootMargin: '50px',
    // 교차 계산 결과 참/거짓 유무를 반환하는 콜백 함수
    onChange(inView) {
      // 인뷰 DOM 엘리먼트가 인뷰 상태이고, 다음 페이지가 존재하고,
      // 다음 페이지를 불러오는 중이 아니고, 스크롤 트리거를 사용하도록 설정했다면?
      // 다음 페이지를 서버에서 가져오기 실행
      if (inView && hasNextPage && !isFetchingNextPage && usingScrollTrigger) {
        fetchNextPage();
      }
    },
  });

  // 북스
  let books = null;

  // 로딩 중이 아니고, 데이터가 존재한다면?
  if (!isLoading && data) {
    // 북스 데이터 업데이트 (중첩된 페이지 배열 평탄화 설정)
    books = data.pages.map(({ items }) => items).flat();
  }

  // [이벤트 핸들러] 루트 영역 최상단 스크롤 기능
  const handleScrollTop = () => {
    const rootElement = rootRef.current;

    if (rootElement) {
      rootElement.scroll({
        behavior: 'smooth',
        top: 0,
      });
    }
  };

  // 쿼리 클라이언트 인스턴스 가져오기
  const queryClient = useQueryClient();

  // [이벤트 핸들러] 인피니트 쿼리 초기화 설정 기능
  const handleResetInfiniteQueries = () => {
    // 쿼리 클라이언트의 리셋 쿼리 기능 실행
    queryClient.resetQueries({
      queryKey: ['books', 'infinite'],
      exact: true,
    });
  };

  return (
    <>
      <Helmet>
        <title>인피니트 쿼리 ← React Query 러닝 가이드</title>
      </Helmet>

      <SectionWithHeading title="React Query 인피니트 쿼리 (Infinite Queries)">
        <div className="space-y-2">
          <p className="text-slate-950">
            React Query의 "인피니트 쿼리" 개념에 대해 학습합니다.
          </p>
          <div className="flex flex-col gap-2 items-start">
            <div className="flex gap-2 justify-between items-center">
              <button
                type="button"
                className="button"
                onClick={handleResetInfiniteQueries}
              >
                초기화
              </button>
              <button
                type="button"
                className="button"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage || !hasNextPage}
              >
                다음 페이지 {isFetchingNextPage ? '불러오는 중...' : '불러오기'}
              </button>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="scrollTrigger"
                  checked={usingScrollTrigger}
                  onChange={handleToggleScrollTrigger}
                  className="accent-yellow-950 w-5 h-5 cursor-pointer"
                  title="스크롤 트리거 사용"
                />
                <label htmlFor="scrollTrigger" className="text-xs">
                  스크롤 트리거
                </label>
              </div>
            </div>
            <p className="text-yellow-950/80 text-sm">
              페이지 번호 :{' '}
              <code>
                [
                {data
                  ? data?.pageParams.toString() + (hasNextPage ? '' : '(END)')
                  : '...'}
                ]
              </code>
            </p>
          </div>
        </div>
      </SectionWithHeading>

      <div className="inline-flex gap-3 items-center my-5">
        <div ref={rootRef} className="relative scrollArea w-72 resize-y">
          {isLoading ? (
            <Spinner
              title="로딩 중..."
              width={82}
              height={82}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-yellow-600"
            />
          ) : (
            <>
              <ul className="list-none pl-0 flex flex-col gap-2">
                {books?.map((book) => {
                  return (
                    <li key={book.id} className="flex flex-col">
                      <figure className="p-4 flex flex-col gap-2">
                        <img
                          className="w-full rounded-md"
                          src={book.cover_url}
                          alt=""
                        />
                        <figcaption className="text-center text-sm text-yellow-950">
                          {book.title.ko}
                        </figcaption>
                      </figure>
                    </li>
                  );
                })}
                {!isLoading && hasNextPage && (
                  <li role="none" ref={inViewRef} />
                )}
              </ul>
              {!hasNextPage && (
                <button
                  type="button"
                  className="button"
                  onClick={handleScrollTop}
                >
                  최상단으로 스크롤
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
