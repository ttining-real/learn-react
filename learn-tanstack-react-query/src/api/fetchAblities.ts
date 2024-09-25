import { type Pokemon } from '@/types/Pokemon';
import { type Abilities } from '@/types/Abilities';

export type Ability = Pokemon['abilities'];

// 능력(abilities) 정보 가져오기
const fetchAbilites = async (abilities: Ability) => {
  return await Promise.all(
    abilities.map((item) =>
      fetch(item.ability.url).then(async (response) => {
        if (!response.ok) {
          throw new Error(
            `오류 발생! ${response.status} ${response.statusText}`
          );
        }

        const data = (await response.json()) as Abilities;

        const nameInfo = data.names.find(
          (nameInfo) => nameInfo.language.name === 'ko'
        );

        const flavorTextInfo = data.flavor_text_entries.find(
          (flavorTextInfo) => flavorTextInfo.language.name === 'ko'
        );

        return { name: nameInfo?.name, text: flavorTextInfo?.flavor_text };
      })
    )
  );
};

export default fetchAbilites;
