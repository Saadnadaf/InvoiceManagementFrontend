import React from "react";
import { useState } from "react";
import AuthLayout from "./AuthLayout";
import api from "../lib/api";
import PasswordInput from "./PasswordInput";
import { useSearchParams , useNavigate} from "react-router-dom";

const ResetPassword = ({ onSwitchToLogin }) => {
  const [searchparams] = useSearchParams();
  const token = searchparams.get("token");

  const [newpassword, setNewPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setError();
    setMessage();

    if (!token) {
      setError("Invalid or missing token");
      return;
    }

    if (newpassword !== confirmpassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/auth/reset-password", {
        token,
        newpassword,
      });

      if (response.status === 200) {
        setMessage("Password has been reset successfully");
        setTimeout(() => onSwitchToLogin(), 1500);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Reset Your Password"
      subtitle="Enter a new password."
      footerText="Remembered your password?"
      footerLinkText="Login"
      footerAction="/login"
    >
      <form onSubmit={handleReset} className="space-y-4">

        <PasswordInput
          name="newPassword"
          value={newpassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Password"
        />

        <PasswordInput
          name="confirmPassword"
          value={confirmpassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          {loading ? "Resetting..." : "Reset password"}
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

export default ResetPassword;
