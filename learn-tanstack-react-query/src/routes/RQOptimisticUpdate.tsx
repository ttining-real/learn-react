// --------------------------------------------------------------------------
// ✅ React Query 옵티미스틱 업데이트 (Optimistic Update)
// --------------------------------------------------------------------------
// - [ ] 옵티미스틱 업데이트 (Optimistic Update)
// --------------------------------------------------------------------------

import { Helmet } from 'react-helmet-async';
import { BooksListOptimistic, MyBooksListOptimistic, SectionWithHeading } from '@/components';

// 리액트 개발 도구에 표시될 컴포넌트 이름
Component.displayName = 'RQOptimisticUpdate';

// 컴포넌트
export function Component(): JSX.Element {

  return (
    <>
      <Helmet>
        <title>옵티미스틱 업데이트 ← React Query 러닝 가이드</title>
      </Helmet>

      <SectionWithHeading title="React Query 옵티미스틱 업데이트 (Optimistic Update)">
        <div className="space-y-2">
          <p className="text-slate-950">
            React Query의 "옵티미스틱 업데이트" 개념에 대해 학습합니다.
          </p>
        </div>
      </SectionWithHeading>

      <div className="inline-flex flex-col gap-3 items-center my-5">
        <section className="flex flex-col justify-start items-center gap-1 border-4 border-yellow-950/20 p-2">
          <h2 className="text-sm text-yellow-950 font-semibold mb-1">
            북 페이지네이션
          </h2>
          {/* 북스 리스트: 옵티미스틱 업데이트 */}
          <BooksListOptimistic />
        </section>
        <section className="flex flex-col justify-start items-center gap-1 border-4 border-yellow-950/20 p-2">
          <h2 className="text-sm text-yellow-950 font-semibold mb-1">
            마이 북 리스트
          </h2>
          {/* 마이 북스 리스트: 옵티미스틱 업데이트 */}
          <MyBooksListOptimistic />
        </section>
      </div>
    </>
  );
}
