import { memo } from 'react';
import colors from 'tailwindcss/colors';
import { Loader, PlusSquare } from 'react-feather';
import { useBooks, usePrefetchBooks } from '@/hooks/useBooks';
import { useAddToMyBooks } from '@/hooks/useAddToMyBooks';
import { usePage } from '@/hooks/usePage';
import Placeholder from './Placeholder';
import Pagination from './Pagination';

// 페이지 갯수
const PAGE_SIZE = 3;

// 컴포넌트
function BooksList() {

  // [뮤테이션 및 뮤테이션 상태] (useAddToMyBooks 커스텀 훅 사용)
  const { mutate, isPending } = useAddToMyBooks();

  // [상태] 페이지
  const { page, setPage } = usePage(4);
  
  // [상태] 북스 쿼리
  const booksQuery = useBooks(page, PAGE_SIZE);
  // 북스 쿼리 구조 분해 할당
  const { data: books, isPlaceholderData } = booksQuery;

  // 북스 데이터 프리패치 함수 가져오기 (usePrefetchBooks 커스텀 훅 사용)
  const prefetchBooks = usePrefetchBooks();

  // 렌더링 할 북스 마크업
  let renderBooks: JSX.Element | JSX.Element[] = (
    <Placeholder.Books pageSize={PAGE_SIZE} />
  );

  // 렌더링 할 페이지네이션 마크업
  let renderPagination: JSX.Element = <Placeholder.Pagination />;

  // 북스 데이터가 존재할 경우
  if (books) {
    // 북스 마크업 업데이트
    renderBooks = books.items.map((item) => {
      const title = item.title.ko;
      const label = `마이 북에 "${title}" 추가`;

      return (
        <li key={item.id} className="relative">
          <img
            key={item.id}
            src={item.cover}
            alt={title}
            title={title}
            className="aspect-auto w-[84px] h-32"
          />
          <button
            type="button"
            title={label}
            aria-label={label}
            className="absolute inset-0 grid place-content-center bg-black/70 opacity-0 hover:opacity-100 transition-opacity focus:opacity-100"
            onClick={() => mutate(item.id)}
            disabled={isPending}
          >
            {isPending ? (
              <Loader
                width={32}
                height={32}
                color={colors.white}
                className="animate-spin opacity-50"
              />
            ) : (
              <PlusSquare width={32} height={32} color={colors.white} />
            )}
          </button>
        </li>
      );
    });

    // 페이지네이션 마크업 업데이트
    renderPagination = (
      <Pagination
        page={books.page}
        totalPages={books.totalPages}
        onActive={setPage}
        onPrefetch={prefetchBooks}
        pageSize={PAGE_SIZE}
        isPlaceholderData={isPlaceholderData}
      />
    );
  }

  // 리스트 스타일 (isPlaceholderData 상태에 따라 불투명도 설정)
  const listStyles = { opacity: isPlaceholderData ? 0.5 : 1 };

  return (
    <>
      <ul
        className="flex gap-2 justify-center pl-0 min-w-96 list-none"
        style={listStyles}
      >
        {renderBooks}
      </ul>
      {renderPagination}
    </>
  );
}

export default memo(BooksList);
