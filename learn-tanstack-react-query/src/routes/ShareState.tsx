// --------------------------------------------------------------------------
// ✅ 리액트 Context API를 사용한 상태 공유 & 리-렌더 이슈
// --------------------------------------------------------------------------
// - [ ] Context API를 사용한 Pokemon 데이터(상태) 공유 해설
//   - [ ] PokemonProvider 컴포넌트 코드 해설
//   - [ ] usePokemonValues() 훅 코드 해설
//   - [ ] usePokemonMethods() 훅 코드 해설
//   - [ ] usePokemon() 훅 코드 해설
// --------------------------------------------------------------------------

import { Helmet } from 'react-helmet-async';
import { usePokemonValues } from '@/contexts/Pokemon';
import { SectionWithHeading, PokemonList } from '@/components';

// 리액트 개발 도구에 표시될 컴포넌트 이름
Component.displayName = 'ShareState';

// 컴포넌트
export function Component(): JSX.Element {
  
  // 포켓몬 읽기 컨텍스트 값 구조 분해 할당
  const { id, total } = usePokemonValues();

  return (
    <>
      <Helmet>
        <title>상태 공유 (컨텍스트) ← React Query 러닝 가이드</title>
      </Helmet>

      <SectionWithHeading title="상태 공유 (컨텍스트)">
        <div className="space-y-1">
          <p className="text-slate-950">
            Context <abbr title="Application Programming Interface">API</abbr>
            를 사용해 반응성 상태를 여러 컴포넌트에서 공유 및 관리합니다.
          </p>
          <pre className="text-red-700">
            <code className="text-xs">
              <b>{id}</b> / {total}
            </code>
          </pre>
        </div>
      </SectionWithHeading>

      {/* 포켓몬 리스트 */}
      <PokemonList />
    </>
  );
}