import fetchPokemon from './fetchPokemon';
import fetchSpeciesAndAbilites from './fetchSpeciesAndAbilites';

const fetchPokemonInfo = async (id: number) => {
  const pokemon = await fetchPokemon(id);
  const { species, abilities } = await fetchSpeciesAndAbilites(
    pokemon.species.url,
    pokemon.abilities
  );
  
  return { pokemon, species, abilities };
};

export default fetchPokemonInfo;
