// --------------------------------------------------------------------------
// ✅ React Query 가비지 콜렉션 타임 설정
// --------------------------------------------------------------------------
// - [ ] gcTime 설정
//   - [ ] React Query의 캐시 데이터는 유한합니다.
//   - [ ] 오래된 데이터는 좋지 않은 영향을 끼칩니다.
//   - [ ] 그러므로 캐시 클린업(정리)가 필요합니다.
//   - [ ] React Query 가비지 콜렉션 내장
//     - 프로그램에 할당된 메모리가 더 이상 사용되지 않으면 자동 해제되는 메모리 관리 방법
//     - gcTime은 자동 메모리 관리를 시간(ms)으로 설정 (기본 값: 5분)
//     - 캐싱한 데이터가 설정된 gcTime이 지나면 사라지는 것은 아님
//     - 쿼리 활성화(active)된 경우, gcTime 설정은 작동하지 않음
//     - 쿼리 비활성화(inactive)된 경우, gcTime 설정이 작동
//       - 비활성 상태가 되는 이유: "컴포넌트 DOM에서 제거 → 쿼리 옵저버 제거"
//
// --------------------------------------------------------------------------

import { Helmet } from 'react-helmet-async';
import { useCallback, useState } from 'react';
import { PokemonCard, SectionWithHeading } from '@/components';
import { usePokemon } from '@/hooks/usePokemon';
import { type Pokemon } from '@/types/Pokemon';
import { useFocusingPrevFocusedElement } from '@/hooks/useFocusingPrevFocusedElement';

// 환경 변수: 포켓몬 API
const POKEMON_API = import.meta.env.VITE_POKEMON;

// 리액트 개발 도구에 표시될 컴포넌트 이름
Component.displayName = 'ReactQueryGarbageCollectionTime';

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
  const { isLoading, isError, data, error } = usePokemon(id, {
    enabled: id > 0,
    staleTime: 1000 * 3,
  });

  // [파생된 상태]
  const prevPokemonId = id - 1;
  const prevButtonLabel = prevPokemonId > 0 ? `포켓몬 ID "${prevPokemonId}"`: '포켓몬 없음';

  const nextPokemonId = id + 1;
  const nextButtonLabel = `포켓몬 ID "${nextPokemonId}"`;

  return (
    <>
      <Helmet>
        <title>가비지 콜렉션 타임 설정 ← React Query 러닝 가이드</title>
      </Helmet>

      <SectionWithHeading title="React Query 가비지 콜렉션 타임 설정">
        <div className="space-y-1">
          <p className="text-slate-950">
            React Query의 가비지 콜렉션 타임 설정에 대해 이야기 합니다.
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
