import { useEffect, useState } from 'react';
import S from './PrintMousePosition.module.css';
import useDocumentTitle from '@/hooks/useDocumentTitle';

function PrintMousePosition() {
  const documentTitle = '마우스 위치 추적 ← 이펙트 동기화 & 정리';
  useDocumentTitle(documentTitle);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { x, y } = mousePosition;

  useEffect(() => {
    const handleMove = ({ pageX: x, pageY: y }) => {
      setMousePosition({ x, y });
    };

    document.addEventListener('mousemove', handleMove);

    return () => {
      document.removeEventListener('mousemove', handleMove);
    };
  }, []);

  return (
    <div className={S.component}>
      <output>
        {x} <span>/</span> {y}
      </output>
    </div>
  );
}

export default PrintMousePosition;
