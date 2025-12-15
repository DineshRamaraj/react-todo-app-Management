import TaskItem from "./TaskItem";

const TaskList = ({ tasks, users, onAssign, onReorder, onStatusChange }) => {
  return (
    <div>
      <h3>All Tasks</h3>
      {tasks.map((task, index) => (
        <TaskItem key={task.id} task={task} users={users} onAssign={onAssign} onReorder={onReorder} index={index} onStatusChange={onStatusChange} />
      ))}
    </div>
  );
};

export default TaskList;
