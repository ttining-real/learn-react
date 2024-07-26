import { createElement as h } from 'https://esm.sh/react';

/* 
  <firgure aria-label="이름 (상태)">
    <img src="face.jpg" alt="이름" />
    <figcaption>
      <img />
    </figcaption>
  </firgure>
*/

/* 
  props: { 
    name: '사용자 이름',
    photo: '이미지 파일 이름',
    status?: 'online' | 'offline' | 'dont-disturb' | 'away',
    size?: 숫자 값
  }
*/
function Avatar({ name, photo, status = 'offline', size = 64 }) {
  return h(
    'figure',
    {
      className: 'Avatar',
      'aria-label': `${name} (상태)`,
    },
    h('img', {
      src: `/faces/${photo}`,
      alt: name,
      width: size,
      height: size,
    }),
    h(
      'figcaption',
      null,
      h('img', {
        src: '/icons/status-offline.svg',
        alt: '',
      })
    )
  );
}

export default Avatar;
