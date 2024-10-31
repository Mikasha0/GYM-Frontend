"use client";
import { useTheme } from "@/context/ThemeContext";
import React from "react";

export default function Settings() {
  const { darkTheme, toggleTheme, themeClasses } = useTheme();

  return (
    <div className={`w-full h-full p-5 ${themeClasses.background}`}>
      <div className={`w-full h-full p-3 rounded-2xl shadow-lg ${themeClasses.card}`}>
        <div className="p-4">
          <h1 className={`font-semibold ${themeClasses.text}`}>Settings</h1>
          <div className={`flex p-5 rounded-md justify-between mt-5 ${themeClasses.switchBg}`}>
            <p className={`text-sm font-semibold ${themeClasses.text}`}>
              Enable Dark Theme
            </p>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={darkTheme}
                className="sr-only peer"
                onChange={toggleTheme}
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
