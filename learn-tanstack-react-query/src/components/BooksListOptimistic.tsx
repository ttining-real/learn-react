import { memo } from 'react';
import colors from 'tailwindcss/colors';
import { Loader, PlusSquare } from 'react-feather';
import { useBooks, usePrefetchBooks } from '@/hooks/useBooks';
import { useAddToMyBooksOptimitic } from '@/hooks/useAddToMyBooks';
import { usePage } from '@/hooks/usePage';
import { type Book } from '@/types/Books';
import Placeholder from './Placeholder';
import Pagination from './Pagination';

// 페이지 갯수
const PAGE_SIZE = 3;

// 컴포넌트
function BooksListOptimistic(): JSX.Element {
  const { page, setPage } = usePage(4);
  const booksQuery = useBooks(page, PAGE_SIZE);

  const { data: books, isPlaceholderData } = booksQuery;

  const prefetchBooks = usePrefetchBooks();

  let renderBooks: JSX.Element | JSX.Element[] = (
    <Placeholder.Books pageSize={PAGE_SIZE} />
  );

  let renderPagination: JSX.Element = <Placeholder.Pagination />;

  if (books) {
    renderBooks = books.items.map((item) => {
      const title = item.title.ko;
      const label = `마이 북에 "${title}" 추가`;

      return <BookItem key={item.id} book={item} title={title} label={label} />;
    });

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

export default memo(BooksListOptimistic);

// 하위 컴포넌트
function BookItem({
  book,
  title,
  label,
}: {
  book: Book;
  title: string;
  label: string;
}): JSX.Element {
  const { mutate, isPending } = useAddToMyBooksOptimitic(book);

  return (
    <li className="relative">
      <img
        src={book.cover}
        alt={title}
        title={title}
        className="aspect-auto w-[84px] h-32"
      />
      <button
        type="button"
        title={label}
        aria-label={label}
        className="absolute inset-0 grid place-content-center bg-black/70 opacity-0 hover:opacity-100 transition-opacity focus:opacity-100"
        onClick={() => mutate()}
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
}
