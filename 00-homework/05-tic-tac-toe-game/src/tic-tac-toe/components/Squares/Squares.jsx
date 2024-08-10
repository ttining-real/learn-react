import S from './Squares.module.css';
import Square from '@/tic-tac-toe/components/Square/Square';

function Squares() {
  return (
    <div className={S.component}>
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
    </div>
  );
}

export default Squares;
