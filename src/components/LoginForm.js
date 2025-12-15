import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getUsers } from "../utils/storage";
import { useState } from "react";

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Please Full the Required Fields...");
      return;
    }
    const users = getUsers();
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) return alert("Invalid credentials");

    login(user);
    navigate(user.role === "admin" ? "/admin" : "/user");
  };

  return (
    <div
      style={{
        height: "90vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "40px",
            border: "1px solid grey",
          }}
        >
          <input
            onChange={(e) => setUsername(e.target.value)}
            placeholder="User Name"
            style={{ width: "300px", padding: "8px", marginBottom: "10px" }}
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            style={{ width: "300px", padding: "8px", marginBottom: "10px" }}
          />
          <button
            style={{
              width: "150px",
              padding: "8px",
              marginBottom: "10px",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
