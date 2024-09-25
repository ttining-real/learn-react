// --------------------------------------------------------------------------
// ✅ 리액트 앱, 외부 시스템과 동기화
// --------------------------------------------------------------------------
// - [ ] useImmer() 훅을 사용한 상태 관리 해설
// - [ ] useImmer() 훅을 사용한 상태 관리 해설
//   - [ ] 제네릭 타입 지정이 필요한 이유 해설
//   - [ ] FetchData 인터페이스 코드 해설
//   - [ ] Data 인터페이스 코드 해설
// - [ ] useEffect() 훅 코드 해설
// - [ ] try ~ catch 구문 Error 타입 지정 코드 해설
// --------------------------------------------------------------------------

import { useImmer } from 'use-immer';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { useFocusingPrevFocusedElement } from '@/hooks/useFocusingPrevFocusedElement';
import { type FetchData } from '@/types/FetchData';
import { SectionWithHeading } from '@/components';
import Spinner from '@/assets/spinner.svg?react';

// 환경 변수: 포켓몬 API
const POKEMON_API = import.meta.env.VITE_POKEMON;

// 응답 데이터 인터페이스
interface Data {
  name: string;
  sprites: {
    front_default: string;
  };
}

// 서버 데이터 초기 상태
const INITIAL_DATA: FetchData<Data> = {
  status: 'pending',
  error: null,
  data: null,
  isLoading: false,
  isError: false,
};

// 리액트 개발 도구에 표시될 컴포넌트 이름
Component.displayName = 'RequestData';

// 컴포넌트
export function Component(): JSX.Element {
  
  // 이전 렌더링 시점의 초점 요소를 다음 렌더링 시 초점 설정
  const { focusLastFocusedElement } = useFocusingPrevFocusedElement();

  // [상태] 포켓몬 ID
  const [id, setId] = useState(25);

  // [상태] 서버 데이터
  const [data, setData] = useImmer<FetchData<Data>>(INITIAL_DATA);

  // [이펙트]
  useEffect(() => {
    // 무시 설정
    let ignore = false;

    // 중복 요청 취소를 위한 설정
    const abortController = new AbortController();

    // 서버에서 데이터 가져오기 함수
    const fetchData = async () => {
      // 데이터 가져오기 상태 초기화
      setData((draft) => {
        draft.status = 'loading';
        draft.isLoading = true;
        draft.isError = false;
        draft.error = null;
      });

      try {
        // 서버에 데이터 가져오기 요청
        const response = await fetch(
          `${POKEMON_API}/${id}`,
          { signal: abortController.signal }
        );

        // 응답이 실패한 경우
        if (!response.ok) {
          const { status, statusText } = response;
          const errorMessage = await response.text();

          // 오류 전달
          throw new Error(
            `[ ${status} / ${
              errorMessage ?? statusText
            } ] 네트워크 요청/응답에 실패했습니다.`
          );
        }

        // 응답이 성공한 경우
        const data = await response.json();

        // 무시 설정이 false인 경우에만 상태 업데이트
        if (!ignore) {
          // 서버 데이터를 상태로 업데이트
          setData((draft) => {
            draft.data = data;
            draft.status = 'success';
            draft.isLoading = false;
          });
        }
      } catch (e: unknown) {
        const error = e as Error;

        // 중복 요청 취소가 아닌 경우
        if (!error.name.includes('Abort')) {
          // 오류 데이터를 상태로 업데이트
          setData((draft) => {
            draft.error = error;
            draft.status = 'error';
            draft.isLoading = false;
            draft.isError = true;
          });
        }
      }
    };

    // 서버에서 데이터 가져오도록 요청
    fetchData();

    // 클린업
    return () => {
      // 중복 요청 취소
      abortController.abort();
      // 무시 활성화
      ignore = true;
    };
  }, [id, setData]);

  // [이벤트 핸들러]
  const handleRequestPrevData = () => {
    setId((i) => i - 1);
    focusLastFocusedElement();
  };

  const handleRequestNextData = () => {
    setId((i) => i + 1);
    focusLastFocusedElement();
  };

  // [파생된 상태]
  const prevPokemonId = id - 1;
  const prevButtonLabel = prevPokemonId > 0 ? `포켓몬 ID "${prevPokemonId}"` : '포켓몬 없음';
  
  const nextPokemonId = id + 1;
  const nextButtonLabel = `포켓몬 ID "${nextPokemonId}"`;

  return (
    <>
      <Helmet>
        <title>React의 데이터 요청/응답 ← React Query 러닝 가이드</title>
      </Helmet>

      <SectionWithHeading
        title={
          <>
            서버 데이터 요청 <span className="font-extralight">/</span> 응답
          </>
        }
      >
        <div className="space-y-1">
          <p className="text-slate-950">
            React API를 사용해 데이터 요청 후, 응답받은 결과를 화면에
            렌더링합니다.
          </p>
          <pre className="text-red-700">
            <code className="text-xs">
              https://pokeapi.co/api/v2/pokemon/<b>{id}</b>
            </code>
          </pre>
        </div>
      </SectionWithHeading>

      <article aria-label="포켓몬 카드" className="pokemon-card">
        <div role="group">
          <button
            type="button"
            aria-label={prevButtonLabel}
            title={prevButtonLabel}
            onClick={handleRequestPrevData}
            disabled={data.isLoading || id === 1}
          >
            <ChevronLeft size={16} />
          </button>

          <button
            type="button"
            aria-label={nextButtonLabel}
            title={nextButtonLabel}
            onClick={handleRequestNextData}
            disabled={data.isLoading}
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {data.isError && <p className="error-message">{data.error?.message}</p>}

        <figure className="loading-message">
          {data.isLoading && (
            <Spinner
              title="데이터 로딩 중..."
              className="text-yellow-600"
              width={48}
              height={48}
            />
          )}

          {data.status === 'success' && (
            <>
              <img
                src={data.data?.sprites.front_default}
                alt=""
                width={96}
                height={96}
                loading="lazy"
                draggable={false}
              />
              <figcaption>{data.data?.name}</figcaption>
            </>
          )}
        </figure>
      </article>
    </>
  );
}
