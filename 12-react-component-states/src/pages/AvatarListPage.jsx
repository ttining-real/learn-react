import Avatar from '@/components/Avatar';
import { STATUS } from '@/constants/STATUS';

function AvatarListPage() {
  return (
    <ul className="AvatarList">
      <li>
        <Avatar name="야무" photo="man-02.jpg" status={STATUS.online} />
      </li>
      <li>
        <Avatar name="범쌤" photo="man-04.jpg" status={STATUS.away} />
      </li>
      <li>
        <Avatar name="주원" photo="woman-04.jpg" status={STATUS.dontDisturb} />
      </li>
      <li>
        <Avatar name="정민" photo="woman-01.jpg" />
      </li>
    </ul>
  );
}

export default AvatarListPage;
