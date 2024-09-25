import { Helmet } from "react-helmet-async";
import { SectionWithHeading } from "@/components";

// 리액트 개발 도구에 표시될 컴포넌트 이름
Component.displayName = 'Home';

// 컴포넌트
export function Component(): JSX.Element {
  
  return (
    <>
      <Helmet>
        <title>React Query 러닝 가이드</title>
      </Helmet>
      
      <SectionWithHeading title="React 앱의 서버 상태 관리">
        <h3 className="text-xl text-red-700 font-semibold">리액트 라이브러리</h3>
        <div className="space-y-1">
          <p>리액트는 사용자 인터페이스 구축에 사용되는 라이브러리입니다.</p>
          <p>선언된 반응성 상태에 따라 화면을 업데이트 하는 부분만 React가 담당합니다.</p>
          <p>서버에 데이터를 요청하고, 응답을 처리하는 부분은 담당하지 않습니다.</p>
          <ul>
            <li>React</li>
            <li>React DOM</li>
          </ul>
        </div>
        <div className="space-y-1 mt-2">
          <h3 className="text-xl text-red-700 font-semibold">데이터 요청/응답</h3>
          <p>서버에 데이터를 요청/응답 처리하는 부분은 다른 도구가 담당합니다.</p>
          <p>자주 사용되는 클라이언트 측 데이터 요청/응답 도구는 다음과 같습니다.</p>
          <ul>
            <li>Fetch <abbr title="Application Programming Interface">API</abbr></li>
            <li>axios 라이브러리</li>
            <li>PocketBase <abbr title="Software Development Kit">SDK</abbr></li>
          </ul>
        </div>
        <div className="space-y-1 mt-2">
          <h3 className="text-xl text-red-700 font-semibold">서버 데이터 관리</h3>
          <p>서버에서 응답받은 데이터는 클라이언트 측에서 어떻게 관리해야 할까요?</p>
          <p>참고로 서버 데이터는 리액트도, 데이터 요청/응답 도구도 관리하지 않습니다.</p>
        </div>
      </SectionWithHeading>
    </>
  );
}