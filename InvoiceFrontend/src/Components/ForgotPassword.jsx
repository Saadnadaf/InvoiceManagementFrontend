import React from "react";
import axios from "axios";
import { useState } from "react";
import AuthLayout from "./AuthLayout";

const ForgotPassword = ({ onSwitchToLogin }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5123/api/auth/forgot-password",
        { email }
      );
      if (response.status === 200)
        setMessage("A password reset link has been sent to your mail inbox");
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthLayout
      title="Forgot Password?"
      subtitle="Enter your registered email address"
      footerText="Remembered password?"
      footerLinkText="Login"
      footerAction="/login"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          {loading ? "Sending..." : "Send reset link"}
        </button>

        {message && (
          <p className="text-green-600 text-center text-sm mt-2">{message}</p>
        )}
        {error && (
          <p className="text-red-600 text-center text-sm mt-2">{error}</p>
        )}

      </form>
    </AuthLayout>
  );
};

export default ForgotPassword;
