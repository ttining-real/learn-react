function CardList(props) {
  const { children } = props;

  return (
    <ul className="CardList" aria-label="카드 컴포넌트 리스트">
      {children}
    </ul>
  );
}

export default CardList;
