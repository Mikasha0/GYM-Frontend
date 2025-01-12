'use client'
import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext<any>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [darkTheme, setDarkTheme] = useState(false);

  // Load the theme from localStorage on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setDarkTheme(storedTheme === "dark");
    }
  }, []);

  // Toggle the theme and store it in localStorage
  const toggleTheme = () => {
    const newTheme = !darkTheme;
    setDarkTheme(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  const themeClasses = {
    background: darkTheme ? "bg-[#353935]" : "bg-gray-100",
    card: darkTheme ? "bg-black" : "bg-white",
    text: darkTheme ? "text-white" : "text-black",
    switchBg: darkTheme
      ? "bg-black border-[0.4px] border-gray-500"
      : "bg-gray-100 border border-gray-300",
  };

  return (
    <ThemeContext.Provider value={{ darkTheme, toggleTheme, themeClasses }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
