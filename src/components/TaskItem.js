import { useDrag, useDrop } from "react-dnd";

const TaskItem = ({
  task,
  users,
  onAssign,
  onReorder,
  index,
  onStatusChange,
}) => {
  const assignee =
    users.find((u) => u.id === task.assigneeId)?.username || "Unassigned";
  const availableUsers = users.filter((u) => u.id !== task.assigneeId);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "SORT_TASK",
    item: { id: task.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: "SORT_TASK",
    hover: (item) => {
      if (item.index !== index) {
        onReorder(item.index, index);
        item.index = index; // update the dragged item's index
      }
    },
  }));

  return (
    <div
      ref={(node) => drag(drop(node))}
      className="task task-item"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div>
        {task.title} ({task.status}) - {assignee}
      </div>
      <div className="user-task-status">
        <select
          onChange={(e) => onAssign(task.id, e.target.value)}
          defaultValue=""
          style={{marginRight: "10px"}}
        >
          {availableUsers.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
    </div>
  );
};

export default TaskItem;
