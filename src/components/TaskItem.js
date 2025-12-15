import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

const TaskItem = ({
  task,
  users,
  onAssign,
  onReorder,
  index,
  onStatusChange,
}) => {
  const ref = useRef(null);
  const assignee =
    users.find((u) => u.id === task.assigneeId)?.username || "Unassigned";
  const availableUsers = users.filter((u) => u.id !== task.assigneeId);

  const [{ isDragging }, drag] = useDrag({
    type: "SORT_TASK",
    item: () => ({ id: task.id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "SORT_TASK",
    hover: (draggedItem, monitor) => {
      if (!ref.current) {
        return;
      }

      const dragIndex = draggedItem.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      onReorder(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      draggedItem.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className="task task-item"
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move"
      }}
    >
      <div>
        {task.title} ({task.status}) - {assignee}
      </div>
      <div className="user-task-status">
        <select
          key={task.assigneeId} // Forces re-render when assignee changes
          onChange={(e) => {
            if (e.target.value) {
              onAssign(task.id, e.target.value);
            }
          }}
          defaultValue=""
          style={{ marginRight: "10px", cursor: "pointer" }}
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
        >
          <option value="" disabled>
            Reassign to...
          </option>
          {availableUsers.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value)}
          style={{ cursor: "pointer" }}
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
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
