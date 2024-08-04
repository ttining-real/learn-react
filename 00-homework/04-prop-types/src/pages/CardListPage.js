import { createElement as h } from 'https://esm.sh/react';

import Card from '../components/Card.js';
import CardList from '../components/CardList.js';
import ListData from '../data/list.js';

function CardListPage() {
  return h(
    CardList,
    {},
    ListData.items.map(({ id, title, genre, total }) =>
      h(Card, { key: id, id, title, genre, total })
    )
  );
}

export default CardListPage;