import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/Login.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      email === "admin@homefix.com" &&
      password === "admin123"
    ) {
      const admin = {
        name: "HomeFix Admin",
        email: email
      };

      localStorage.setItem(
        "adminToken",
        "admin-token"
      );

      localStorage.setItem(
        "homefixAdmin",
        JSON.stringify(admin)
      );

      navigate("/admin/dashboard");
    } else {
      alert("Invalid admin credentials.");
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h1>Admin Login</h1>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Admin Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button type="submit">
            Admin Login
          </button>
        </form>

        <p className="admin-demo">
          Demo Email: admin@homefix.com
          <br />
          Demo Password: admin123
        </p>
      </div>
    </section>
  );
}

export default AdminLogin;