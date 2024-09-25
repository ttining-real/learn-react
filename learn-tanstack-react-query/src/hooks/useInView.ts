import { useEffect, useRef } from 'react';

/** IntersectionObserver 옵션 타입 */
type Options = IntersectionObserverInit & {
  onChange?: (inView: boolean) => void;
};

/** 인뷰(in View) 감지 및 트리거를 위한 커스텀 훅 */
export function useInView<T = HTMLElement>(
  // IntersectionObserver 옵션 초기값
  options: Options = {
    root: null,
    rootMargin: '0px 0px 0px 0px',
    threshold: 0,
  }
) {

  // 참조
  const ref = useRef<T>(null);

  // 옵션 구조 분해 할당
  const { onChange, ...restOptions } = options;

  // [이펙트]
  useEffect(() => {
    // 옵저버 생성
    const observer = new IntersectionObserver(
      ([entry]) => {
        // onChange가 함수인 경우,
        // 첫번째 엔트리가 인뷰되었는지 여부를 전달해 실행
        onChange?.(entry.isIntersecting);
      },
      {
        // IntersectionObserver 옵션 설정
        ...restOptions,
      }
    );

    // 인뷰 타겟 엘리먼트
    const targetElement = ref.current;

    // 인뷰 타겟 엘리먼트가 존재할 경우
    if (targetElement) {
      // 타이머 설정 (0.05초 뒤 콜백 실행)
      setTimeout(
        // 옵저버를 통해 인뷰 타겟 엘리먼트 관찰
        () => observer.observe(targetElement as unknown as HTMLElement),
        50
      );
    }

    // 클린업
    return () => {
      // 인뷰 타겟 엘리먼트가 존재할 경우
      if (targetElement) {
        // 옵저버를 통해 인뷰 타겟 엘리먼트 관찰 중지
        observer.unobserve(targetElement as unknown as HTMLElement);
      }
    };
  }, [onChange, restOptions]);

  // 참조 반환
  return { ref };
}
