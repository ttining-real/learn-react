// --------------------------------------------------------------------------
// ✅ Fetch API 종속 요청
// --------------------------------------------------------------------------
// - [ ] 종속 요청 (dependent request)
//   - 종속된 데이터를 가져오는 방법
// - [ ] API 코드 해설
//   - fetchSpeciesAndAbilites
//   - fetchAbilities
//   - fetchSpecies
// --------------------------------------------------------------------------

import { Helmet } from 'react-helmet-async';
import { useCallback, useEffect, useState } from 'react';
import { useFocusingPrevFocusedElement } from '@/hooks/useFocusingPrevFocusedElement';
import fetchSpeciesAndAbilites from '@/api/fetchSpeciesAndAbilites';
import { PokemonCard, SectionWithHeading } from '@/components';
import { usePokemon } from '@/hooks/usePokemon';
import { type Pokemon } from '@/types/Pokemon';

// 리액트 개발 도구에 표시될 컴포넌트 이름
Component.displayName = 'RQDependentRequests';

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
  const { isLoading, isError, error, data } = usePokemon(id);

  // [파생된 상태]
  const prevButtonLabel = `포켓몬 ${id - 1}`;
  const nextButtonLabel = `포켓몬 ${id + 1}`;

  // [상태] 종속 요청 (Dependent Request)
  const [species, setSpecies] = useState<string>('');
  const [abililties, setAbilities] = useState<{ name: string; text: string; }[]>([]);

  // [이펙트]
  useEffect(() => {
    if (data) {
      fetchSpeciesAndAbilites(data.species.url, data.abilities)
        .then(info => {
          setSpecies(info.species as string);
          setAbilities(info.abilities as { name: string; text: string; }[]);
        });
    }
  }, [data]);

  return (
    <>
      <Helmet>
        <title>Fetch API 종속 요청 (Dependent Request) ← React Query 러닝 가이드</title>
      </Helmet>

      <SectionWithHeading title="Fetch API 종속 요청 (Dependent Request)">
        <div className="space-y-1">
          <p className="text-slate-950">
            Fetch <abbr title="Application Programming Interface">API</abbr>를 사용한 종속 요청에 대해 학습합니다.
          </p>
        </div>
      </SectionWithHeading>

      <div className='flex gap-3 items-center'>
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
        <div className='inline-flex flex-col gap-1 pt-2 pb-3 px-3 border-2 border-yellow-600/55 rounded-md bg-yellow-400/20'>
          <b className="text-sm text-yellow-700">{species}</b>
          <ul className="text-xs">
            {abililties.map((ability) => (
              <li key={ability.name}>
                <b className="text-yellow-900">{ability.name}</b>{' '}
                <span className="text-yellow-950">"{ability.text}"</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}