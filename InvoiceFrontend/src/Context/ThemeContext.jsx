import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const storedTheme = localStorage.getItem("theme");

  const [isDarkMode, setIsDarkMode] = useState(
    storedTheme ? storedTheme === "dark" : false
  );

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
