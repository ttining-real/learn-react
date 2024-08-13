import { useRef } from 'react';
import { inView, timeline } from 'motion';
import { exact, number, string } from 'prop-types';
import S from './ScrollTriggerItem.module.css';

ScrollTriggerItem.propTypes = {
  item: exact({
    id: number.isRequired,
    image: string.isRequired,
    text: string.isRequired,
  }).isRequired,
};

function ScrollTriggerItem({ item }) {
  const pRef = useRef(null);

  // articleRef.current
  // 어라? 이곳은?
  // 리액트의 성지 아닌가?
  // 이곳에 사이드 이펙트 코드를 작성한다? => 말도 안 됨!
  // 순수성이 깨지니까?

  // 1. 이벤트 핸들러 내부에서
  // 사이드 이펙트 코드 작성

  // 2. ref callback 활용
  // 마운트 이후 시점에 해당 요소에 사이드 이펙트 적용

  const setScrollTrigger = (element) => {
    // 문서에 inView() 함수를 적용할 요소가 있을 경우
    if (element) {
      // 스크롤 트리거 설정
      inView(/* info */ element, ({ target }) => {
        // console.log(target, isIntersecting);
        // 타임라인 애니메이션 설정
        const animation = timeline(
          [
            [target, { opacity: [0, 1] }, { duration: 0.6 }],
            [
              pRef.current,
              { opacity: [0, 1], y: [20, 0] },
              { duration: 0.4, at: '+0.8' },
            ],
          ],
          { easing: 'ease-out' }
        );

        // inView() 함수에 설정된 콜백 함수가 반환하는 함수는
        // 엘리먼트가 뷰포트를 벗어났을 때 실행
        return () => {
          animation.stop();
        };
      });
    }
  };

  return (
    <article
      ref={setScrollTrigger}
      className={S.component}
      style={{ background: `url(${item.image}) no-repeat center / cover` }}
    >
      <p ref={pRef} className={S.text}>
        {item.text}
      </p>
    </article>
  );
}

export default ScrollTriggerItem;
