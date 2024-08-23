import { useCounter } from '@/stores/counter';
import { memo } from 'react';

function AppFooter() {
  const { decrement, count } = useCounter(({ count, decrement }) => ({
    count,
    decrement,
  }));

  const currentYear = new Date().getFullYear();
  return (
    <footer className="flex items-center justify-center py-5">
      <small lang="en" className="text-indigo-800">
        Copyright all Reserved. &copy;{' '}
        <button
          type="button"
          className="euid-button"
          onClick={() => decrement(4)}
        >
          {count}
          {/* {currentYear} */}
        </button>
      </small>
    </footer>
  );
}

export default memo(AppFooter);
