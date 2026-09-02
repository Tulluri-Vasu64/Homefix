
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    setMessage("");

    // Check empty fields
    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setMessage("Please fill all fields.");
      return;
    }

    // Check password
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    // Check password length
    if (password.length < 6) {
      setMessage(
        "Password must be at least 6 characters."
      );
      return;
    }

    try {
      // Check existing user
      const response = await api.get(
        `/users?email=${email}`
      );

      if (response.data.length > 0) {
        setMessage("Email already registered.");
        return;
      }

      // Create new user
      const newUser = {
        name: name,
        email: email,
        password: password,
        role: "user"
      };

      await api.post("/users", newUser);

      setMessage("Registration successful!");

      // Clear form
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      // Go to login
      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (error) {
      console.log(error);
      setMessage("Registration failed.");
    }
  };

  return (
    <section className="auth-page">

      <div className="auth-card">

        <h1>User Registration</h1>

        <form onSubmit={handleRegister}>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
          />

          <button type="submit">
            Register
          </button>

        </form>

        {message && (
          <p className="error">
            {message}
          </p>
        )}

        <p>
          Already have an account?
          <Link to="/login">
            {" "}Login
          </Link>
        </p>

        {/* <p>
          Admin?
          <Link to="/admin/register">
            {" "}Admin Register
          </Link>
        </p> */}

      </div>

    </section>
  );
}

export default Register;

