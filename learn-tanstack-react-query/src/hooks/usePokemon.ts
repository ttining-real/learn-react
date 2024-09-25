import type { Pokemon } from '@/types/Pokemon';
import { useQuery, queryOptions, type UndefinedInitialDataOptions } from '@tanstack/react-query';

// 환경 변수: 포켓몬 API
const POKEMON_API = import.meta.env.VITE_POKEMON;

/** 포켓몬 데이터 가져오기 함수 */
export const getPokemon = async (id: number): Promise<Pokemon> => {
  const response = await fetch(`${POKEMON_API}/${id}`);

  if (!response.ok) {
    throw new Error(`오류 발생! ${response.status} ${response.statusText}`);
  }

  return response.json();
};

/** 포켓몬 쿼리 옵션 생성 함수 */
export const getPokemonOptions = (
  id: number,
  options?: Partial<UndefinedInitialDataOptions<Pokemon>>
) => {
  return queryOptions<Pokemon>({
    queryKey: ['pokemon', { id }],
    queryFn: () => getPokemon(id),
    ...options,
  });
};

/** 포켓몬 쿼리 훅 */
export const usePokemon = (
  id: number,
  options?: Partial<UndefinedInitialDataOptions<Pokemon>>
) => {
  return useQuery(getPokemonOptions(id, options));
};
