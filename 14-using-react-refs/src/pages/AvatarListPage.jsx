import Avatar from '@/components/Avatar';
import { avatarsData } from '@/data/avatars';
import { useState } from 'react';

function AvatarListPage() {
  const [list] = useState(avatarsData);

  if (list.length === 0) {
    return <p style={{ fontSize: 24 }}>화면에 표시할 아바타가 없습니다. 😳</p>;
  }

  return (
    <ul
      className="AvatarList"
      style={{
        display: 'flex',
        flexFlow: 'column',
        gap: '100vh',
        marginBlock: '50vh',
      }}
    >
      {list.map((item) => (
        <li key={item.id}>
          <Avatar name={item.name} photo={item.photo} status={item.status} />
        </li>
      ))}
    </ul>
  );
}

export default AvatarListPage;
