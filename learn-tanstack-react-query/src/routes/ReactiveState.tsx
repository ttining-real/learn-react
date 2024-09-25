// --------------------------------------------------------------------------
// ✅ React의 반응성 상태 관리
// --------------------------------------------------------------------------
// - [ ] useState() 훅을 사용해 반응성 상태를 선언한 부분 해설
// - [ ] useCallback() 훅을 사용해 다시 선언될 필요없는 함수 메모(캐싱) 해설
// - [ ] useState() 훅 함수에 제네릭 타입 지정이 필요한 이유 해설
// - [ ] 프리미티브(원시) 타입의 경우, 타입 추론으로 생략 가능 해설
// - [ ] 프리미티브(원시) 타입 또한 명시적인 타입 지정 과정 시연
// - [ ] PokemonCard 조건부 렌더링 처리 부분 해설
// --------------------------------------------------------------------------

import { Helmet } from 'react-helmet-async';
import { useState, useCallback } from 'react';
import { PokemonCard, SectionWithHeading } from '@/components';
import type { PokemonData, Pokemon } from '@/types/Pokemon';
import pokemonData from '@/datas/pokemon.json';

// 리액트 개발 도구에 표시될 컴포넌트 이름
Component.displayName = 'ReactiveState';

// 컴포넌트
export function Component(): JSX.Element {

  // [상태] 포켓몬 ID
  const [id, setId] = useState(1);
  
  // [상태 업데이트] 포켓몬 ID
  const handleRequestPrevData = useCallback(() => setId((i) => i - 1), []);
  const handleRequestNextData = useCallback(() => setId((i) => i + 1), []);
  
  // [상태] 포켓몬 데이터 (리스트)
  const [pokemons] = useState<PokemonData[]>(pokemonData);
  
  // [파생된 상태] 화면에 표시할 포켓몬 아이템
  const pokemon = pokemons.find(p => p.id === id);

  // [파생된 상태] 이전 포켓몬 ID, 레이블
  const prevPokemonId = id - 1;
  const prevButtonLabel = prevPokemonId > 0 ? `포켓몬 ID "${prevPokemonId}"`: '포켓몬 없음';

  // [파생된 상태] 다음 포켓몬 ID, 레이블
  const nextPokemonId = id + 1;
  const nextButtonLabel = `포켓몬 ID "${nextPokemonId}"`;
  
  // [파생된 상태] isFirst, isLast, total
  const isFirst = pokemons.at(0)?.id === id;
  const isLast = pokemons.at(-1)?.id === id;
  const total = pokemons.length;

  // [조건부 렌더링]
  // 1. pokemon이 존재하지 않을 경우 오류 메시지 표시
  let renderPokemon = (
    <p
      role="alert"
      className="inline-block mt-2 p-2 rounded border-[2.5px] border-red-700/80 text-red-700 font-medium"
    >
      ID "<span className='font-extrabold'>{id}</span>" 값과 매칭된 포켓몬이 존재하지 않습니다.
    </p>
  );

  // 2. pokemon이 존재할 경우 포켓몬 카드 표시
  if (pokemon) {
    renderPokemon = (
      <PokemonCard
        pokemon={pokemon as Pokemon}
        prevLabel={prevButtonLabel}
        nextLabel={nextButtonLabel}
        isPrevDisable={isFirst}
        isNextDisable={isLast}
        onPrev={handleRequestPrevData}
        onNext={handleRequestNextData}
      />
    );
  }

  return (
    <>
      <Helmet>
        <title>반응성 상태 선언 및 관리 ← React Query 러닝 가이드</title>
      </Helmet>

      <SectionWithHeading title="반응성 상태 및 관리">
        <div className="space-y-1">
          <p className="text-slate-950">
            React <abbr title="Application Programming Interface">API</abbr>를
            사용해 반응성 상태를 선언하고 관리하여 화면을 업데이트합니다.
          </p>
          <pre className="text-red-700">
            <code className="text-xs">
              <b>{id}</b> / {total}
            </code>
          </pre>
        </div>
      </SectionWithHeading>

      {renderPokemon}
    </>
  );
}