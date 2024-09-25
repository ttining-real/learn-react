import { useLayoutEffect } from 'react';

export function useHiddenRQDevtools() {
  useLayoutEffect(() => {
    const devtools = document.querySelector('.tsqd-parent-container');
    const isDev = import.meta.env.DEV && devtools;

    if (isDev) {
      (devtools as HTMLDivElement).hidden = true;
    }

    return () => {
      if (isDev) {
        (devtools as HTMLDivElement).hidden = false;
      }
    };
  }, []);
}
