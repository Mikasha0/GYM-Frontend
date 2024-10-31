"use client";
import { useTheme } from "@/context/ThemeContext";
import React from "react";

export default function MemberPlaceholder() {
  const { themeClasses } = useTheme();
  return (
    <div
      className={`w-full ${themeClasses.card} border p-3 border-gray-200 h-[245px] flex items-center justify-center  rounded-lg shadow-md hover:shadow-xl`}
    >
      <h1 className=" text-sm text-[#7C7C7C]">No active users</h1>
    </div>
  );
}
