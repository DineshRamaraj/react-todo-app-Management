import { useState, useEffect } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { useAuth } from "../contexts/AuthContext";
import { getTasks, saveTasks, getUsers } from "../utils/storage";

const AdminDashboard = () => {
  const { logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState("");
  const users = getUsers().filter((u) => u.role === "user");

  useEffect(() => {
    setTasks(getTasks());
  }, []);

  const handleTaskAdded = () => {
    setTasks(getTasks());
    setMessage("Task added successfully!");
    setTimeout(() => setMessage(""), 3000);
  };

  const assignTask = (taskId, userId) => {
    const taskIndex = tasks.findIndex((t) => t.id === taskId);
    if (taskIndex !== -1) {
      const updatedTasks = [...tasks];
      updatedTasks[taskIndex] = {
        ...updatedTasks[taskIndex],
        assigneeId: userId,
        status: "pending",
      };
      saveTasks(updatedTasks);
      setTasks(getTasks());
      const user = users.find((u) => u.id === userId);
      setMessage(`Task assigned to ${user.username} successfully!`);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const reorderTasks = (fromIndex, toIndex) => {
    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(fromIndex, 1);
    updatedTasks.splice(toIndex, 0, movedTask);
    saveTasks(updatedTasks);
    setTasks(updatedTasks);
  };

  const handleStatusChange = (taskId, newStatus) => {
    const taskIndex = tasks.findIndex((t) => t.id === taskId);
    if (taskIndex !== -1) {
      const updatedTasks = [...tasks];
      updatedTasks[taskIndex] = {
        ...updatedTasks[taskIndex],
        status: newStatus,
      };
      saveTasks(updatedTasks);
      setTasks(updatedTasks);
    }
  };

  console.log("tasks: ", tasks);

  return (
    <>
      <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
        <h1>Admin Dashboard</h1>
        <button onClick={logout}>Logout</button>
      </div>
      <TaskForm onTaskAdded={handleTaskAdded} />
      {message && <div className="success-message">{message}</div>}
      <div className="admin-panels">
        <TaskList
          tasks={tasks}
          users={users}
          onAssign={assignTask}
          onReorder={reorderTasks}
          onStatusChange={handleStatusChange}
        />
      </div>
    </>
  );
};

export default AdminDashboard;
