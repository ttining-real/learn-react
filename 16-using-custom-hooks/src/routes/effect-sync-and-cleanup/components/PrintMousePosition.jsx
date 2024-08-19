import useDocumentTitle from '@/hooks/useDocumentTitle';
import useEventListener from '@/hooks/useEventListener';
import { useCallback, useState } from 'react';
import S from './PrintMousePosition.module.css';

function PrintMousePosition() {
  const documentTitle = '마우스 위치 추적 ← 이펙트 동기화 & 정리';
  useDocumentTitle(documentTitle);

  /* -------------------------------------------------------------------------- */

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { x, y } = mousePosition;

  // const eventHandler = ({ pageX: x, pageY: y }) => {
  //   // 상태 업데이트 -> 렌더 트리거 -> 컴포넌트 리-렌더링(함수 재실행)
  //   setMousePosition({ x, y });
  // };

  // useEventListener(document, 'mousemove', eventHandler);

  // 처음 정의된 이후, 종속성 배열이 비어 있기 때문에
  // 이 함수 참조는 리-렌더링 과정에서 항상 동일하다. (변경되지 않는다.)
  const onMouseTracking = useCallback(({ pageX: x, pageY: y }) => {
    // 상태 업데이트 -> 렌더 트리거 -> 컴포넌트 리-렌더링(함수 재실행)
    setMousePosition({ x, y });
  }, []);

  useEventListener(document, 'mousemove', onMouseTracking);

  return (
    <div className={S.component}>
      <output>
        {x} <span>/</span> {y}
      </output>
    </div>
  );
}

export default PrintMousePosition;
