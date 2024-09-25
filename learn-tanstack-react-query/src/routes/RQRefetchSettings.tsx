// --------------------------------------------------------------------------
// ✅ React Query 리-패치 설정
// --------------------------------------------------------------------------
// - [ ] React Query의 오래된 상태 감지 및 매뉴얼 리-패치 설정
//   - RefetchWhenDetectStaletime 컴포넌트의 isStale, refetch 속성
//   - React Query 개발도구에서 오래된(stale) 상태 감지 시, 리-패치 메뉴 표시
// - [ ] React Query가 서버에 데이터를 다시 요청하는 경우
//   - 쿼리 키(queryKey) 변경 감지
//   - useQuery() 훅의 옵저버(observer)가 마운트 될 때
//   - 윈도우(창)에 초점 이동이 된 경우
//   - 오프라인 → 온라인 상태 변경 시
// - [ ] React Query 리-패치 설정
//   - [ ] refetchOnMount
//   - [ ] refetchOnReconnect
//   - [ ] refetchOnWindowFocus
// - [ ] usePokemon() 훅 옵션 설정
//   - [ ] Partial<UndefinedInitialDataOptions<Pokemon>> 해설
// --------------------------------------------------------------------------

import { Helmet } from 'react-helmet-async';
import { useCallback, useState } from 'react';
import { PokemonCard, RefetchWhenDetectStaletime, SectionWithHeading } from '@/components';
import { useFocusingPrevFocusedElement } from '@/hooks/useFocusingPrevFocusedElement';
import { usePokemon } from '@/hooks/usePokemon';
import { type Pokemon } from '@/types/Pokemon';

// 환경 변수: 포켓몬 API
const POKEMON_API = import.meta.env.VITE_POKEMON;

// 리액트 개발 도구에 표시될 컴포넌트 이름
Component.displayName = 'ReactQueryRefetchSettings';

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
        <title>리-패치 설정 ← React Query 러닝 가이드</title>
      </Helmet>

      <SectionWithHeading title="React Query 리-패치 설정">
        <div className="space-y-1">
          <p className="text-slate-950">
            React Query의 리-패치에 대해 알아보고 설정 방법을 학습합니다.
          </p>
          <pre className="text-red-700">
            <code className="text-xs">
              {POKEMON_API}/<b>{id}</b>
            </code>
          </pre>
        </div>
      </SectionWithHeading>

      <div className="inline-flex flex-col items-start gap-0.5">
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
        <RefetchWhenDetectStaletime />
      </div>
    </>
  );
}