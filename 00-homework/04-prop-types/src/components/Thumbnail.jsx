import { ThumbnailType } from '@/@types/Thumbnail.d';

function Thumbnail({ id, text, width = 260, height = 410 }) {
  return (
    <figure className="card-thumbnail" aria-label="썸네일 이미지">
      <img src={`onepiece/thumbnail-${id}.jpg`} width={width} height={height} />
      <figcaption className="sr-only">{text}</figcaption>
    </figure>
  );
}

Thumbnail.propTypes = ThumbnailType;

export default Thumbnail;
