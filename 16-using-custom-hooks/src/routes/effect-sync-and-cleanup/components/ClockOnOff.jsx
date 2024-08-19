import { useEffect, useState } from 'react';
import { bool, func } from 'prop-types';
import S from './ClockOnOff.module.css';
import useDocumentTitle from '@/hooks/useDocumentTitle';

ClockOnOff.propTypes = {
  isOn: bool,
  onToggle: func,
};

function ClockOnOff({ isOn = false, onToggle }) {
  const documentTitle = '시계 ON/OFF ← 이펙트 동기화 & 정리';

  useDocumentTitle(documentTitle);

  const buttonLabel = isOn ? 'OFF' : 'ON';
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const clearId = setInterval(() => {
      const nextTime = new Date();
      setTime(nextTime);
    }, 1000);

    return () => {
      clearInterval(clearId);
    };
  }, []);

  return (
    <div className={S.component}>
      <button type="button" lang="en" onClick={onToggle}>
        CLOCK {buttonLabel}
      </button>
      <output hidden={!isOn}>{time.toLocaleTimeString()}</output>
    </div>
  );
}

export default ClockOnOff;
