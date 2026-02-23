import { useState } from "react";
import { login } from "../api";

export default function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const token = await login(username, password);
      localStorage.setItem("token", token);
      onLogin(token);
    } catch (err) {
      alert("Login failed");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Band Admin Login</h2>
      <input
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}