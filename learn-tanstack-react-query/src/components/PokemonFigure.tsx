import { usePokemonValues } from '@/contexts/Pokemon';
import { getPublic } from '@/utils';

type Props = { size?: number };

function PokemonFigure({ size = 96 }: Props): JSX.Element {
  
  // 포켓몬 읽기 컨텍스트 값 반환
  const { pokemon } = usePokemonValues();

  return (
    <figure className="loading-message">
      <img
        src={getPublic(pokemon.sprites.front_default)}
        alt=""
        width={size}
        height={size}
        loading="lazy"
        draggable={false}
      />
      <figcaption>{pokemon.name}</figcaption>
    </figure>
  );
}

export default PokemonFigure;
