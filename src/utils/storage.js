export const initData = () => {
  if (!localStorage.getItem("users")) {
    localStorage.setItem(
      "users",
      JSON.stringify([
        { id: 1, username: "admin", password: "admin123", role: "admin" },
        { id: 2, username: "user1", password: "user123", role: "user" },
        { id: 3, username: "user2", password: "user123", role: "user" }
      ])
    );
  }
};

export const getUsers = () =>
  JSON.parse(localStorage.getItem("users")) || [];

export const saveTasks = (tasks) =>
  localStorage.setItem("tasks", JSON.stringify(tasks));


export const getTasks = () => {
  const storedTasks = localStorage.getItem("tasks");
  const tasks = storedTasks ? JSON.parse(storedTasks) : [];
  return tasks.filter(task => task && typeof task === 'object' && task.id);
};
