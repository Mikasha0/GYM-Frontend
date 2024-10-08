"use client";
import { useState } from "react";
import DisplayTask from "./DisplayTask";
import Legend from "./Legend";
import TaskForm from "./form/TaskForm";

const TaskPage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="h-full">
      <div className="flex justify-between">
        <h1 className="text-sm font-semibold">Today's Task</h1>
        <button onClick={togglePopup} className="text-xl text-gray-400">
          +
        </button>
      </div>
      <DisplayTask />
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-white p-5 rounded shadow-lg">
            <button
              onClick={togglePopup}
              className="text-gray-400 text-xl mb-4"
            >
              &times;
            </button>
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
