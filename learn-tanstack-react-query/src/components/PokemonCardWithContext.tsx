import { memo } from "react";
import PokemonButtonGroup from "./PokemonButtonGroup";
import PokemonFigure from "./PokemonFigure";

type Props = React.PropsWithChildren<{
  label?: string;
}>

function PokemonCardWithContext({
  label = '포켓몬 카드',
  ...restProps
}: Props): JSX.Element {
  return (
    <article aria-label={label} className="pokemon-card" {...restProps}>
      <PokemonButtonGroup />
      <PokemonFigure />
    </article>
  );
}

export default memo(PokemonCardWithContext);
