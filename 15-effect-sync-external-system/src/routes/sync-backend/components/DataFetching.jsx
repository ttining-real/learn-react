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
    setIsLoading(true);

    const fetchOliveOil = async () => {
      const response = await fetch(ENDPOINT + '/mklarbpzc1jxvss');
      const responseData = await response.json();

      if (response.ok) {
        setData(responseData);
      } else {
        setError(responseData);
      }

      setIsLoading(false);
    };

    fetchOliveOil();
  }, []);

  if (isLoading) {
    return <LoadingMessage />;
  }

  if (error) {
    return <PrintError error={error} />;
  }

  if (data) {
    console.log(data?.items?.length);
  }

  return (
    <div className={S.component}>
      <p>서버에 데이터 가져오기 요청 후, 앱 화면 업데이트</p>
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
