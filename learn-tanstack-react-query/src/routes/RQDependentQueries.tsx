/* eslint-disable @tanstack/query/exhaustive-deps */
// --------------------------------------------------------------------------
// ✅ React Query 종속 요청
// --------------------------------------------------------------------------
// - [ ] 종속 쿼리 (dependent queries)
//   - React Query + 종속 요청
//   - 불러올 데이터 별, useQuery() 사용 권장
//   - 커스텀 훅 함수 안에서 다른 커스텀 훅 사용 가능
// - [ ] 종속 쿼리 해설 및 분리
//   - [ ] useSpecies()
//   - [ ] useAbilities()
//   - [ ] useSpeciesAndAbilities()
// --------------------------------------------------------------------------

import { Helmet } from 'react-helmet-async';
import { useCallback, useState } from 'react';
import { type Pokemon } from '@/types/Pokemon';
import { usePokemon } from '@/hooks/usePokemon';
import { PokemonCard, SectionWithHeading } from '@/components';
import { useFocusingPrevFocusedElement } from '@/hooks/useFocusingPrevFocusedElement';

/* -------------------------------------------------------------------------- */

import { useQuery } from '@tanstack/react-query';
import fetchAbilites, { type Ability } from '@/api/fetchAblities';
import fetchSpecies from '@/api/fetchSpecies';

// useSpecies 커스텀 훅
const useSpecies = (url?: string) => {
  const key = url?.split('/').at(-2);

  return useQuery({
    queryKey: ['species', key],
    queryFn: () => fetchSpecies(url as string),
    enabled: Boolean(url),
    gcTime: 1000 * 5
  })
}

// useAbilities 커스텀 훅
const useAbilities = (abililties?: Pokemon['abilities']) => {
  const key = abililties?.reduce?.((key, { ability }) => key += ability.name + ' ', '').trim();

  return useQuery({
    queryKey: ['abililties', key],
    queryFn: () => fetchAbilites(abililties as Ability),
    enabled: Boolean(abililties),
    gcTime: 1000 * 5
  });
}

// useSpeciesAndAbilities 커스텀 훅
const useSpeciesAndAbilities = (species?: Pokemon['species'], abililties?: Pokemon['abilities']) => {
  const speciesInfo = useSpecies(species?.url);
  const abilitiesInfo = useAbilities(abililties);

  return {
    species: speciesInfo,
    abililties: abilitiesInfo,
  }
}

/* -------------------------------------------------------------------------- */

// 리액트 개발 도구에 표시될 컴포넌트 이름
Component.displayName = 'RQDependentQueries';

// 컴포넌트
export function Component(): JSX.Element {
  // 이전 렌더링 시점의 초점 요소를 다음 렌더링 시 초점 설정
  const { focusLastFocusedElement } = useFocusingPrevFocusedElement();

  // [상태] 포켓몬 ID
  const [id, setId] = useState(1);

  // [상태 업데이트 핸들러]
  const handleRequestPrevData = useCallback(() => {
    setId((i) => i - 1);
    focusLastFocusedElement();
  }, [focusLastFocusedElement]);
  
  const handleRequestNextData = useCallback(() => {
    setId((i) => i + 1);
    focusLastFocusedElement();
  }, [focusLastFocusedElement]);
  
  // [상태] usePokemon 커스텀 훅 활용
  const { isLoading, isError, error, data } = usePokemon(id);

  // [파생된 상태]
  const prevButtonLabel = `포켓몬 ${id - 1}`;
  const nextButtonLabel = `포켓몬 ${id + 1}`;

  // 종속 쿼리 요청 (useSpeciesAndAbilities 커스텀 훅 활용)
  const { species, abililties } = useSpeciesAndAbilities(data?.species, data?.abilities);

  return (
    <>
      <Helmet>
        <title>종속 쿼리 ← React Query 러닝 가이드</title>
      </Helmet>

      <SectionWithHeading title="React Query 종속 쿼리">
        <div className="space-y-1">
          <p className="text-slate-950">
            React Query의 "종속 쿼리" 개념에 대해 학습합니다.
          </p>
        </div>
      </SectionWithHeading>

      <div className="flex gap-3 items-center">
        <PokemonCard
          error={error as Error}
          pokemon={data as Pokemon}
          prevLabel={prevButtonLabel}
          nextLabel={nextButtonLabel}
          onPrev={handleRequestPrevData}
          onNext={handleRequestNextData}
          isPrevDisable={id === 1}
          isLoading={isLoading}
          isError={isError}
        />
        <div className="min-w-64 min-h-20 inline-flex flex-col gap-1 pt-2 pb-3 px-3 border-2 border-yellow-600/55 rounded-md bg-yellow-400/20">
          <b className="text-sm text-yellow-700">
            {species.isLoading ? '...' : species.data}
          </b>
          <ul className="text-xs">
            {abililties.isLoading ? (
              <li>데이터 로딩 중...</li>
            ) : (
              abililties?.data?.map?.((ability) => (
                <li key={ability.name}>
                  <b className="text-yellow-900">{ability.name}</b>{' '}
                  <span className="text-yellow-950">"{ability.text}"</span>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </>
  );
}