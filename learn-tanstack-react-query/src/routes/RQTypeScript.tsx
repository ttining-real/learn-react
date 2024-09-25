// --------------------------------------------------------------------------
// ✅ React Query + TypeScript 활용
// --------------------------------------------------------------------------
// - [ ] usePokemon() 훅 함수가 반환한 data의 타입이 any 임을 확인
// - [ ] usePokemon() 훅 함수가 반환하는 타입이 정확히 무엇인지 알 수 있도록 설정
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
Component.displayName = 'ReactQueryTypeScript';

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
        <title>TypeScript 활용 ← React Query 러닝 가이드</title>
      </Helmet>

      <SectionWithHeading title="React Query + TypeScript 활용">
        <div className="space-y-1">
          <p className="text-slate-950">
            usePokemon() 커스텀 훅이 반환한 타입이 정확하도록 구성합니다.
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
