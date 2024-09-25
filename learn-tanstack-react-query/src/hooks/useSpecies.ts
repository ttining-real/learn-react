/* eslint-disable @tanstack/query/exhaustive-deps */
import fetchSpecies from '@/api/fetchSpecies';
import {
  queryOptions,
  useQuery,
  type UndefinedInitialDataOptions,
} from '@tanstack/react-query';

type SpeciesData = string | undefined;

export const getSpeciesQueryOptions = (
  url?: string,
  options?: Partial<UndefinedInitialDataOptions<SpeciesData>>
) => {
  const key = url?.split('/').at(-2);

  return queryOptions({
    queryKey: ['species', key],
    queryFn: () => fetchSpecies(url as string),
    enabled: Boolean(url),
    ...options,
  });
};

const useSpecies = (url?: string) => {
  return useQuery(getSpeciesQueryOptions(url));
};

export default useSpecies;
