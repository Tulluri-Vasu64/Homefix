import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../services/api";

import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.get(
        `/users?email=${email}&password=${password}`
      );

      if (response.data.length === 0) {
        setMessage("Invalid email or password.");
        return;
      }

      const user = response.data[0];

      localStorage.setItem(
        "userToken",
        "user-" + user.id
      );

      localStorage.setItem(
        "homefixUser",
        JSON.stringify(user)
      );

      navigate("/");
    } catch (error) {
      console.log(error);
      setMessage("Login failed.");
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h1>User Login</h1>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button type="submit">
            Login
          </button>
        </form>

        {message && <p className="error">{message}</p>}

        <p>
          Don't have an account?
          <Link to="/register"> Register</Link>
        </p>

        <p>
          Admin?
          <Link to="/admin/login"> Admin Login</Link>
        </p>
      </div>
    </section>
  );
}

export default Login;