import { useState } from "react";
import { Link } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import InputField from "../components/AuthForm/InputField";
import AuthButton from "../components/AuthForm/AuthButton";

import "../styles/auth.css";
import "../styles/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    alert("Login Successful (Frontend Only)");
  };

  return (
    <AuthLayout>
      <div className="auth-container login-page">
        <div className="auth-card card shadow">
          <h2 className="text-center auth-title mb-4">
            Welcome Back
          </h2>

          <form onSubmit={handleLogin}>
            <InputField
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <InputField
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="d-flex justify-content-between mb-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="rememberMe"
                />
                <label
                  className="form-check-label"
                  htmlFor="rememberMe"
                >
                  Remember Me
                </label>
              </div>

              <Link to="#">Forgot Password?</Link>
            </div>

            <AuthButton text="Login" />
          </form>

          <p className="text-center mt-3">
            Don't have an account?
            <Link to="/register"> Register</Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}

export default Login;