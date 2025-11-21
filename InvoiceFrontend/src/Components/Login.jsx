import React from "react";
import { useState } from "react";
import api from "../lib/api";
import { useNavigate } from "react-router-dom";
import PasswordInput from "./PasswordInput";
import { motion } from "framer-motion";
import AuthLayout from "./AuthLayout";

const Login = ({ onLoginSuccess }) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const start = Date.now();
  const elapsed = Date.now() - start;
  const remaining = 2000 - elapsed;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/Auth/login", {
        usernameOrEmail,
        password,
      });

      const token = response.data.token;
      localStorage.setItem("token", token);

      setTimeout(
        () => {
          setLoading(false);
          onLoginSuccess();
        },
        remaining > 0 ? remaining : 0
      );
    } catch (err) {
      console.error(err);

      setTimeout(
        () => {
          setLoading(false);
          setError("Login failed. Please check your credentials.");
        },
        remaining > 0 ? remaining : 0
      );
    }
  };
  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Login"
      // footerText="Don’t have an account?"
      // footerLinkText="Register"
      // footerAction="/register"
    >
      <form onSubmit={handleLogin} className="space-y-5">
        <input
          type="text"
          placeholder="Username or Email"
          value={usernameOrEmail}
          onChange={(e) => setUsernameOrEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition"
          required
        />
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 text-sm text-center"
          >
            {error}
          </motion.p>
        )}
        {/* 
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="w-full bg-gradient-to-r from-teal-500 to-blue-500 text-white font-semibold py-2 rounded-md shadow-md hover:shadow-lg transition-all"
        >
          Login
        </motion.button> */}

        <motion.button
          whileHover={!loading && { scale: 1.03 }}
          whileTap={!loading && { scale: 0.97 }}
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center items-center gap-2 
    ${
      loading
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-gradient-to-r from-teal-500 to-blue-500"
    } 
    text-white font-semibold py-2 rounded-md shadow-md hover:shadow-lg transition-all`}
        >
          {loading ? (
            <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
          ) : (
            "Login"
          )}
        </motion.button>

        <p
          onClick={() => navigate("/forgot-password")}
          className="text-sm text-center text-blue-600 mt-3 cursor-pointer hover:underline"
        >
          Forgot password?
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;
