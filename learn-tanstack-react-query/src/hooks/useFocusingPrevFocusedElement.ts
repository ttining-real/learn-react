import { useCallback, useEffect, useRef } from 'react';

/**
 * 이전 렌더링 시점의 초점 요소를 다음 렌더링 시 초점 설정을 위한 커스텀 훅
 */
export function useFocusingPrevFocusedElement() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleKeyUp = () => {
      ref.current = document.activeElement as HTMLElement;
    };

    globalThis.addEventListener('keyup', handleKeyUp);

    return () => {
      globalThis.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const focusLastFocusedElement = useCallback(() => {
    const { current: element } = ref;

    if (element) {
      setTimeout(() => {
        element.focus();
      }, 50);
    }
  }, []);

  return { ref, focusLastFocusedElement };
}
