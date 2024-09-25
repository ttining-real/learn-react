import { memo } from 'react';
import PokemonCardWithContext from './PokemonCardWithContext';
import { range } from '@/utils';

type Props = { max?: number };

function PokemonList({ max = 4 }: Props): JSX.Element {
  return (
    <div className="flex flex-wrap gap-2">
      {range(0, max).map((index) => (
        <PokemonCardWithContext key={index} />
      ))}
    </div>
  );
}

export default memo(PokemonList);
