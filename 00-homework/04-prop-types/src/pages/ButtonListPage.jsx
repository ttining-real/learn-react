import Button from '@/components/Button';

function ButtonListPage() {
  return (
    <ul className="ButtonList">
      <li className="ButtonListItem" aria-label="작은 크기의 상태별 버튼">
        <Button status="default" size="sm" text={'기본 버튼'} />
        <Button status="positive" size="sm" text={'긍정 버튼'} />
        <Button status="negative" size="sm" text={'부정 버튼'} />
      </li>
      <li className="ButtonListItem" aria-label="중간 크기의 상태별 버튼">
        <Button status="default" size="md" text={'기본 버튼'} />
        <Button status="positive" size="md" text={'긍정 버튼'} />
        <Button status="negative" size="md" text={'부정 버튼'} />
      </li>
      <li className="ButtonListItem" aria-label="큰 크기의 상태별 버튼">
        <Button status="default" size="lg" text={'기본 버튼'} />
        <Button status="positive" size="lg" text={'긍정 버튼'} />
        <Button status="negative" size="lg" text={'부정 버튼'} />
      </li>
    </ul>
  );
}

export default ButtonListPage;
