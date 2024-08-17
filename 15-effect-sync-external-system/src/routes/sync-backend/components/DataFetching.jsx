/* eslint-disable react/no-unescaped-entities */

import { useEffect, useState } from 'react';
import S from './DataFetching.module.css';
import { exact, string } from 'prop-types';

const ENDPOINT = '//yamoo9.pockethost.io/api/collections/olive_oil/records';

function DataFetching() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  // 마운트 -> 언마운트 -> 리-마운트
  // 중복된 네트워크 요청 중단
  // 네트워크 요청 1회 성공 시
  // 상태 업데이트 1회 진행
  useEffect(() => {
    const abortController = new AbortController();

    setIsLoading(true);

    const fetchOliveOil = async () => {
      try {
        const response = await fetch(ENDPOINT, {
          signal: abortController.signal,
        });

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setData(responseData);
        setIsLoading(false);
      } catch (error) {
        // 중복된 요청 취소를 오류로 보지 않음
        // 그 이외의 오류가 발생한 경우 오류로 봄
        if (!(error instanceof DOMException)) {
          setError(error);
          setIsLoading(false);
        }
      }
    };

    fetchOliveOil();

    // 클린업 함수
    // 마운트(이펙트 콜백 실행) -> 언마운트(클린업 실행) -> 리-마운트(이펙트 콜백 실행)
    return () => {
      // AbortController 인스턴스(객체)의
      // abort() 메서드를 사용해 이전 요청을 중단
      abortController.abort();
    };
  }, []);

  if (isLoading) {
    console.log('isLoading');

    return <LoadingMessage />;
  }

  if (error) {
    return <PrintError error={error} />;
  }

  return (
    <div className={S.component}>
      <ul>
        {data?.items.map?.((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function LoadingMessage() {
  return <p>데이터 로딩 중...</p>;
}

PrintError.propTypes = {
  error: exact({
    message: string.isRequired,
  }).isRequired,
};

function PrintError({ error }) {
  return (
    <p role="alert">
      오류 발생!{' '}
      <span style={{ fontWeight: 500, color: 'red' }}>"{error.message}"</span>
    </p>
  );
}

export default DataFetching;
