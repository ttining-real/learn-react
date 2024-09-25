// --------------------------------------------------------------------------
// ✅ React Query 뮤테이션 관리 (Managing Mutations)
// --------------------------------------------------------------------------
// - [ ] 뮤테이션 관리 (Managing Mutations)
//   - 쿼리(query) 요건
//     - 컴포넌트 마운트 즉시 실행
//     - 여러 번 실행 가능
//     - 다른 쿼리 호출 가능
//     - 쿼리 자체 실행 대신, 쿼리 라이프 사이클 관리
//     - 쿼리 라이프 사이클 관리: data, state 등 반환
//     - 참고: https://bit.ly/4e6xeaM
//   - 뮤테이션(mutation) 요건
//     - 사용자 액션에 의해 실행
//     - 뮤테이션 자체 실행 대신, 뮤테이션 라이프 사이클 관리
//     - 뮤테이션 라이프 사이클 관리: mutate, state 등 반환
//     - 참고: https://bit.ly/4ea0VI6
//     - 뮤테이션 이후, 캐시(cache) 업데이트: queryClient.setQueryData()
//     - 참고: https://bit.ly/3XuOU93
//     - 뮤테이션 이후, 캐시 데이터 무효화: queryClient.invalidateQueries()
//       - 서버 상태 변경 후, 캐시에 최신 데이터가 있는지 확인 권장
//       - 모든 활성 쿼리 다시 가져오기
//       - 나머지 쿼리 오래된 것으로 표시
//     - 참고: https://bit.ly/4d8LdvD
// --------------------------------------------------------------------------

import { Helmet } from 'react-helmet-async';
import { BooksList, MyBooksList, SectionWithHeading } from '@/components';

// 리액트 개발 도구에 표시될 컴포넌트 이름
Component.displayName = 'RQManagingMutations';

// 컴포넌트
export function Component(): JSX.Element {

  return (
    <>
      <Helmet>
        <title>뮤테이션 관리 ← React Query 러닝 가이드</title>
      </Helmet>

      <SectionWithHeading title="React Query 뮤테이션 관리 (Managing Mutations)">
        <div className="space-y-2">
          <p className="text-slate-950">
            React Query의 "뮤테이션 관리" 개념에 대해 학습합니다.
          </p>
        </div>
      </SectionWithHeading>

      <div className="inline-flex flex-col gap-3 items-center my-5">
        <section className="flex flex-col justify-start items-center gap-1 border-4 border-yellow-950/20 p-2">
          <h2 className="text-sm text-yellow-950 font-semibold mb-1">
            북 페이지네이션
          </h2>
          {/* 북스 리스트 */}
          <BooksList />
        </section>
        <section className="flex flex-col justify-start items-center gap-1 border-4 border-yellow-950/20 p-2">
          <h2 className="text-sm text-yellow-950 font-semibold mb-1">
            마이 북 리스트
          </h2>
          {/* 마이 북스 리스트 */}
          <MyBooksList />
        </section>
      </div>
    </>
  );
}
