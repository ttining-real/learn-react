// --------------------------------------------------------------------------
// ✅ React Query 리-패치 인터벌 설정
// --------------------------------------------------------------------------
// - [ ] refetchInterval 설정
//   - 폴링(polling, https://bit.ly/4eePcrn): 동기화 목적으로 주기적 검사 및 처리
//   - 설정된 주기(interval) 시간마다 폴링
//   - 서버의 데이터가 자주 변경되는 경우 유용
//   - 항상 서버의 데이터와 동기화 되길 원할 경우 유용
//   - 설정된 주기 시간이 지나기 전에 쿼리가 트리거 되면 설정 시간 초기화
//   - 필요할 경우, 콜백 함수를 설정해 특정 조건에서 폴링을 멈출 수 있음 (return false)
// - [ ] dataUpdatedAt 설정 (폴링되어 업데이트 된 시간 정보)
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
Component.displayName = 'RQRefetchIntervalSetting';

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
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 3,
  });

  // [파생된 상태]
  const prevPokemonId = id - 1;
  const prevButtonLabel = prevPokemonId > 0 ? `포켓몬 ID "${prevPokemonId}"`: '포켓몬 없음';

  const nextPokemonId = id + 1;
  const nextButtonLabel = `포켓몬 ID "${nextPokemonId}"`;

  return (
    <>
      <Helmet>
        <title>리-패치 인터벌 설정 ← React Query 러닝 가이드</title>
      </Helmet>

      <SectionWithHeading title="React Query 가비지 콜렉션 타임 설정">
        <div className="space-y-1">
          <p className="text-slate-950">
            React Query의 리-패치 인터벌 설정에 대해 학습합니다.
          </p>
          <pre className="text-red-700">
            <code className="text-xs">
              {POKEMON_API}/<b>{id}</b>
            </code>
          </pre>
        </div>
      </SectionWithHeading>

      <div className='inline-flex flex-col items-center'>
        <time className="text-[11px] text-yellow-800 order-1">
          [업데이트] {new Date().toLocaleTimeString()}
        </time>
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
      </div>
    </>
  );
}
