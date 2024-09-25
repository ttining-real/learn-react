import { memo, useEffect, useMemo, useRef } from 'react';
import { ChevronLeft, ChevronRight, Volume2 } from 'react-feather';
import { useFocusingPrevFocusedElement } from '@/hooks/useFocusingPrevFocusedElement';
import Spinner from '@/assets/spinner.svg?react';
import { type RestProps } from '@/types/RestProps';
import { type Pokemon } from '@/types/Pokemon';
import { getPublic } from '@/utils';

// 컴포넌트 속성 타입
type Props = React.PropsWithChildren<
  {
    label?: string;
    pokemon: Pokemon;
    prevLabel: string;
    nextLabel: string;
    isPrevDisable?: boolean;
    isNextDisable?: boolean;
    isLoading?: boolean;
    isError?: boolean;
    error?: Error;
    onPrev?: () => void;
    onNext?: () => void;
    prevButtonProps?: RestProps;
    nextButtonProps?: RestProps;
  } & RestProps
>;

// 컴포넌트
function PokemonCard({
  label = '포켓몬 카드',
  pokemon,
  prevLabel,
  nextLabel,
  isPrevDisable = false,
  isNextDisable = false,
  isLoading = false,
  isError = false,
  error,
  onPrev,
  onNext,
  prevButtonProps,
  nextButtonProps,
  ...restProps
}: Props): JSX.Element {
  // [명령형 핸들] 이전 렌더링 시점의 초점 요소를 다음 렌더링 시 초점 설정
  const { focusLastFocusedElement } = useFocusingPrevFocusedElement();

  // [참조] <audio> 요소
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // [이벤트 핸들러]
  const handleCrying = (): void => {
    const { current: audio } = audioRef;
    if (audio) audio.play();
    focusLastFocusedElement();
  };

  const handlePrev = () => {
    onPrev?.();
    focusLastFocusedElement();
  };

  const handleNext = () => {
    onNext?.();
    focusLastFocusedElement();
  };

  // [이펙트] pokemon 변경 시, audioRef 참조 업데이트
  useEffect(() => {
    if (pokemon && pokemon.cries?.latest) {
      audioRef.current = new Audio(pokemon.cries.latest);
    }
  }, [pokemon]);

  return (
    <article aria-label={label} className="pokemon-card" {...restProps}>
      {/* 에러 핸들링 */}
      {isError && <p className="error-message">{error?.message}</p>}

      <figure className="loading-message relative">
        {/* 로딩 핸들링 */}
        {isLoading && (
          <Spinner
            title="데이터 로딩 중..."
            className="text-yellow-600"
            width={48}
            height={48}
          />
        )}

        {/* 포켓몬 데이터가 존재할 경우 핸들링 */}
        {pokemon && (
          <>
            <img
              src={getPublic(pokemon.sprites.front_default)}
              alt=""
              width={96}
              height={96}
              loading="lazy"
              draggable={false}
            />
            <figcaption className="flex gap-1 justify-between items-center">
              <span className="pokemon-name">{pokemon.name}</span>
              {pokemon.cries?.latest && (
                <button
                  type="button"
                  className="grid place-content-center translate-y-[1px] hover:text-yellow-800 anim-scale-up"
                  aria-label="울음 소리"
                  title="울음 소리"
                  onClick={handleCrying}
                >
                  <Volume2 size={16} />
                </button>
              )}
            </figcaption>
          </>
        )}
      </figure>

      {/* 버튼 그룹 */}
      <div role="group">
        <button
          type="button"
          aria-label={prevLabel}
          title={prevLabel}
          onClick={handlePrev}
          disabled={isLoading || isPrevDisable}
          {...prevButtonProps}
        >
          {useMemo(() => <ChevronLeft size={16} />, [])}
        </button>
        <button
          type="button"
          aria-label={nextLabel}
          title={nextLabel}
          onClick={handleNext}
          disabled={isLoading || isNextDisable}
          {...nextButtonProps}
        >
          {useMemo(() => <ChevronRight size={16} />, [])}
        </button>
      </div>
    </article>
  );
}

export default memo(PokemonCard);
