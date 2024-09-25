import { usePokemon } from './usePokemon';
import useSpeciesAndAbilities from './useSpeciesAndAbilities';

const usePokemonInfo = (id: number) => {
  const { isLoading, isError, error, data: pokemon } = usePokemon(id);

  const { species, abililties } = useSpeciesAndAbilities(
    pokemon?.species,
    pokemon?.abilities
  );

  return { isLoading, isError, error, pokemon, species, abililties };
};

export default usePokemonInfo;
