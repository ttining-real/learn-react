import { useEffect, useState } from 'react';
import S from './PrintMousePosition.module.css';

function PrintMousePosition() {
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
