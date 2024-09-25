import { type Pokemon } from '@/types/Pokemon';
import { type Species } from '@/types/Species';

export type SpeciesUrl = Pokemon['species']['url'];

// 종(species) 정보 가져오기
const fetchSpecies = async (url: SpeciesUrl): Promise<string|undefined> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`오류 발생! ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as Species;

  const nameInfo = data.names.find(
    (nameInfo) => nameInfo.language.name === 'ko'
  );

  return nameInfo?.name;
};

export default fetchSpecies;
