/* eslint-disable react/no-unescaped-entities */

import { useEffect, useState } from 'react';
import S from './DataFetching.module.css';
import { exact, string } from 'prop-types';

const ENDPOINT = '//yamoo9.pockethost.io/api/collections/olive_oil/records';

function DataFetching() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    // 지역 변수 설정
    // 무시(ignore)할 것인가?
    let ignore = false;

    setIsLoading(true);

    const fetchOliveOil = async () => {
      const response = await fetch(ENDPOINT);
      const responseData = await response.json();

      if (response.ok) {
        if (!ignore) {
          console.log('성공적으로 응답 받은 데이터를 상태로 업데이트');
          setData(responseData);
        }
      } else {
        setError(responseData);
      }

      setIsLoading(false);
    };

    fetchOliveOil();

    // 클린업 함수
    // 마운트(이펙트 콜백 실행) -> 언마운트(클린업 실행) -> 리-마운트(이펙트 콜백 실행)
    return () => {
      ignore = true;
    };
  }, []);

  if (isLoading) {
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
