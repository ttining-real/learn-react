import useDocumentTitle from '@/hooks/useDocumentTitle';
import TimeAndCounter from './components/TimeAndCounter';
import TodoListApp from './components/TodoListApp';
import S from './style.module.css';

function OptimizingRenders() {
  useDocumentTitle('렌더링(성능) 최적화');

  return (
    <main id="page" className={S.component}>
      <h1 className="headline">렌더링(성능) 최적화</h1>
      <div className="description">
        <p>
          불필요한 리-렌더가 발생하는 컴포넌트 렌더링 횟수를 줄여 성능을
          최적화합니다.
        </p>
        <p>
          참고:{' '}
          <a
            href="https://ko.react.dev/reference/react/useCallback"
            rel="noreferrer"
            target="_blank"
          >
            useCallback()
          </a>
          ,
          <a
            href="https://ko.react.dev/reference/react/useMemo"
            rel="noreferrer"
            target="_blank"
          >
            useMemo()
          </a>
          ,
          <a
            href="https://ko.react.dev/reference/react/memo"
            rel="noreferrer"
            target="_blank"
          >
            memo()
          </a>
        </p>
      </div>

      <div className="divider" />

      <h2 className="headline2">Time &amp; Counter</h2>
      <div className="description">
        <p>
          리액트 개발 도구로 TimeAndCounter 앱의 렌더링 문제를 파악한 후
          해결해봅니다.
        </p>
      </div>

      <TimeAndCounter />

      <div className="divider" />

      <h2 className="headline2">Todo List</h2>
      <div className="description">
        <p>
          학습한 내용을 토대로 TodoList 앱의 렌더링 문제를 파악한 후
          해결해봅니다.
        </p>
      </div>

      <TodoListApp />
    </main>
  );
}

export default OptimizingRenders;
