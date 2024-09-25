import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export function usePage(initialPage: number = 1, pageKey: string = 'page') {
  const [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = useState(() => {
    const pageNum = searchParams.get(pageKey);
    return pageNum ? Number(pageNum) : initialPage;
  });

  useEffect(() => {
    const page = searchParams.get(pageKey);
    if (!page) {
      setSearchParams({ page: String(initialPage) });
    }
  }, [initialPage, pageKey, searchParams, setSearchParams]);

  return { page, setPage };
}
