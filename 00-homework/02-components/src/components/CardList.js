import { createElement as h } from 'https://esm.sh/react';

import Card from '../components/Card.js';

function CardList(props) {
  const { children } = props;

  return h(
    'div',
    { className: 'CardList' },
    ...children
  );
}

export default CardList;