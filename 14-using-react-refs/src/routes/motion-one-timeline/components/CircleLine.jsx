/* eslint-disable react/prop-types */
import { forwardRef } from 'react';
import S from './CircleLine.module.css';

function CircleLine({ strokeColor = '#4729B4', strokeWidth = 6 }, ref) {
  return (
    <svg
      ref={ref}
      className={S.component}
      width={212}
      height={41}
      viewBox="0 0 210 41"
      fill="none"
    >
      <circle
        cx="20.5"
        cy="20.5"
        r="17.5"
        stroke={strokeColor}
        strokeDasharray={1}
        strokeDashoffset={0}
        strokeWidth={strokeWidth}
        pathLength={1}
      />
      <line
        x1={36}
        y1={20}
        x2={173}
        y2={20}
        stroke={strokeColor}
        strokeDasharray={1}
        strokeDashoffset={0}
        strokeWidth={strokeWidth}
        pathLength={1}
      />
      <circle
        cx="189.5"
        cy="20.5"
        r="17.5"
        stroke={strokeColor}
        strokeDasharray={1}
        strokeDashoffset={0}
        strokeWidth={strokeWidth}
        pathLength={1}
        style={{ transform: 'rotateX(180deg) rotateY(180deg)' }}
      />
    </svg>
  );
}

export default forwardRef(CircleLine);
