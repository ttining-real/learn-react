import { useRouteError } from 'react-router-dom';
import AppHeader from '@/components/AppHeader';
import { SectionWithHeading } from '@/components';

type RouteError = {
  internal: boolean;
  status: number;
  statusText: string;
  data?: string;
  message?: string;
};

function ErrorBoundary(): JSX.Element {
  const error = useRouteError() as RouteError;

  return (
    <div className="layout">
      <AppHeader />
      <main role="alert">
        <SectionWithHeading title={<>오류 발생 {error.statusText} {error.status}</>}>
          <p className="max-w-80 py-2 px-3.5 border-[3px] border-red-600 text-red-600 font-medium">
            {error.data ?? error.message}
          </p>
        </SectionWithHeading>
      </main>
    </div>
  );
}

export default ErrorBoundary;
