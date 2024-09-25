// --------------------------------------------------------------------------
// ✅ React Query 병렬 쿼리
// --------------------------------------------------------------------------
// - [ ] 병렬 쿼리 (실제 앱에서는 여러 요청이 필요)
// - [ ] 여러 useQuery() 훅 활용 방법 해설
//   - 현재, 이전, 다음 보여질 포켓몬 쿼리
//   - 각 쿼리 별 제어 필요
// - [ ] useQueries() 훅 활용 방법 해설
//   - 여러 쿼리를 묶어 한데 관리
//   - combine 옵션을 사용해 여러 쿼리 값을 기반으로 계산된 값 반환 가능
// --------------------------------------------------------------------------

import { Helmet } from 'react-helmet-async';
import { useCallback, useState } from 'react';
import { useQueries } from '@tanstack/react-query';
import { useFocusingPrevFocusedElement } from '@/hooks/useFocusingPrevFocusedElement';
import { PokemonCard, SectionWithHeading } from '@/components';
import { getPokemon, usePokemon } from '@/hooks/usePokemon';
import { type Pokemon } from '@/types/Pokemon';

// 리액트 개발 도구에 표시될 컴포넌트 이름
Component.displayName = 'RQParallelQueries';

/* useQuery × 3 ------------------------------------------------------------- */

// 컴포넌트 예시 1 (예시 2는 아래 Component2 코드 검토)
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

  // [상태] 현재 포켓몬 쿼리
  const currentPokemonQuery = usePokemon(id);

  // [상태] 이전 포켓몬 쿼리
  const prevPokemonId = id - 1;
  const prevPokemonQuery = usePokemon(prevPokemonId, {
    enabled: prevPokemonId > 0
  });

  // [상태] 다음 포켓몬 쿼리
  const nextPokemonId = id + 1;
  const nextPokemonQuery = usePokemon(nextPokemonId);

  // [파생된 상태] 모든 쿼리 상태 계산
  const queries = [currentPokemonQuery, prevPokemonQuery, nextPokemonQuery];
  const isLoading = queries.some(query => query.isLoading);
  const isError = queries.some(query => query.isError);
  const [ currentPokemon, prevPokemon, nextPokemon ] = queries.map(query => query.data);
  const [ currentPokemonError ] = queries.map(query => query.error);

  let prevButtonLabel = '';
  let nextButtonLabel = '';

  if (isLoading) {
    prevButtonLabel = `포켓몬 ${prevPokemonId}`;
    nextButtonLabel = `포켓몬 ${nextPokemonId}`;
  }
  
  if (prevPokemon) {
    prevButtonLabel = prevPokemonId > 0 ? `포켓몬 "${prevPokemon.name}"` : '포켓몬 없음';
  }
  
  if (nextPokemon) {
    nextButtonLabel = `포켓몬 "${nextPokemon.name}"`;
  }

  return (
    <>
      <Helmet>
        <title>병렬 쿼리 ← React Query 러닝 가이드</title>
      </Helmet>

      <SectionWithHeading title="React Query 병렬 쿼리">
        <div className="space-y-1">
          <p className="text-slate-950">
            React Query의 "병렬 쿼리" 개념에 대해 알아봅니다.
          </p>
          <pre className="text-red-700">
            <code className="text-xs">
              <b>
                이전 포켓몬 (id:{prevPokemonId}) ➜{' '}
                {prevPokemonId === 0
                  ? '포켓몬 없음'
                  : isLoading
                  ? '...'
                  : prevPokemon?.name}
              </b>
            </code>
          </pre>
          <pre className="text-red-700">
            <code className="text-xs">
              <b>
                현재 포켓몬 (id:{id}) ➜{' '}
                {isLoading ? '...' : currentPokemon?.name}
              </b>
            </code>
          </pre>
          <pre className="text-red-700">
            <code className="text-xs">
              <b>
                다음 포켓몬 (id:{nextPokemonId}) ➜{' '}
                {isLoading ? '...' : nextPokemon?.name}
              </b>
            </code>
          </pre>
        </div>
      </SectionWithHeading>

      <PokemonCard
        error={currentPokemonError as Error}
        pokemon={currentPokemon as Pokemon}
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

/* useQueries --------------------------------------------------------------- */

// 컴포넌트 예시 2
export function Component2() {
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

  // [파생된 상태] 이전, 다음 포켓몬 ID
  const prevPokemonId = id - 1;
  const nextPokemonId = id + 1;

  // [상태] 병렬 쿼리 결과
  const {
    isLoading,
    isError,
    currentPokemon,
    prevPokemon,
    nextPokemon,
    currentPokemonError,
  } = useQueries({
    queries: [
      {
        queryKey: ['pokemon', { id }],
        queryFn: () => getPokemon(id),
      },
      {
        queryKey: ['pokemon', { id: prevPokemonId }],
        queryFn: () => getPokemon(prevPokemonId),
        enabled: prevPokemonId > 0,
      },
      {
        queryKey: ['pokemon', { id: nextPokemonId }],
        queryFn: () => getPokemon(nextPokemonId),
      },
    ],
    // 모든 쿼리의 상태 병합
    combine(queries) {
      const isLoading = queries.some((query) => query.isLoading);
      const isError = queries.some((query) => query.isError);
      const [currentPokemon, prevPokemon, nextPokemon] = queries.map(
        (query) => query.data
      );
      const [currentPokemonError, prevPokemonError, nextPokemonError] =
        queries.map((query) => query.error);

      return {
        isLoading,
        isError,
        currentPokemon,
        prevPokemon,
        nextPokemon,
        currentPokemonError,
        prevPokemonError,
        nextPokemonError,
      };
    },
  });

  // [파생된 상태] 버튼 레이블
  let prevButtonLabel = '';
  let nextButtonLabel = '';

  if (isLoading) {
    prevButtonLabel = `포켓몬 ${prevPokemonId}`;
    nextButtonLabel = `포켓몬 ${nextPokemonId}`;
  }
  
  if (prevPokemon) {
    prevButtonLabel = prevPokemonId > 0 ? `포켓몬 "${prevPokemon.name}"` : '포켓몬 없음';
  }
  
  if (nextPokemon) {
    nextButtonLabel = `포켓몬 "${nextPokemon.name}"`;
  }

  return (
    <>
      <Helmet>
        <title>병렬 쿼리 ← React Query 러닝 가이드</title>
      </Helmet>

      <SectionWithHeading title="React Query 병렬 쿼리">
        <div className="space-y-1">
          <p className="text-slate-950">
            React Query의 "병렬 쿼리" 개념에 대해 알아봅니다.
          </p>
          <pre className="text-red-700">
            <code className="text-xs">
              <b>
                이전 포켓몬 (id:{prevPokemonId}) ➜{' '}
                {prevPokemonId === 0
                  ? '포켓몬 없음'
                  : isLoading
                  ? '...'
                  : prevPokemon?.name}
              </b>
            </code>
          </pre>
          <pre className="text-red-700">
            <code className="text-xs">
              <b>
                현재 포켓몬 (id:{id}) ➜{' '}
                {isLoading ? '...' : currentPokemon?.name}
              </b>
            </code>
          </pre>
          <pre className="text-red-700">
            <code className="text-xs">
              <b>
                다음 포켓몬 (id:{nextPokemonId}) ➜{' '}
                {isLoading ? '...' : nextPokemon?.name}
              </b>
            </code>
          </pre>
        </div>
      </SectionWithHeading>

      <PokemonCard
        error={currentPokemonError as Error}
        pokemon={currentPokemon as Pokemon}
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
