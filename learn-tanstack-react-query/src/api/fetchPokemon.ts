import { Pokemon } from '@/types/Pokemon';

const fetchPokemon = async (id: number): Promise<Pokemon> => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

  if (!response.ok) {
    throw new Error(`오류 발생! ${response.status} ${response.statusText}`);
  }

  return response.json();
};

export default fetchPokemon;
