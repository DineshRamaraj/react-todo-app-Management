import { useState } from "react";
import { v4 as uuid } from "uuid";
import { getTasks, saveTasks, getUsers } from "../utils/storage";

const TaskForm = ({ onTaskAdded }) => {
  const users = getUsers().filter((u) => u.role === "user");
  const [title, setTitle] = useState("");
  const [assignee, setAssignee] = useState(users[0]?.id);

  const createTask = () => {
    const tasks = getTasks();
    tasks.push({
      id: uuid(),
      title,
      assigneeId: assignee,
      status: "Pending",
    });
    saveTasks(tasks);
    setTitle("");
    if (onTaskAdded) onTaskAdded();
  };

  return (
    <div>
      <h3>Create Task</h3>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter your Task"
        style={{ marginRight: "5px", height: "25px" }}
      />
      <select
        onChange={(e) => setAssignee(Number(e.target.value))}
        style={{ marginRight: "5px", height: "30px" }}
      >
        {users.map((u) => (
          <option key={u.id} value={u.id}>
            {u.username}
          </option>
        ))}
      </select>
      <button
        onClick={createTask}
        style={{
          marginRight: "5px",
          height: "30px",
          width: "100px",
          cursor: "pointer",
        }}
      >
        Add
      </button>
    </div>
  );
};

export default TaskForm;
