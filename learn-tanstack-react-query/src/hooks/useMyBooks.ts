import { useQuery } from '@tanstack/react-query';
import { fetchMyBooks } from '@/api/fetchMyBooks';
import { type MyBooks } from '@/types/MyBooks';

export function useMyBooks() {
  return useQuery({
    queryKey: ['my_books'],
    queryFn: () => fetchMyBooks(),
    staleTime: 1000 * 10,
    select: (data) => setPBImageUrl(data),
  });
}

const { VITE_PB: PB } = import.meta.env;

function setPBImageUrl(data: MyBooks) {
  const items = data.items.map((item) => {
    const coverUrl = `${PB}/api/files/books/${item.bookId}/${item.expand.bookId.cover}`;
    return {
      ...item,
      expand: {
        bookId: {
          ...item.expand.bookId,
          cover_url: coverUrl,
        },
      },
    };
  });

  return { ...data, items };
}
