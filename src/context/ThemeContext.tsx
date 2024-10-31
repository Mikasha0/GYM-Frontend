'use client'
import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext<any>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [darkTheme, setDarkTheme] = useState(false);

  const toggleTheme = () => setDarkTheme(!darkTheme);

  const themeClasses = {
    background: darkTheme ? "bg-[#353935]" : "bg-gray-100",
    card: darkTheme ? "bg-black" : "bg-white",
    text: darkTheme ? "text-white" : "text-black",
    switchBg: darkTheme ? "bg-black border-[0.4px] border-gray-500" : "bg-gray-100 border border-gray-300",
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
