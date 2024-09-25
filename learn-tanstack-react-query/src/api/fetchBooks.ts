import { type Books } from '@/types/Books';

const { VITE_PB: PB } = import.meta.env;

export async function fetchBooks(
  page: number,
  perPage: number
): Promise<Books> {
  const response = await fetch(
    `${PB}/api/collections/books/records?page=${page}&perPage=${perPage}`
  );

  return response.json();
}
