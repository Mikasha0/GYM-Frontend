"use client";
import { useState } from "react";
import DisplayTask from "./DisplayTask";
import Legend from "./Legend";
import TaskForm from "./form/TaskForm";
import { useTheme } from "@/context/ThemeContext";

const TaskPage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const {darkTheme} = useTheme()

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="h-full">
        <div className="flex justify-between">
          <h1 className={`text-sm font-semibold ${darkTheme?'text-white':'text-black'}`}>Today's Task</h1>
          <button onClick={togglePopup} className={`text-xl ${darkTheme?'text-white':'text-gray-400'}`}>
            +
          </button>
        </div>
        <DisplayTask />
        {isPopupOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
            <div className="bg-white p-5 rounded shadow-lg">
              <div className="flex  justify-between">
              <h1 className="font-semibold">Add Task</h1>

                <button
                  onClick={togglePopup}
                  className="text-gray-400 text-xl mb-4"
                >
                  &times;
                </button>
              </div>

              <TaskForm updatePopup={setIsPopupOpen} />
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-end p-1">
        <Legend />
      </div>
    </div>
  );
};

export default TaskPage;
