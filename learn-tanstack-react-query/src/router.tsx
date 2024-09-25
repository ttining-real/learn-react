import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { PokemonProvider } from '@/contexts/Pokemon';
import { QueryProvider } from '@/contexts/Query';
import { type NavItem } from '@/types/NavItem';
import ErrorBoundary from '@/routes/ErrorBoundary';
import RootLayout from '@/routes/RootLayout';

export const navigationItems: NavItem[] = [
  {
    id: crypto.randomUUID(),
    index: true,
    lazy: () => import('@/routes/Home'),
  },
  {
    id: crypto.randomUUID(),
    path: '/reactive-state',
    text: '반응성 상태 선언',
    lazy: () => import('@/routes/ReactiveState'),
  },
  {
    id: crypto.randomUUID(),
    path: '/share-state',
    text: '상태 공유 (컨텍스트)',
    lazy: async () => {
      const { Component } = await import('@/routes/ShareState');

      return {
        element: (
          <PokemonProvider>
            <Component />
          </PokemonProvider>
        ),
      };
    },
  },
  {
    id: crypto.randomUUID(),
    path: '/request-data',
    text: '서버 데이터 요청 / 응답',
    lazy: () => import('@/routes/RequestData'),
  },
  {
    id: crypto.randomUUID(),
    path: '/using-custom-hook',
    text: '커스텀 훅 활용 (재사용)',
    lazy: () => import('@/routes/UsingCustomHook'),
  },
  {
    id: crypto.randomUUID(),
    path: '/caching-data',
    text: '데이터 캐싱 (메모리)',
    lazy: async () => {
      const { Component } = await import('@/routes/CachingData');

      return {
        element: (
          <QueryProvider>
            <Component />
          </QueryProvider>
        ),
      };
    },
  },
  {
    id: crypto.randomUUID(),
    path: '/why-react-query',
    text: (
      <>
        <abbr title="Rect Query">R.Q</abbr>가 필요한 이유
      </>
    ),
    lazy: async () => {
      const { Component } = await import('@/routes/WhyReactQuery');

      return {
        element: (
          <QueryProvider>
            <Component />
          </QueryProvider>
        ),
      };
    },
  },
  {
    id: crypto.randomUUID(),
    path: '/react-query-installation',
    text: (
      <>
        <abbr title="Rect Query">R.Q</abbr> 설치 및 구성
      </>
    ),
    lazy: () => import('@/routes/RQInstallation'),
  },
  {
    id: crypto.randomUUID(),
    path: '/react-query-devtools',
    text: (
      <>
        <abbr title="Rect Query">R.Q</abbr> 개발도구 구성
      </>
    ),
    lazy: () => import('@/routes/RQDevTools'),
  },
  {
    id: crypto.randomUUID(),
    path: '/react-query-custom-hook',
    text: (
      <>
        <abbr title="Rect Query">R.Q</abbr> 커스텀 훅 활용
      </>
    ),
    lazy: () => import('@/routes/RQCustomHook'),
  },
  {
    id: crypto.randomUUID(),
    path: '/react-query-typescript',
    text: (
      <>
        <abbr title="Rect Query">R.Q</abbr> + TypeScript
      </>
    ),
    lazy: () => import('@/routes/RQTypeScript'),
  },
  {
    id: crypto.randomUUID(),
    path: '/react-query-staletime',
    text: (
      <>
        <abbr title="Rect Query">R.Q</abbr> 스테일 타임 설정
      </>
    ),
    lazy: () => import('@/routes/RQStaleTime'),
  },
  {
    id: crypto.randomUUID(),
    path: '/react-query-refetch-settings',
    text: (
      <>
        <abbr title="Rect Query">R.Q</abbr> 리패치 설정
      </>
    ),
    lazy: () => import('@/routes/RQRefetchSettings'),
  },
  {
    id: crypto.randomUUID(),
    path: '/react-query-enabled-setting',
    text: (
      <>
        <abbr title="Rect Query">R.Q</abbr> 활성 설정
      </>
    ),
    lazy: () => import('@/routes/RQEnabledSetting'),
  },
  {
    id: crypto.randomUUID(),
    path: '/react-query-garbage-collection-time',
    text: (
      <>
        <abbr title="Rect Query">R.Q</abbr>{' '}
        <abbr title="Garbage Collection">G.C</abbr> 타임 설정
      </>
    ),
    lazy: () => import('@/routes/RQGCTimeSetting'),
  },
  {
    id: crypto.randomUUID(),
    path: '/react-query-refetch-interval',
    text: (
      <>
        <abbr title="Rect Query">R.Q</abbr> 리-패치 인터벌 설정
      </>
    ),
    lazy: () => import('@/routes/RQRefetchIntervalSetting'),
  },
  {
    id: crypto.randomUUID(),
    path: '/react-query-dependent-requests',
    text: (
      <>
        Fetch <abbr title="Application Programming Interface">API</abbr> 종속
        요청
      </>
    ),
    lazy: () => import('@/routes/RQDependentRequests'),
  },
  {
    id: crypto.randomUUID(),
    path: '/react-query-dependent-queries',
    text: (
      <>
        <abbr title="Rect Query">R.Q</abbr> 종속 쿼리 요청
      </>
    ),
    lazy: () => import('@/routes/RQDependentQueries'),
  },
  {
    id: crypto.randomUUID(),
    path: '/react-query-parallel-queries',
    text: (
      <>
        <abbr title="Rect Query">R.Q</abbr> 병렬 쿼리 요청
      </>
    ),
    lazy: () => import('@/routes/RQParallelQueries'),
  },
  {
    id: crypto.randomUUID(),
    path: '/react-query-prefetch',
    text: (
      <>
        <abbr title="Rect Query">R.Q</abbr> 프리패치
      </>
    ),
    lazy: () => import('@/routes/RQPrefetch'),
  },
  {
    id: crypto.randomUUID(),
    path: '/react-query-pagination',
    text: (
      <>
        <abbr title="Rect Query">R.Q</abbr> 페이지네이션
      </>
    ),
    lazy: () => import('@/routes/RQPagination'),
  },
  {
    id: crypto.randomUUID(),
    path: '/react-query-inifite-queries',
    text: (
      <>
        <abbr title="Rect Query">R.Q</abbr> 인피니트 쿼리
      </>
    ),
    lazy: () => import('@/routes/RQInfiniteQueries'),
  },
  {
    id: crypto.randomUUID(),
    path: '/react-query-managing-mutations',
    text: (
      <>
        <abbr title="Rect Query">R.Q</abbr> 뮤테이션 관리
      </>
    ),
    lazy: () => import('@/routes/RQManagingMutations'),
  },
  {
    id: crypto.randomUUID(),
    path: '/react-query-optimistic-update',
    text: (
      <>
        <abbr title="Rect Query">R.Q</abbr> 옵티미스틱 업데이트
      </>
    ),
    lazy: () => import('@/routes/RQOptimisticUpdate'),
  },
];

const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: navigationItems.map(({ ...routeObject }) => {
      delete routeObject.text;
      return routeObject as RouteObject;
    }),
  },
];

const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL,
});

export default router;
