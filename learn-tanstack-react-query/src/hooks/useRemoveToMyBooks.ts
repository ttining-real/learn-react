import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeToMyBooks } from '@/api/mutateMyBooks';
import { type MyBooks } from '@/types/MyBooks';

export function useRemoveToMyBooks() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeToMyBooks,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['my_books'],
      });
    },
  });
}

export function useRemoveToMyBooksOptimistic(bookId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => removeToMyBooks(bookId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['my_books'] });

      const snapshot = queryClient.getQueriesData({ queryKey: ['my_books'] });

      queryClient.setQueryData(['my_books'], (prevMyBooks: MyBooks) => {
        return {
          ...prevMyBooks,
          items: prevMyBooks.items.filter((b) => b.id !== bookId),
        };
      });

      return () => {
        queryClient.setQueryData(['my_books'], snapshot);
      };
    },
    onError: (_error, _variables, rollback) => {
      rollback?.();
    },
    onSettled: () => {
      return queryClient.invalidateQueries({
        queryKey: ['my_books'],
      });
    },
  });
}
