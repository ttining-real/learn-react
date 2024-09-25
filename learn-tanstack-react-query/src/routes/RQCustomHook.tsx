// --------------------------------------------------------------------------
// ✅ 커스텀 훅 활용 (useQuery() 래퍼 함수)
// --------------------------------------------------------------------------
// - [ ] useQuery() 훅 로직 분리 → usePokemon() 훅 함수 작성
// - [ ] usePokemon() 훅에서 사용되는 queryFn 함수 로직 분리 작성
// - [ ] usePokemon() 훅 재사용 가능하도록 현재 컴포넌트 외부에서 관리
// --------------------------------------------------------------------------

import { Helmet } from 'react-helmet-async';
import { useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { PokemonCard, SectionWithHeading } from '@/components';
import { useFocusingPrevFocusedElement } from '@/hooks/useFocusingPrevFocusedElement';

// 환경 변수: 포켓몬 API
const POKEMON_API = import.meta.env.VITE_POKEMON;

// 리액트 개발 도구에 표시될 컴포넌트 이름
Component.displayName = 'ReactQueryCustomHook';

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

  // [상태] useQuery 훅 활용
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['pokemon', { id }],
    queryFn: async () => {
      const response = await fetch(`${POKEMON_API}/${id}`);
    
      if (!response.ok) {
        throw new Error(`오류 발생! ${response.status} ${response.statusText}`);
      }
    
      return response.json();
    },
  });

  // [파생된 상태]
  const prevPokemonId = id - 1;
  const prevButtonLabel = prevPokemonId > 0 ? `포켓몬 ID "${prevPokemonId}"`: '포켓몬 없음';

  const nextPokemonId = id + 1;
  const nextButtonLabel = `포켓몬 ID "${nextPokemonId}"`;

  return (
    <>
      <Helmet>
        <title>커스텀 훅 활용 ← React Query 러닝 가이드</title>
      </Helmet>

      <SectionWithHeading title="커스텀 훅 작성 및 활용">
        <div className="space-y-1">
          <p className="text-slate-950">
            usePokemon() 커스텀 훅 작성 및 활용하는 방법을 학습합니다.
          </p>
          <pre className="text-red-700">
            <code className="text-xs">
              https://pokeapi.co/api/v2/pokemon/<b>{id}</b>
            </code>
          </pre>
        </div>
      </SectionWithHeading>

      <PokemonCard 
        error={error as Error}
        pokemon={data}
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
