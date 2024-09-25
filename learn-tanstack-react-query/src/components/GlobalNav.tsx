import { twMerge } from 'tailwind-merge';
import { NavLink, type NavLinkRenderProps } from 'react-router-dom';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { navigationItems } from '@/router';

const getNavLinkClasses = ({ isActive }: NavLinkRenderProps) => {
  return twMerge(
    'block -ml-1 px-1 text-stone-700 hover:text-stone-950',
    isActive && 'font-semibold text-red-700 hover:text-red-700'
  );
};

const bodyElement = document.body;
bodyElement.setAttribute('tabindex', '-1');

function GlobalNav() {
  const navRef = useRef<HTMLElement>(null);

  const linksMapRef = useRef<Map<string | number, unknown>>(new Map());

  useEffect(() => {
    const handleNavigate = (e: KeyboardEvent) => {
      const currentFocusElement = document.activeElement;
      const links = Array.from(
        linksMapRef.current.values()
      ) as HTMLAnchorElement[];

      const currentIndex = links.findIndex((element) =>
        Object.is(element, currentFocusElement)
      );

      const prevIndex = currentIndex > 0 ? currentIndex - 1 : -1;
      const nextIndex = currentIndex < links.length - 1 ? currentIndex + 1 : 0;

      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowRight':
          e.preventDefault();
          links.at(nextIndex)?.focus();
          break;
        case 'ArrowUp':
        case 'ArrowLeft':
          e.preventDefault();
          links.at(prevIndex)?.focus();
          break;
      }
    };

    const navElement = navRef.current;

    if (navElement) navElement.addEventListener('keydown', handleNavigate);

    return () => {
      if (navElement) navElement.removeEventListener('keydown', handleNavigate);
    };
  }, []);

  const [items] = useState(navigationItems);

  const handleFocusReactApp = useCallback(() => {
    bodyElement.focus();
  }, []);

  return (
    <nav ref={navRef} className="mt-2.5">
      <h2 className="sr-only">React Query 학습 목차</h2>
      <ol className="text-sm flex flex-col gap-1.5">
        {items.map((item) => {
          if (!item.index && item.path) {
            const assignElementToMap = (element: HTMLAnchorElement) => {
              linksMapRef.current.set(item.id, element);
            };

            return (
              <li key={item.id}>
                <NavLink
                  ref={assignElementToMap}
                  to={item.path}
                  onClick={handleFocusReactApp}
                  className={getNavLinkClasses}
                >
                  {item.text}
                </NavLink>
              </li>
            );
          }
        })}
      </ol>
    </nav>
  );
}

export default memo(GlobalNav);
