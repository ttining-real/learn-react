// --------------------------------------------------------------------------
// ✅ React Query 페이지네이션 (Pagination)
// --------------------------------------------------------------------------
// - [ ] 페이지네이션 (Pagination)
// --------------------------------------------------------------------------

import { Helmet } from 'react-helmet-async';
import { Pagination, Placeholder, SectionWithHeading } from '@/components';
import { useBooks, usePrefetchBooks } from '@/hooks/useBooks';
import { usePage } from '@/hooks/usePage';

// 리액트 개발 도구에 표시될 컴포넌트 이름
Component.displayName = 'RQPagination';

// 컴포넌트
export function Component(): JSX.Element {
  
  // [상태] 페이지 번호
  const { page, setPage } = usePage();
  
  // [상태] 북 데이터
  const booksQuery = useBooks(page);

  // 북 데이터, 플레이스 홀더 데이터 상태 구조 분해 할당
  const { data: books, isPlaceholderData } = booksQuery;

  // 북 데이터 미리 가져오기(프리패치) 함수 추출
  const prefetchBooks = usePrefetchBooks();

  // 리스트 스타일 객체
  // - isPlaceholderData 값에 따라 불투명도 조절
  const listStyles = { opacity: isPlaceholderData ? 0.5 : 1 };

  // 렌더링 할 엘리먼트(북, 페이지네이션) 변수
  let renderBooks: JSX.Element | JSX.Element[] = <Placeholder.Books />;
  let renderPagination: JSX.Element = <Placeholder.Pagination />;

  // 조건부 렌더링
  if (books) {
    // 북스 리스트 마크업
    renderBooks = books.items.map((item) => {
      const title = item.title.ko;
      return (
        <li key={item.id}>
          <img
            key={item.id}
            src={item.cover}
            alt={title}
            title={title}
            className="aspect-auto w-[84px] h-32"
          />
        </li>
      );
    });

    // 페이지네이션 마크업
    renderPagination = (
      <Pagination
        page={books.page}
        totalPages={books.totalPages}
        onActive={setPage}
        onPrefetch={prefetchBooks}
        isPlaceholderData={isPlaceholderData}
      />
    );
  }

  return (
    <>
      <Helmet>
        <title>페이지네이션 ← React Query 러닝 가이드</title>
      </Helmet>

      <SectionWithHeading title="React Query 페이지네이션 (Pagination)">
        <div className="space-y-1">
          <p className="text-slate-950">
            React Query의 "페이지네이션" 개념에 대해 학습합니다.
          </p>
        </div>
      </SectionWithHeading>

      <div className="flex gap-3 items-center my-5">
        <div className="flex flex-col justify-start items-center gap-1 border-4 border-yellow-950/20 p-2">
          <ul
            className="flex gap-2 justify-center pl-0 min-w-96 list-none"
            style={listStyles}
          >
            {renderBooks}
          </ul>
          {renderPagination}
        </div>
      </div>
    </>
  );
}
