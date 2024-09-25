// --------------------------------------------------------------------------
// ✅ React Query 캐시 타임 설정
// --------------------------------------------------------------------------
// - [ ] staleTime 설정 해설 (stale: 캐시된 지 오래됨 !== 신선(fresh): 기본 값 = 0)
//   - [ ] 요청/응답 (cache-control 헤더 값 확인, Thunder Client 활용)
//   - [ ] staleTime 설정은 해당 데이터의 업데이트 기준에 따라 상대적
//   - [ ] 설정된 staleTime이 지나면, 요청 시 서버에서 응답 받아 다시 캐시
//   - [ ] 새로운 데이터를 응답받기까지 stale 데이터를 표시, 응답 이후 업데이트
//   - [ ] Stale data > No data 전략
// - [ ] React Query가 서버에 데이터를 다시 요청하는 경우
//   - 쿼리 키(queryKey) 변경 감지
//   - useQuery() 훅의 옵저버(observer)가 마운트 될 때
//   - 윈도우(창)에 초점 이동이 된 경우
//   - 오프라인 → 온라인 상태 변경 시
// - React Query의 리-패치(refetch) 옵션 설정
//   - 
// --------------------------------------------------------------------------

import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ChevronLeft, ChevronRight } from 'react-feather';
import Spinner from '@/assets/spinner.svg?react';

/* usePokemon --------------------------------------------------------------- */

import { useQuery } from '@tanstack/react-query';
import { Pokemon } from '@/types/Pokemon';

const getPokemon = async (id: number): Promise<Pokemon> => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

  if (!response.ok) {
    throw new Error(`오류 발생! ${response.status} ${response.statusText}`);
  }

  return response.json();
};

const usePokemon = (id: number) =>
  useQuery({
    queryKey: ['pokemon', { id }],
    queryFn: () => getPokemon(id),
    // staleTime: 1000 * 60,
  });

/* -------------------------------------------------------------------------- */

Component.displayName = 'ReactQueryStaleTime';

export function Component(): JSX.Element {
  const [id, setId] = useState(1);

  const { isLoading, isError, isSuccess, data, error } = usePokemon(id);

  const handleRequestPrevData = () => setId((i) => i - 1);
  const handleRequestNextData = () => setId((i) => i + 1);

  const prevPokemonId = id - 1;
  const prevButtonLabel =
    prevPokemonId > 0 ? `포켓몬 ID "${prevPokemonId}"` : '포켓몬 없음';
  const nextButtonLabel = `포켓몬 ID "${id + 1}"`;

  return (
    <>
      <Helmet>
        <title>스테일 타임 설정 ← React Query 러닝 가이드</title>
      </Helmet>

      <section className="flex flex-col gap-3">
        <h2 className="text-2xl font-bold text-red-600">
          React Query 스테일 타임 설정
        </h2>

        <div className="space-y-1">
          <p className="text-slate-950">
            useQuery() 훅에 설정하는 종속성에 대해 알아봅니다.
          </p>
          <pre className="text-red-700">
            <code className="text-xs">
              https://pokeapi.co/api/v2/pokemon/<b>{id}</b>
            </code>
          </pre>
        </div>
      </section>

      <article aria-label="포켓몬 카드" className="pokemon-card">
        <div role="group">
          <button
            type="button"
            aria-label={prevButtonLabel}
            title={prevButtonLabel}
            onClick={handleRequestPrevData}
            disabled={isLoading || id === 1}
          >
            <ChevronLeft size={16} />
          </button>

          <button
            type="button"
            aria-label={nextButtonLabel}
            title={nextButtonLabel}
            onClick={handleRequestNextData}
            disabled={isLoading}
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {isError && <p className="error-message">{error?.message}</p>}

        <figure className="loading-message">
          {isLoading && (
            <Spinner
              title="데이터 로딩 중..."
              className="text-yellow-600"
              width={48}
              height={48}
            />
          )}

          {isSuccess && (
            <>
              <img
                src={data?.sprites.front_default}
                alt=""
                width={96}
                height={96}
                loading="lazy"
                draggable={false}
              />
              <figcaption>{data?.name}</figcaption>
            </>
          )}
        </figure>
      </article>
    </>
  );
}
