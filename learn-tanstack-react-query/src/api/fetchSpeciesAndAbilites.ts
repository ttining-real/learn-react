import fetchAbilites, { type Ability } from './fetchAblities';
import fetchSpecies, { type SpeciesUrl } from './fetchSpecies';

// 종(species) & 능력(abilities) 정보 가져오기
const fetchSpeciesAndAbilites = async (
  species_url: SpeciesUrl,
  abilities: Ability
) => {
  const speciesInfo = await fetchSpecies(species_url);
  const abilitiesInfo = await fetchAbilites(abilities);

  return {
    species: speciesInfo,
    abilities: abilitiesInfo,
  };
};

export default fetchSpeciesAndAbilites;
