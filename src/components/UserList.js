import { useDrop } from "react-dnd";

const UserList = ({ users, onAssign }) => {
  return (
    <div>
      <h3>Users</h3>
      {users.map(user => {
        const [, dropRef] = useDrop(() => ({
          accept: "TASK",
          drop: (item) => {
            onAssign(item.id, user.id);
          }
        }));
        return (
          <div key={user.id} ref={dropRef} className="user-card">
            {user.username}
          </div>
        );
      })}
    </div>
  );
};

export default UserList;
