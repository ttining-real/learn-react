// --------------------------------------------------------------------------
// ✅ React Query 라이브러리 소개
// --------------------------------------------------------------------------
// - [ ] 리액트의 방식으로 서버 데이터 관리는 매우 어려움
// - [ ] 클라이언트 vs. 서버 데이터 비교
// - [ ] @tanstack/react 라이브러리
//   - Promise 기반, 비동기 상태 관리
// --------------------------------------------------------------------------

import { Helmet } from 'react-helmet-async';
import { useState, useCallback } from 'react';
import { useFocusingPrevFocusedElement } from '@/hooks/useFocusingPrevFocusedElement';
import { PokemonCard, SectionWithHeading } from '@/components';
import { Pokemon } from '@/types/Pokemon';
import useQuery from '@/hooks/useQuery';
import { range } from '@/utils';

// 환경 변수: 포켓몬 API
const POKEMON_API = import.meta.env.VITE_POKEMON;

// 리스트 렌더링 갯수
const MAX_POKEMON_COUNT = 4;

// 리액트 개발 도구에 표시될 컴포넌트 이름
Component.displayName = 'WhyReactQuery';

// 컴포넌트
export function Component(): JSX.Element {
  
  // 이전 렌더링 시점의 초점 요소를 다음 렌더링 시 초점 설정
  const { focusLastFocusedElement } = useFocusingPrevFocusedElement();
  
  // [상태] 포켓몬 ID
  const [id, setId] = useState(25);

  // [상태 업데이트 핸들러]
  const handleRequestPrevData = useCallback(() => {
    setId((i) => i - 1);
    focusLastFocusedElement();
  }, [focusLastFocusedElement]);
  
  const handleRequestNextData = useCallback(() => {
    setId((i) => i + 1);
    focusLastFocusedElement();
  }, [focusLastFocusedElement]);

  // [상태] useQuery 커스텀 훅 활용 (응답 데이터 타입, 제네릭 설정)
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
        <title>React Query가 필요한 이유 ← React Query 러닝 가이드</title>
      </Helmet>

      <SectionWithHeading title="React Query가 필요한 이유">
        <div className="space-y-1">
          <p className="text-slate-950">
            앞서 살펴본 것처럼 React <abbr title="Application Programming Interface">API</abbr>만으로
            서버 상태를 관리하는 것은 어렵습니다.
          </p>
          
          <ul>
            <li>비동기 상태를 동기 상태인 것처럼 취급하는 것이 목적입니다.</li>
            <li>useEffect() 훅이 포함되면 컴포넌트 코드가 복잡해져 이해하기 어렵습니다.</li>
            <li>상태 관리를 위해 useState(), useEffect(), Context를 사용하는 것은 고통입니다.</li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <section className="flex flex-col gap-1">
            <h3 className="text-xl text-red-700 font-semibold">클라이언트 데이터</h3>
            <ul>
              <li>클라이언트 소유 : 항상 최신 상태입니다.</li>
              <li>데이터 변경 : 앱에서 직접 데이터를 변경할 수 있습니다.</li>
              <li>임시 데이터 : 브라우저를 닫으면 사라집니다.</li>
              <li>싱크 : 즉시 이용 가능합니다.</li>
            </ul>
          </section>
          
          <section className="flex flex-col gap-1">
            <h3 className="text-xl text-red-700 font-semibold">서버 데이터</h3>
            <ul>
              <li>서버 소유 : 서버의 스냅샷 데이터입니다. (오래되었을 수 있음)</li>
              <li>데이터 변경 : 여러 앱에서 데이터를 변경 요청할 수 있습니다.</li>
              <li>지속 데이터: 서버에 데이터가 보관되므로 지속적입니다.</li>
              <li>비동기 : 서버에서 클라이언트로 데이터를 이동하는 데 시간이 걸립니다.</li>
            </ul>
          </section>
          
          <section className="flex flex-col gap-1">
            <h3 className="text-xl text-red-700 font-semibold">React Query 라이브러리</h3>
            <p>Promise 기반, 비동기(async) 상태 관리 라이브러리</p>
          </section>
        </div>
        
        <pre className="text-red-700">
          <code className="text-xs">
            ${POKEMON_API}/<b>{id}</b>
          </code>
        </pre>
        
      </SectionWithHeading>

      <div className='flex flex-wrap gap-2'>
        {/* 리스트 렌더링 */}
        {
          range(0, MAX_POKEMON_COUNT).map((_, index) => (
            <PokemonCard 
              key={index}
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
          ))
        }
      </div>
    </>
  );
}