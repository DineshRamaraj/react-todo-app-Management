import { useState, useEffect } from "react";
import { getTasks, saveTasks } from "../utils/storage";
import { useAuth } from "../contexts/AuthContext";

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setTasks(getTasks().filter((t) => t.assigneeId === user.id));
  }, [user.id]);

  const handleStatusChange = (id, newStatus) => {
    const allTasks = getTasks();
    const updated = allTasks.map((t) =>
      t.id === id ? { ...t, status: newStatus } : t
    );
    saveTasks(updated);
    setTasks(updated.filter((t) => t.assigneeId === user.id));
    setMessage(`Task ${newStatus.toLowerCase()} successfully!`);
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>User Dashboard</h1>
        <button onClick={logout}>Logout</button>
      </div>
      {message && <div className="success-message">{message}</div>}

      {tasks.map((task) => (
        <div key={task.id} className={`user-task ${task.status === "Completed" ? "completed" : ""}`}>
          <label>
            <input
              type="checkbox"
              checked={task.status === "Completed"}
              disabled={task.status === "Completed"}
              onChange={(e) => handleStatusChange(task.id, e.target.checked ? "Completed" : "Pending")}
            />
            {task.title} - {task.status}
          </label>
        </div>
      ))}
    </>
  );
};

export default UserDashboard;
