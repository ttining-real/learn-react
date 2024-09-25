// --------------------------------------------------------------------------
// ✅ React Query 활성 설정
// --------------------------------------------------------------------------
// - [ ] enabled 설정
//   - [ ] 리액트 훅 함수 작성 규칙
//   - [ ] 조건부 상태 선언
//
// - [ ] 쿼리 상태 해설
//   - 캐시에 데이터가 없습니다.
//     - status === 'pending'
//     - data === undefined
//   - 쿼리 함수가 현재 실행되고 있지 않습니다.
//     - fetchStatus === 'idle'
//   - 캐시에 데이터가 없고, 쿼리 함수가 현재 실행 중입니다.
//     - status === 'pending' && fetchStatus === 'fetching'
//     - isLoading
//   - 캐시에 넣을 데이터를 가져오는 중 오류가 발생했습니다.
//     - status === 'error'
//     - isError
//   - 캐시에 데이터가 있습니다.
//     - status === 'success'
//     - isSuccess
//
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
Component.displayName = 'ReactQueryEnabledSetting';

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
        <title>활성 설정 ← React Query 러닝 가이드</title>
      </Helmet>

      <SectionWithHeading title="React Query 활성 설정">
        <div className="space-y-1">
          <p className="text-slate-950">
            React Query의 활성 설정 방법에 대해 알아봅니다.
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
