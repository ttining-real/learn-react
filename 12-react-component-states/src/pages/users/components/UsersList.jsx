import { UsersListType } from '@/@types/type.d';

UsersList.propTypes = {
  users: UsersListType.isRequired,
};

function UsersList({ users }) {
  console.log(users);

  return (
    <ul className="UsersList">
      {users.map((user) => (
        <li key={user.id}>
          {user.name} (<a href={`mailto:${user.email}`}>{user.email}</a>)
        </li>
      ))}
    </ul>
  );
}

export default UsersList;
