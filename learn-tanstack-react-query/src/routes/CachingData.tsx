// --------------------------------------------------------------------------
// ✅ 서버 데이터 캐싱 (메모리)
// --------------------------------------------------------------------------
// - [ ] useQuery() 훅 코드 해설
// - [ ] QueryProvider 컴포넌트 코드 해설
// - [ ] SectionWithHeading 컴포넌트 코드 해설
// - [ ] PokemonCard 컴포넌트 코드 해설
// --------------------------------------------------------------------------

import { Helmet } from 'react-helmet-async';
import { useState, useCallback } from 'react';
import { PokemonCard, SectionWithHeading } from '@/components';
import { Pokemon } from '@/types/Pokemon';
import useQuery from '@/hooks/useQuery';

// 환경 변수: 포켓몬 API
const POKEMON_API = import.meta.env.VITE_POKEMON;

// 리액트 개발 도구에 표시될 컴포넌트 이름
Component.displayName = 'CachingData';

// 컴포넌트
export function Component(): JSX.Element {

  // [상태] 포켓몬 ID
  const [id, setId] = useState(25);

  // [상태 업데이트 핸들러]
  const handleRequestPrevData = useCallback(() => setId((i) => i - 1), []);
  const handleRequestNextData = useCallback(() => setId((i) => i + 1), []);

  // [상태] useQuery 커스텀 훅 활용 (응답 데이터 타입, 제네릭 설정)
  // const pokemonQuery = useQuery<Pokemon>(
  const { isLoading, data, isError, error } = useQuery<Pokemon>(
    `${POKEMON_API}/${id}`,
    { enabled: id > 0, log: true }
  );

  // [파생된 상태]
  const prevPokemonId = id - 1;
  const prevButtonLabel = prevPokemonId > 0 ? `포켓몬 ID "${prevPokemonId}"`: '포켓몬 없음';

  const nextPokemonId = id + 1;
  const nextButtonLabel = `포켓몬 ID "${nextPokemonId}"`;

  return (
    <>
      <Helmet>
        <title>React의 데이터 요청/응답 ← React Query 러닝 가이드</title>
      </Helmet>

      <SectionWithHeading title="데이터 캐싱 (메모리)">
        <div className="space-y-1">
          <p className="text-slate-950">
            응답 받은 서버 데이터를 캐싱하여 사용자 경험을 향상시킬 수 있습니다.
          </p>
          <pre className="text-red-700">
            <code className="text-xs">
              ${POKEMON_API}/<b>{id}</b>
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