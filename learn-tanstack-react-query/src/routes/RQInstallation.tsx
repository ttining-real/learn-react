// --------------------------------------------------------------------------
// ✅ React Query 설치 및 구성
// --------------------------------------------------------------------------
// - [ ] 프로젝트에 React Query 패키지 설치 (참고: https://bit.ly/3XyJCdW)
// - [ ] App 컴포넌트 → QueryClient 클래스로 queryClient 인스턴스 생성
// - [ ] App 컴포넌트 → <QueryClientProvider>에 client 속성 값으로 queryClient 공급
// - [ ] useFetch() → useQuery() 훅으로 코드 교체 작성
// - [ ] <article> → <PokemonCard> 요소로 코드 교체 작성
// - [ ] querykey, queryFn 종속성 해설 (선언적 프로그래밍: useEffect() 훅과 비슷)
// - [ ] ESLint용 React Query 플러그인 설치 및 구성 (참고: https://bit.ly/47gouwh)
// --------------------------------------------------------------------------

import { Helmet } from 'react-helmet-async';
import { ChevronLeft, ChevronRight, Volume2 } from 'react-feather';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useFocusingPrevFocusedElement } from '@/hooks/useFocusingPrevFocusedElement';
import { SectionWithHeading } from '@/components';
import Spinner from '@/assets/spinner.svg?react';
import type { Pokemon } from '@/types/Pokemon';
import useFetch from '@/hooks/useFetch';

// 환경 변수: 포켓몬 API
const POKEMON_API = import.meta.env.VITE_POKEMON;

// 리액트 개발 도구에 표시될 컴포넌트 이름
Component.displayName = 'ReactQueryInstallation';

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

  // [상태] useQuery 커스텀 훅 활용 (응답 데이터 타입, 제네릭 설정)
  const { isLoading, isError, status, data, error } = useFetch<Pokemon>(
    `${POKEMON_API}/${id}`
  );

  // [파생된 상태]
  const prevPokemonId = id - 1;
  const prevButtonLabel = prevPokemonId > 0 ? `포켓몬 ID "${prevPokemonId}"`: '포켓몬 없음';

  const nextPokemonId = id + 1;
  const nextButtonLabel = `포켓몬 ID "${nextPokemonId}"`;

  // [참조] 오디오
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // [이벤트 핸들러] 울음소리 재생
  const handleCrying = () => {
    const { current: audio } = audioRef;
    if (audio) audio.play();
  };

  // [이펙트]
  useEffect(() => {
    // 데이터가 존재할 경우
    if (data) {
      // 오디오 참조 값 업데이트 (리-렌더 없음)
      audioRef.current = new Audio(data.cries.latest);
    }
  }, [data]);

  return (
    <>
      <Helmet>
        <title>설치 및 구성 ← React Query 러닝 가이드</title>
      </Helmet>

      <SectionWithHeading title="React Query 설치 및 구성">
        <div className="space-y-1">
          <p className="text-slate-950">
            React Query 라이브러리를 설치하고 구성하는 과정을 학습합니다.
          </p>
          <pre className="text-red-700">
            <code className="text-xs">
              {POKEMON_API}/<b>{id}</b>
            </code>
          </pre>
        </div>
      </SectionWithHeading>

      <article aria-label="포켓몬 카드" className="pokemon-card">
        {isError && <p className="error-message">{error?.message}</p>}

        <figure className="loading-message relative">
          {isLoading && (
            <Spinner
              title="데이터 로딩 중..."
              className="text-yellow-600"
              width={48}
              height={48}
            />
          )}

          {status === 'success' && (
            <>
              <img
                src={data?.sprites.front_default}
                alt=""
                width={96}
                height={96}
                loading="lazy"
                draggable={false}
              />
              <figcaption className="flex gap-1 justify-between items-center">
                <span className="pokemon-name">{data?.name}</span>
                <button
                  type="button"
                  className="grid place-content-center translate-y-[1px] hover:text-yellow-800 anim-scale-up"
                  aria-label="울음 소리"
                  title="울음 소리"
                  onClick={handleCrying}
                >
                  <Volume2 size={16} />
                </button>
              </figcaption>
            </>
          )}
        </figure>

        <div role="group">
          <button
            type="button"
            aria-label={prevButtonLabel}
            title={prevButtonLabel}
            onClick={handleRequestPrevData}
            disabled={isLoading || id === 1}
          >
            {useMemo(() => <ChevronLeft size={16} />, [])}
          </button>

          <button
            type="button"
            aria-label={nextButtonLabel}
            title={nextButtonLabel}
            onClick={handleRequestNextData}
            disabled={isLoading}
          >
            {useMemo(() => <ChevronRight size={16} />, [])}
          </button>
        </div>
      </article>
    </>
  );
}
