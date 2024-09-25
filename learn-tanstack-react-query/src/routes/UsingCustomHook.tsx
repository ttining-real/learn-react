// --------------------------------------------------------------------------
// ✅ 커스텀 훅 작성 및 활용
// --------------------------------------------------------------------------
// - [ ] useFetch() 커스텀 훅 코드 해설
// - [ ] Pokemon 인터페이스(또는 타입) 코드 해설
// - [ ] Spinner 컴포넌트 코드 해설 (SVGR 라이브러리 활용)
// --------------------------------------------------------------------------

import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { useFocusingPrevFocusedElement } from '@/hooks/useFocusingPrevFocusedElement';
import Spinner from '@/assets/spinner.svg?react';
import { type Pokemon } from '@/types/Pokemon';
import useFetch from '@/hooks/useFetch';

// 환경 변수: 포켓몬 API
const POKEMON_API = import.meta.env.VITE_POKEMON;

// 리액트 개발 도구에 표시될 컴포넌트 이름
Component.displayName = 'UsingCustomHook';

// 컴포넌트
export function Component(): JSX.Element {
  
  // 이전 렌더링 시점의 초점 요소를 다음 렌더링 시 초점 설정
  const { focusLastFocusedElement } = useFocusingPrevFocusedElement();

  // [상태] 포켓몬 ID
  const [id, setId] = useState(1);

  // [상태] 현재 포켓몬 (useFetch 훅 활용)
  const currentPokemon = useFetch<Pokemon>(
    `${POKEMON_API}/${id}`
  );

  // [이벤트 핸들러]
  const handleRequestPrevData = () => {
    setId((i) => i - 1);
    focusLastFocusedElement();
  };

  const handleRequestNextData = () => {
    setId((i) => i + 1);
    focusLastFocusedElement();
  };

  // [상태] 이전 포켓몬 (useFetch 훅 활용)
  const prevPokemonId = id - 1;
  const prevPokemon = useFetch<Pokemon>(
    `${POKEMON_API}/${prevPokemonId}`,
    // 활성 설정
    { enabled: prevPokemonId > 0 }
  );

  // [상태] 다음 포켓몬 (useFetch 훅 활용)
  const nextPokemonId = id + 1;
  const nextPokemon = useFetch<Pokemon>(
    `${POKEMON_API}/${nextPokemonId}`
  );

  // [파생된 상태] 이전 탐색 버튼 레이블
  let prevButtonLabel = '';
  if (prevPokemon.isLoading) {
    prevButtonLabel = `포켓몬 ${prevPokemonId}`;
  } else {
    prevButtonLabel = prevPokemonId > 1 ? `포켓몬 "${prevPokemon.data?.name}"` : '포켓몬 없음';
  }

  // [파생된 상태] 다음 탐색 버튼 레이블
  let nextButtonLabel = '';
  if (nextPokemon.isLoading) {
    nextButtonLabel = `포켓몬 ${nextPokemonId}`;
  } else {
    nextButtonLabel = `포켓몬 "${nextPokemon.data?.name}"`;
  }

  // [파생된 상태] 이전 포켓몬 정보
  let prevPokemonInfo = '포켓몬 없음';
  if(prevPokemonId !== 0) {
    prevPokemonInfo = prevPokemon.data?.name ?? '...';
  }

  // [파생된 상태] 현재 포켓몬 정보
  const currentPokemonInfo = currentPokemon.data?.name ?? '...';

  // [파생된 상태] 다음 포켓몬 정보
  const nextPokemonInfo = nextPokemon.data?.name ?? '...';

  return (
    <>
      <Helmet>
        <title>커스텀 훅 활용 ← React Query 러닝 가이드</title>
      </Helmet>

      {/* SectionWithHeading */}
      <section className="flex flex-col gap-3">
        <h2 className="text-2xl font-bold text-red-600">커스텀 훅 활용</h2>

        <div className="space-y-1">
          <p className="text-slate-950">
            useFetch() 커스텀 훅을 작성해 데이터 요청/응답 로직을 재사용할 수 있습니다.
          </p>
          <pre className="text-red-700">
            <code className="text-xs">
              <b>
                이전 포켓몬 (id:{prevPokemonId}) ➜{' '}
                {prevPokemonInfo}
              </b>
            </code>
          </pre>
          <pre className="text-red-700">
            <code className="text-xs">
              <b>
                현재 포켓몬 (id:{id}) ➜ {currentPokemonInfo}
              </b>
            </code>
          </pre>
          <pre className="text-red-700">
            <code className="text-xs">
              <b>
                다음 포켓몬 (id:{nextPokemonId}) ➜{' '}
                {nextPokemonInfo}
              </b>
            </code>
          </pre>
        </div>
      </section>

      {/* PokemonCard */}
      <article aria-label="포켓몬 카드" className="pokemon-card">
        <div role="group">
          <button
            type="button"
            aria-label={prevButtonLabel}
            title={prevButtonLabel}
            onClick={handleRequestPrevData}
            disabled={currentPokemon.isLoading || id === 1}
          >
            {useMemo(() => <ChevronLeft size={16} />, [])}
          </button>

          <button
            type="button"
            aria-label={nextButtonLabel}
            title={nextButtonLabel}
            onClick={handleRequestNextData}
            disabled={currentPokemon.isLoading}
          >
            {useMemo(() => <ChevronRight size={16} />, [])}
          </button>
        </div>

        {/* isError: true */}
        {currentPokemon.isError && (
          <p className="error-message">
            {currentPokemon.error?.message}
          </p>
        )}

        <figure className="loading-message">
          {/* isLoading: true */}
          {currentPokemon.isLoading && (
            <Spinner
              title="로딩 중..."
              className="text-yellow-600"
              width={48}
              height={48}
            />
          )}

          {/* isSuccess: true */}
          {currentPokemon.status === 'success' && (
            <>
              <img
                src={currentPokemon.data?.sprites.front_default}
                alt=""
                height={96}
                width={96}
                loading="lazy"
                draggable={false}
              />
              <figcaption>{currentPokemon.data?.name}</figcaption>
            </>
          )}
        </figure>
      </article>
    </>
  );
}
