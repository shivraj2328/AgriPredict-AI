import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import InputField from "../components/AuthForm/InputField";
import AuthButton from "../components/AuthForm/AuthButton";

import { registerUser } from "../services/authService";

import "../styles/auth.css";
import "../styles/register.css";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        // Frontend validation
        if (!name || !email || !password || !confirmPassword) {
            alert("Please fill all fields");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            // Send registration request to backend
            const result = await registerUser({
                name,
                email,
                password
            });

            alert(result.message || "Registration successful");

            navigate("/login");

        } catch (error) {
            alert(error.message || "Registration failed");
        }
    };

    return (
        <AuthLayout>

            <div className="auth-container register-page">

                <div className="auth-card card shadow">

                    <h2 className="text-center auth-title mb-4">
                        Create Account
                    </h2>

                    <form onSubmit={handleRegister}>

                        <InputField
                            label="Full Name"
                            type="text"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

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

                        <InputField
                            label="Confirm Password"
                            type="password"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
                        />

                        <AuthButton text="Create Account" />

                    </form>

                    <p className="text-center mt-3">
                        Already have an account?
                        <Link to="/login"> Login</Link>
                    </p>

                </div>

            </div>

        </AuthLayout>
    );
}

export default Register;