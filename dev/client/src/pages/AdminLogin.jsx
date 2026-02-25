import { useState } from "react";
import { login } from "../api";

export default function AdminLogin({ onLogin }) {
  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const data = await login(form);

      localStorage.setItem("token", data.token);
      onLogin(data.token);
    } catch (err) {
      alert("Login failed");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Band Admin Login</h2>
      <input
        placeholder="Username"
        value={form.username}
        onChange={e => setForm({ ...form, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
      />
      <button type="submit">Login</button>
    </form>
  );
}