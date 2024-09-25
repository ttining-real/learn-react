import { memo } from 'react';
import { range } from '@/utils';
import { PER_PAGES } from '@/hooks/useBooks';

type PlaceholderNamespace = Record<
  string,
  React.MemoExoticComponent<
    ({
      pageSize,
    }: {
      pageSize?: number | undefined;
    }) => JSX.Element | JSX.Element[]
  >
>;

const Placeholder: PlaceholderNamespace = {};

export default Placeholder;

Placeholder.Books = memo(({ pageSize = PER_PAGES }: { pageSize?: number }) => {
  return range(1, pageSize).map((index) => (
    <li key={index}>
      <figure className="animate-pulse aspect-auto w-[84px] h-32 bg-yellow-200/90" />
    </li>
  ));
});

Placeholder.Pagination = memo(() => {
  return (
    <figure className="animate-pulse aspect-auto w-32 h-5 mt-1 bg-yellow-200/90" />
  );
});
