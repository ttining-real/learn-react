import Squares from '../Squares/Squares';
import Status from '../Status/Status';

function Board() {
  return (
    <div className="Board">
      <Status />
      <Squares />
    </div>
  );
}

export default Board;
