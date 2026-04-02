import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false); // ✅ loading state

  // handle input change
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  // handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // ✅ start loading

    try {
      const res = await fetch("https://labourease.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message);
        setLoading(false);
        return;
      }

      localStorage.setItem("user", JSON.stringify(result.user));

      alert("Login successful ✅");

      navigate("/");

    } catch (err) {
      console.log(err);
      alert("Server error ❌");
    } finally {
      setLoading(false); // ✅ stop loading
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">Login</h2>

        <form onSubmit={handleLogin}>
          
          {/* Email */}
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={data.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={data.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Forgot Password */}
          <div className="forgot-password">
            <Link to="/forgot-password" className="forgot-link">
              Forgot Password?
            </Link>
          </div>

          {/* Button */}
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </button>

        </form>

        {/* Register Link */}
        <p className="register-prompt">
          New user?{" "}
          <Link to="/register" className="link">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
