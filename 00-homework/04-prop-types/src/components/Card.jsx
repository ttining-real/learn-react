import Thumbnail from '@/components/Thumbnail';
import { CardType } from '@/@types/Card.d';

function Card({ id, title, genre, total }) {
  const renderTotal = typeof total === 'object' ? JSON.stringify(total) : total;

  return (
    <div className="Card">
      <a
        href="/"
        title={`${title} 페이지로 이동하기`}
        rel="noopener noreferrer"
      >
        <div className="card-info">
          <h2 className="card-title">{title}</h2>
          <p className="card-desc">
            <span className="tag">{genre}</span>
            <span className="total">총 {renderTotal}회</span>
          </p>
        </div>
        <Thumbnail id={id} text={title} />
      </a>
    </div>
  );
}

export default Card;

Card.propTypes = CardType;
