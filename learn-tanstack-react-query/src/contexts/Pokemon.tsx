/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from 'react';
import type {
  Pokemon,
  PokemonSetContextValues,
  PokemonGetContextValues,
} from '@/types/Pokemon';
import pokemonData from '@/datas/pokemon.json';

// 포켓몬 쓰기 컨텍스트
const PokemonSetContext = createContext<null | PokemonSetContextValues>(null);

// 포켓몬 읽기 컨텍스트
const PokemonGetContext = createContext<null | PokemonGetContextValues>(null);

// 포켓몬 프로바이더 컴포넌트
export function PokemonProvider(props: {
  children: React.ReactNode;
}): JSX.Element {
  // [상태] 포켓몬 ID
  const [id, setId] = useState(1);

  // [상태] 포켓몬 데이터 (리스트)
  const [pokemons] = useState<Pokemon[]>(pokemonData as Pokemon[]);
  
  // [파생된 상태] 화면에 표시할 포켓몬 아이템
  const pokemon = pokemons.find((p) => p.id === id) as Pokemon;

  // [파생된 상태] 이전 포켓몬 ID, 레이블
  const prevPokemonId = id - 1;
  const prevButtonLabel = prevPokemonId > 0 ? `포켓몬 ID "${prevPokemonId}"` : '포켓몬 없음';

  // [파생된 상태] 다음 포켓몬 ID, 레이블
  const nextPokemonId = id + 1;
  const nextButtonLabel = `포켓몬 ID "${nextPokemonId}"`;

  // [파생된 상태] isFirst, isLast, total
  const isFirst = pokemons.at(0)?.id === id;
  const isLast = pokemons.at(-1)?.id === id;
  const total = pokemons.length;

  // [메모] 포켓몬 쓰기 컨텍스트 값
  const pokemonSetContextValues = useMemo(
    () => ({
      onPrev: () => setId((i) => i - 1),
      onNext: () => setId((i) => i + 1),
    }),
    []
  );

  // [메모] 포켓몬 읽기 컨텍스트 값
  const pokemonGetContextValues = useMemo(
    () => ({
      pokemon,
      id,
      prevLabel: prevButtonLabel,
      nextLabel: nextButtonLabel,
      isFirst,
      isLast,
      total,
    }),
    [id, isFirst, isLast, nextButtonLabel, pokemon, prevButtonLabel, total]
  );

  return (
    <PokemonSetContext.Provider value={pokemonSetContextValues}>
      <PokemonGetContext.Provider value={pokemonGetContextValues} {...props} />
    </PokemonSetContext.Provider>
  );
}

/** 포켓몬 읽기/쓰기 컨텍스트 값 모두 반환하는 훅 */
export const usePokemon = () => {
  const methods = usePokemonMethods();
  const values = usePokemonValues();
  const contextValues = { ...values, ...methods } as PokemonGetContextValues &
    PokemonSetContextValues;
  return contextValues;
};

/** 포켓몬 읽기 컨텍스트 값을 반환하는 훅 */
export const usePokemonValues = () => {
  const cotextGetValues = useContext(PokemonGetContext);

  if (!cotextGetValues)
    throw new Error(
      'usePokemonValues() 훅은 PokemonProvider 내부에서만 사용 가능합니다.'
    );

  return cotextGetValues;
};

/** 포켓몬 쓰기 컨텍스트 값을 반환하는 훅 */
export const usePokemonMethods = () => {
  const contextSetValues = useContext(PokemonSetContext);

  if (!contextSetValues)
    throw new Error(
      'usePokemonMethods() 훅은 PokemonProvider 내부에서만 사용 가능합니다.'
    );

  return contextSetValues;
};
