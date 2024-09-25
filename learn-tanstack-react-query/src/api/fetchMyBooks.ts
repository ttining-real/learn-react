import { type MyBooks } from '@/types/MyBooks';

const { VITE_PB: PB } = import.meta.env;

export async function fetchMyBooks(
  page: number = 1,
  perPage: number = 30
): Promise<MyBooks> {
  const response = await fetch(
    `${PB}/api/collections/my_books/records?page=${page}&perPage=${perPage}&expand=bookId&fields=*,expand.bookId.title.ko,expand.bookId.id,expand.bookId.cover_url,expand.bookId.cover`
  );

  return response.json();
}
