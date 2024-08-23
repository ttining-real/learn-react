import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { IoLogoReact } from 'react-icons/io5';
import { useCounter } from '@/stores/counter';

function AppHeader() {
  const increment = useCounter((s) => s.increment);

  return (
    <header className="flex justify-center py-3 bg-white border-b border-b-indigo-500/10">
      <NavLink
        to="/"
        className="flex items-center gap-2 px-3 py-1 rounded-full"
      >
        <IoLogoReact className="text-indigo-800 w-7 h-7 hover:animate-spin" />
        <span className="text-indigo-800 text-sm select-none">
          클라이언트 사이드 라우팅
        </span>
        <button
          type="button"
          onClick={() => increment(7)}
          className="euid-button"
        >
          + 1
        </button>
      </NavLink>
    </header>
  );
}

export default memo(AppHeader);
