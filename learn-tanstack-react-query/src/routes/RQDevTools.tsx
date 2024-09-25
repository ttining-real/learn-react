// --------------------------------------------------------------------------
// ✅ React Query Devtools 설치 및 구성
// --------------------------------------------------------------------------
// - [ ] 프로젝트에 React Query Devtools 패키지 설치 (참고: https://bit.ly/3XloOVM)
// - [ ] 개발 도구를 통해 쿼리 키에 등록된 캐싱 데이터 검토
// --------------------------------------------------------------------------

import { Helmet } from 'react-helmet-async';
import { useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { PokemonCard, SectionWithHeading } from '@/components';
import { useFocusingPrevFocusedElement } from '@/hooks/useFocusingPrevFocusedElement';

// 환경 변수: 포켓몬 API
const POKEMON_API = import.meta.env.VITE_POKEMON;

// 리액트 개발 도구에 표시될 컴포넌트 이름
Component.displayName = 'ReactQueryDevtools';

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
        <title>개발도구 설치 및 구성 ← React Query 러닝 가이드</title>
      </Helmet>

      <SectionWithHeading title="React Query 개발도구 설치 및 구성">
        <div className="space-y-1">
          <p className="text-slate-950">
            React Query 개발도구 설치 및 구성 과정을 학습합니다.
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
