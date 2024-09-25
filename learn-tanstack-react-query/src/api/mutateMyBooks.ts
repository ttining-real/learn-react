import { type Book } from '@/types/Books';
const { VITE_PB: PB } = import.meta.env;

export async function addToMyBooks(bookId: Book['id']) {
  const response = await fetch(`${PB}/api/collections/my_books/records`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ bookId }),
  });

  if (!response.ok) {
    switch (response.status) {
      case 400:
        return new Response('레코드를 생성하지 못했습니다.');
      case 403:
        return new Response('이 요청을 수행할 권한이 없습니다.');
    }
  }

  return response.json();
}

export async function removeToMyBooks(bookId: Book['id']) {
  const response = await fetch(
    `${PB}/api/collections/my_books/records/${bookId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    switch (response.status) {
      case 400:
        return new Response(
          '레코드를 삭제하지 못했습니다. 레코드가 필수 관계 참조의 일부가 아닌지 확인하세요.'
        );
      case 403:
        return new Response('요청한 리소스를 찾을 수 없습니다.');
    }
  }

  return null;
}
