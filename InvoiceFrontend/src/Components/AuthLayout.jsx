import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AuthLayout = ({
  title,
  subtitle,
  children,
  footerText,
  footerLinkText,
  footerAction,
}) => {
  return (
    <div className="h-screen w-full bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-600 flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-20 left-10 w-72 h-72 bg-white/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-300/20 rounded-full blur-3xl"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-2">
          {title}
        </h2>

        {subtitle && (
          <p className="text-center text-gray-500 mb-8">{subtitle}</p>
        )}

        <div>{children}</div>

        {footerText && (
          <p className="text-sm text-center mt-6 text-gray-600">
            {footerText}{" "}
            <Link
              to={footerAction}
              className="text-cyan-600 hover:underline font-medium"
            >
              {footerLinkText}
            </Link>
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default AuthLayout;
