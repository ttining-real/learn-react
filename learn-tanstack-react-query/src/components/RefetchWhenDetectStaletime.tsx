interface Props {
  isStale?: boolean;
  refetch?: () => void;
}

function RefetchWhenDetectStaletime({
  isStale = false,
  refetch,
}: Props): null | JSX.Element {
  if (!isStale) return null;

  return (
    <div className="inline-flex gap-2 border-2 border-red-900/40 rounded-md p-2 anim-scale-up">
      <p className="text-xs text-red-900/70">
        호출된 이전 쿼리는 오래되었습니다.
        <br />새 쿼리를 다시 호출하겠습니까?
      </p>
      <button
        type="button"
        onClick={refetch}
        className="text-xs font-semibold py-1 px-2 border border-dotted border-red-900/40 rounded-[4px] text-red-900/70"
      >
        리-패치
      </button>
    </div>
  );
}

export default RefetchWhenDetectStaletime;
