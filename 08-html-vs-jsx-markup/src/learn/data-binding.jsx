function DataBinding({ statusMessages }) {
  // [미션] 랜덤 로직을 작성해서 임의의 상태 메시지가 표시되도록 설정합니다.
  // JavaScript 프로그래밍
  // Math.random() / Math.floor() / Math.round()

  // console.log(statusMessages);

  function randomNumber(min = 0, max = 10) {
    if (min > max) throw new Error('max 보다 min 값이 큽니다.');
    return Math.round(Math.random() * (max - min) + min);
  }

  const statusMessage =
    statusMessages[randomNumber(0, statusMessages.length - 1)];

  return (
    <>
      <dt>데이터 바인딩(data binding)</dt>
      <dd>
        <p>상태 메시지(status message)를 연결해 화면에 출력합니다.</p>
        <span className="status">
          {/* statusMessage 값을 화면에 표시합니다. (랜덤 표시도 도전!) */}
          {statusMessage}
        </span>
      </dd>
    </>
  );
}

export default DataBinding;
