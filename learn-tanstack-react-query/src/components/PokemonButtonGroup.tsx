import { useMemo } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import { usePokemon } from "@/contexts/Pokemon";

function PokemonButtonGroup() {
  const { prevLabel, nextLabel, isFirst, isLast, onPrev, onNext } = usePokemon();

  return (
    <div role="group">
      <button
        type="button"
        aria-label={prevLabel}
        title={prevLabel}
        onClick={onPrev}
        disabled={isFirst}
      >
        {useMemo(() => <ChevronLeft size={16} />, [])}
      </button>
      <button
        type="button"
        aria-label={nextLabel}
        title={nextLabel}
        onClick={onNext}
        disabled={isLast}
      >
        {useMemo(() => <ChevronRight size={16} />, [])}
      </button>
    </div>
  )
}

export default PokemonButtonGroup