import ChatWindow from './components/ChatWindow';
import S from './style.module.css';

function UsingImperativeHandle() {
  return (
    <main className={S.component}>
      <h1 className={S.headline} lang="en">
        상위 컴포넌트에 명령형 핸들 노출하기
      </h1>
      <div className={S.description}>
        <p>
          <a
            href="https://ko.react.dev/reference/react/forwardRef"
            rel="noreferrer noopener"
            target="_blank"
          >
            React.forwardRef()
          </a>
          를 사용해 상위 컴포넌트에 하위 컴포넌트의 DOM 요소 노드를 노출하는
          방법을 학습했습니다.
        </p>
        <p>
          때때로 DOM 요소 노드에 대한 접근을 허용하지 않고, 명령형 핸들(함수)를
          노출하고 싶을 수도 있습니다.
        </p>
        <p>
          이런 경우{' '}
          <a
            href="https://ko.react.dev/reference/react/useImperativeHandle"
            rel="noreferrer noopener"
            target="_blank"
          >
            React.useImperativeHandle()
          </a>{' '}
          훅을 사용합니다. 이 훅을 사용하는 방법을 학습합니다.
        </p>
      </div>
      <ChatWindow />
    </main>
  );
}

export default UsingImperativeHandle;
