import { createElement as h } from 'https://esm.sh/react';
import Thumbnail from './Thumbnail.js';

/* 
  <div class="card">
    <figure class='card-thumbnail'>
      <img src="onepiece/thumbnail-01.jpg" alt="" width='260' height='410' />
      <figcaption class='a11yHidden'>원피스 에그헤드 편 썸네일</figcaption>
    </figure>
    <div class="card-info">
      <h2 class='card-title'>제목 - 에피소드</h2>
      <p class="card-desc">
        <span class="tag">액션/모험</span>
        <span class="total">총 NN회</span>
      </p>
    </div>
  </div>
*/

/* 
  props: { 
    title,
    genre,
    total
  }
*/
function Card(props) {

  const { id, title, genre, total } = props;

  return h(
    'div',
    { className: 'Card' },
    h(
      'a',
      {
        href: '/',
        title: `${title} 페이지로 이동하기`,
        rel: "noopener noreferrer"
      },
      h(
        'div',
        { className: 'card-info' },
        h(
          'h2',
          { className: 'card-title' },
          `${title}`
        ),
        h(
          'p',
          { className: 'card-desc' },
          h(
            'span',
            { className: 'tag' },
            `${genre}`
          ),
          h(
            'span',
            { className: 'total' },
            `총 ${total}회`
          )
        )
      ),
      h(
        Thumbnail,
        {id, text: title}
      ),
    )
  );
}

export default Card;
