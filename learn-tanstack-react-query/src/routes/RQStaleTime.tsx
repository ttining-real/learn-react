// --------------------------------------------------------------------------
// ✅ React Query 캐시 타임 설정
// --------------------------------------------------------------------------
// - [ ] staleTime 설정 해설 (stale: 캐시된 지 오래됨 !== 신선(fresh): 기본 값 = 0)
//   - [ ] 요청/응답 (cache-control 헤더 값 확인, Thunder Client 활용)
//   - [ ] staleTime 설정은 해당 데이터의 업데이트 기준에 따라 상대적 (ms, Infinity)
//   - [ ] 설정된 staleTime이 지나면, 요청 시 서버에서 응답 받아 다시 캐시
//   - [ ] 새로운 데이터를 응답받기까지 stale 데이터를 표시, 응답 이후 업데이트
//   - [ ] Stale data > No data 전략
//
// - React Query 스테일 전략 정리 요약
//   1. 새롭지 않고 오래된 데이터 일지라도 캐시 데이터를 항상 제공
//   2. 기본적으로 모든 쿼리는 응답 즉시 오래된 것으로 간주 (기본 값이 0이기 때문)
//   3. 쿼리가 오래된 경우, 요청 트리거가 발생하면 데이터를 응답받아 캐시 업데이트
//   4. 필요한 경우 각 쿼리마다 스테일 타임 설정으로 리-패치 주기(interval) 구성
// --------------------------------------------------------------------------

import { Helmet } from 'react-helmet-async';
import { useCallback, useState } from 'react';
import { useFocusingPrevFocusedElement } from '@/hooks/useFocusingPrevFocusedElement';
import { PokemonCard, SectionWithHeading } from '@/components';
import { usePokemon } from '@/hooks/usePokemon';
import { type Pokemon } from '@/types/Pokemon';

// 환경 변수: 포켓몬 API
const POKEMON_API = import.meta.env.VITE_POKEMON;

// 리액트 개발 도구에 표시될 컴포넌트 이름
Component.displayName = 'ReactQueryStaleTime';

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
  const { isLoading, isError, data, error } = usePokemon(id);

  // [파생된 상태]
  const prevPokemonId = id - 1;
  const prevButtonLabel = prevPokemonId > 0 ? `포켓몬 ID "${prevPokemonId}"`: '포켓몬 없음';

  const nextPokemonId = id + 1;
  const nextButtonLabel = `포켓몬 ID "${nextPokemonId}"`;

  return (
    <>
      <Helmet>
        <title>스테일 타임 설정 ← React Query 러닝 가이드</title>
      </Helmet>

      <SectionWithHeading title="React Query 스테일 타임 설정">
        <div className="space-y-1">
          <p className="text-slate-950">
          React Query의 스테일 타임 설정에 대해 알아봅시다.
          </p>
          <pre className="text-red-700">
            <code className="text-xs">
              {POKEMON_API}/<b>{id}</b>
            </code>
          </pre>
        </div>
      </SectionWithHeading>

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
    </>
  );
}
