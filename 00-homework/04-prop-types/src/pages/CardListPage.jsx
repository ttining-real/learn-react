import ListData from '@/data/list';
import Card from '@/components/Card.jsx';
import CardList from '@/components/CardList.jsx';

function CardListPage() {
  return (
    <CardList>
      {ListData.items.map(({ id, title, genre, total }) => {
        return (
          <li key={id}>
            <Card id={id} title={title} genre={genre} total={total} />
          </li>
        );
      })}
    </CardList>
  );
}

export default CardListPage;
