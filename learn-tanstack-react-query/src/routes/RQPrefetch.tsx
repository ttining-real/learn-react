// --------------------------------------------------------------------------
// ✅ React Query 프리패치 (Prefetch)
// --------------------------------------------------------------------------
// - [ ] 프리패치 (prefetch)
//   - handlePrefetchPrev 코드 해설
//   - handlePrefetchNext 코드 해설
// --------------------------------------------------------------------------

import { Helmet } from 'react-helmet-async';
import { useCallback, useState } from 'react';
import { type Pokemon } from '@/types/Pokemon';
import { PokemonCard, SectionWithHeading } from '@/components';

/* -------------------------------------------------------------------------- */

import { type FetchQueryOptions, type QueryKey, useQueryClient } from '@tanstack/react-query';
import { useFocusingPrevFocusedElement } from '@/hooks/useFocusingPrevFocusedElement';
import { getAbilitiesQueryOptions } from '@/hooks/useAbilities';
import { getSpeciesQueryOptions } from '@/hooks/useSpecies';
import { getPokemonOptions } from '@/hooks/usePokemon';
import usePokemonInfo from '@/hooks/usePokemonInfo';

/* -------------------------------------------------------------------------- */

// 종(species) 옵션 타입
type SpeciesOptions = FetchQueryOptions<string | undefined, Error, string, QueryKey, never>;

// 프리패치 후, 5초 동안 사용자 액션이 없을 경우 메모리 정리
const PREFETCH_OPTIONS = {
  staleTime: 1000 * 4,
  gcTime: 1000 * 5,
};

/* -------------------------------------------------------------------------- */

// 리액트 개발 도구에 표시될 컴포넌트 이름
Component.displayName = 'RQPrefetch';

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
  
  // [상태] 포켓몬 정보
  const { isLoading, isError, error, pokemon, species, abililties } = usePokemonInfo(id);

  // [파생된 상태] 이전/다음 포켓몬 ID & 레이블
  const prevId = id - 1;
  const prevButtonLabel = `포켓몬 ${prevId}`;

  const nextId = id + 1;
  const nextButtonLabel = `포켓몬 ${nextId}`;

  /* Prefetch ----------------------------------------------------------------- */

  // 쿼리 클라이언트 (캐시 관리 객체) 가져오기
  const queryClient = useQueryClient();

  // [이벤트 핸들러] 이전 포켓몬 데이터 프리패치
  const handlePrefetchPrev = useCallback(async () => {
    const queryOptions = getPokemonOptions(prevId, PREFETCH_OPTIONS);
    
    await queryClient.prefetchQuery({
      ...queryOptions,
      queryKey: queryOptions.queryKey,
    });

    const prevPokemon = queryClient.getQueryData(queryOptions.queryKey);

    const speciesOptions = getSpeciesQueryOptions(prevPokemon?.species.url, PREFETCH_OPTIONS) as SpeciesOptions;

    queryClient.prefetchQuery(speciesOptions);

    const abilitiesOptions = getAbilitiesQueryOptions(prevPokemon?.abilities, PREFETCH_OPTIONS);
    queryClient.prefetchQuery(abilitiesOptions);

  }, [prevId, queryClient]);

  // [이벤트 핸들러] 다음 포켓몬 데이터 프리패치
  const handlePrefetchNext = useCallback(async () => {
    const queryOptions = getPokemonOptions(nextId, PREFETCH_OPTIONS);
    
    await queryClient.prefetchQuery(queryOptions);
    
    const nextPokemon = queryClient.getQueryData(queryOptions.queryKey);

    const speciesOptions = getSpeciesQueryOptions(nextPokemon?.species.url, PREFETCH_OPTIONS) as SpeciesOptions;
    queryClient.prefetchQuery(speciesOptions);

    const abilitiesOptions = getAbilitiesQueryOptions(nextPokemon?.abilities, PREFETCH_OPTIONS);
    queryClient.prefetchQuery(abilitiesOptions);
    
  }, [nextId, queryClient]);

  /* -------------------------------------------------------------------------- */

  return (
    <>
      <Helmet>
        <title>프리패치 ← React Query 러닝 가이드</title>
      </Helmet>

      <SectionWithHeading title="React Query 프리패치 (Prefetch)">
        <div className="space-y-1">
          <p className="text-slate-950">
            React Query의 "프리 패치" 개념에 대해 학습합니다.
          </p>
        </div>
      </SectionWithHeading>

      <div className="flex gap-3 items-center">
        <PokemonCard
          error={error as Error}
          pokemon={pokemon as Pokemon}
          prevLabel={prevButtonLabel}
          nextLabel={nextButtonLabel}
          onPrev={handleRequestPrevData}
          onNext={handleRequestNextData}
          isPrevDisable={id === 1}
          isLoading={isLoading}
          isError={isError}
          prevButtonProps={{
            onPointerEnter: handlePrefetchPrev
          }}
          nextButtonProps={{
            onPointerEnter: handlePrefetchNext
          }}
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