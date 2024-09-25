/* eslint-disable @tanstack/query/exhaustive-deps */
import {
  queryOptions,
  useQuery,
  type UndefinedInitialDataOptions,
} from '@tanstack/react-query';
import fetchAbilites, { type Ability } from '@/api/fetchAblities';
import type { Pokemon } from '@/types/Pokemon';

type AbilityData = { name?: string; text?: string };

export const getAbilitiesQueryOptions = (
  abililties?: Pokemon['abilities'],
  options?: Partial<UndefinedInitialDataOptions<AbilityData[]>>
) => {
  const key = abililties
    ?.reduce?.((key, { ability }) => (key += ability.name + ' '), '')
    .trim();

  return queryOptions({
    queryKey: ['abililties', key],
    queryFn: () => fetchAbilites(abililties as Ability),
    enabled: Boolean(abililties),
    ...options,
  });
};

const useAbilities = (abililties?: Pokemon['abilities']) => {
  return useQuery(getAbilitiesQueryOptions(abililties));
};

export default useAbilities;
