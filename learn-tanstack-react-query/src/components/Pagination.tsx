import { ChevronLeft, ChevronRight } from 'react-feather';
import { Link, useSearchParams } from 'react-router-dom';
import { PER_PAGES } from '@/hooks/useBooks';
import { range } from '@/utils';

function Pagination({
  page,
  totalPages,
  pageSize = PER_PAGES,
  isPlaceholderData,
  onActive,
  onPrefetch,
  ...restProps
}: {
  page: number;
  totalPages: number;
  pageSize?: number;
  isPlaceholderData?: boolean;
  onActive?: React.Dispatch<React.SetStateAction<number>>;
  onPrefetch: (page: number, perPage?: number) => void;
  [key: string]: unknown;
}) {
  const [, setSearchParams] = useSearchParams();

  const hasPrevPage = page > 1;
  const hasNextPage = page < totalPages;

  const prevPageNum = page - 1;
  const nextPageNum = page + 1;

  const prevLabel = hasPrevPage
    ? `${prevPageNum} 페이지 이동`
    : '이전 페이지 없음';

  const nextLabel = hasNextPage
    ? `${nextPageNum} 페이지 이동`
    : '다음 페이지 없음';

  const goToPage = (pageNum: number, e?: React.MouseEvent<HTMLElement>) => {
    if (e) e.preventDefault();

    onActive?.(pageNum);
    setSearchParams({
      page: String(pageNum),
    });
  };

  const handlePrevPage = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const button = e.currentTarget;
    if (button.getAttribute('aria-disabled') === 'true') return;
    goToPage(prevPageNum);
  };

  const handleNextPage = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const button = e.currentTarget;
    if (button.getAttribute('aria-disabled') === 'true') return;
    goToPage(nextPageNum);
  };

  const handlePrefetch = (pageNum: number) => () => {
    onPrefetch?.(pageNum, pageSize);
  };

  return (
    <div className="flex items-center gap-2" {...restProps}>
      <button
        type="button"
        title={prevLabel}
        aria-label={prevLabel}
        aria-disabled={isPlaceholderData || !hasPrevPage}
        onPointerEnter={handlePrefetch(page - 1)}
        onClick={handlePrevPage}
      >
        <ChevronLeft size={16} />
      </button>
      <ol className="inline-flex gap-1 list-none pl-0 text-sm">
        {range(1, totalPages).map((pageNum) => {
          const isCurrentPage = page === pageNum;

          return (
            <li key={pageNum}>
              <Link
                to={`#${pageNum}`}
                className={
                  isCurrentPage
                    ? 'underline underline-offset-2 px-0.5'
                    : 'px-0.5'
                }
                aria-current={isCurrentPage ? 'page' : undefined}
                onPointerEnter={handlePrefetch(pageNum)}
                onClick={(e) => goToPage(pageNum, e)}
              >
                {pageNum}
              </Link>
            </li>
          );
        })}
      </ol>
      <button
        type="button"
        title={nextLabel}
        aria-label={nextLabel}
        aria-disabled={isPlaceholderData || !hasNextPage}
        onPointerEnter={handlePrefetch(page + 1)}
        onClick={handleNextPage}
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

export default Pagination;
