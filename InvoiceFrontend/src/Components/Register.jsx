import React from "react";
import { useState } from "react";
import api from "../lib/api";
import PasswordInput from "./PasswordInput";
import AuthLayout from "./AuthLayout";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Password do not match");
      return;
    }

    try {
      const response = await api.post("/auth/register", {
        username,
        email,
        password,
      });

      if (response.status === 200 || response.status === 201) {
        setSuccess("Registration successful ! You can now log in");
        setTimeout(() => onSwitchToLogin(), 1500);
      }
    } catch (err) {
      console.error(err);
      setError("Registration failed . Try again with different credentials");
    }
  };
  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join us and start managing invoices efficiently"
      footerText="Already have an account?"
      footerLinkText="Login"
      footerAction="/login"
    >
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition"
          required
        />

        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <PasswordInput
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
        />

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {success && (
          <p className="text-green-500 text-sm text-center">{success}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Register
        </button>
      </form>
    </AuthLayout>
  );
};

export default Register;
