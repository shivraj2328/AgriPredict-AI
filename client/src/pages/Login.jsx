import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import InputField from "../components/AuthForm/InputField";
import AuthButton from "../components/AuthForm/AuthButton";

import { loginUser } from "../services/authService";

import "../styles/auth.css";
import "../styles/login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        // Frontend validation
        if (!email || !password) {
            alert("Please fill all fields");
            return;
        }

        try {
            // Send login request to backend
            const result = await loginUser({
                email,
                password
            });

            // Store JWT
            localStorage.setItem("token", result.token);

            // Store user information
            localStorage.setItem(
                "user",
                JSON.stringify(result.user)
            );

            alert(result.message || "Login successful");

            navigate("/dashboard");

        } catch (error) {
            alert(error.message || "Login failed");
        }
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
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                        />

                        <InputField
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
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

                            <Link to="#">
                                Forgot Password?
                            </Link>

                        </div>

                        <AuthButton text="Login" />

                    </form>

                    <p className="text-center mt-3">
                        Don't have an account?
                        <Link to="/register">
                            {" "}Register
                        </Link>
                    </p>

                </div>

            </div>

        </AuthLayout>
    );
}

export default Login;