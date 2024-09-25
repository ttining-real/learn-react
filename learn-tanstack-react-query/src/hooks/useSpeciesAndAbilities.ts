import type { Pokemon } from '@/types/Pokemon';
import useAbilities from './useAbilities';
import useSpecies from './useSpecies';

const useSpeciesAndAbilities = (
  species?: Pokemon['species'],
  abililties?: Pokemon['abilities']
) => {
  const speciesInfo = useSpecies(species?.url);
  const abilitiesInfo = useAbilities(abililties);

  return {
    species: speciesInfo,
    abililties: abilitiesInfo,
  };
};

export default useSpeciesAndAbilities;
