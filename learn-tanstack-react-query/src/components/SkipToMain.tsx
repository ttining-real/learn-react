import { memo, useCallback, useEffect } from 'react';
import colors from 'tailwindcss/colors';
import A11yHidden from './A11yHidden';

function SkipToMain() {
  const handleGoToMain = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();

      const mainElement = document.querySelector('main');

      if (mainElement) {
        if (!mainElement.getAttribute('tabindex')) {
          mainElement.setAttribute('tabindex', '-1');
          mainElement.style.outline = '0';
        }

        mainElement.focus();
      }
    },
    []
  );

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && e.shiftKey) {
        const element = document.querySelector('[href="#go-to-main"]');
        if (element) (element as HTMLElement).focus();
      }
    };

    globalThis.addEventListener('keydown', handleKeydown);

    return () => {
      globalThis.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  return (
    <A11yHidden
      as="a"
      href="#go-to-main"
      focusable
      style={skipToContentStyles}
      onClick={handleGoToMain}
    >
      메인 영역 이동
    </A11yHidden>
  );
}

export default memo(SkipToMain);

const skipToContentStyles = {
  position: 'fixed',
  top: 16,
  left: 12,
  padding: '12px 16px',
  backdropFilter: 'blur(2px)',
  backgroundColor: colors.slate[950],
  color: colors.slate[50],
  fontSize: 14,
  borderRadius: 4,
};
