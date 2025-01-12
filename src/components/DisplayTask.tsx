import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import Spinner from "./ui/spinner";

export interface Task {
  $id: string;
  taskName: string;
  taskDescription: string;
  priority: "High" | "Medium" | "Low";
  status: "complete" | "incomplete";
}

const fetchTaskData = async () => {
  // const response = await fetch("https://haster-gym-server.onrender.com/task");
  const response = await fetch("/api/tasks");
  const data = await response.json();
  console.log(data);
  return data;
};

const deleteTask = async (taskId: string) => {
  // const response = await fetch(`https://haster-gym-server.onrender.com/task/${taskId}`, {
  //   method: "DELETE",
  // });
  const response = await fetch(`/api/tasks/${taskId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete task");
  }

  return response.json();
};

const priorityClasses: Record<Task["priority"], string> = {
  High: "border-[#FC4B67]",
  Medium: "border-[#FEB621]",
  Low: "border-[#15C3FF]",
};

export default function DisplayTask() {
  const [tasksBeingDeleted, setTasksBeingDeleted] = useState<Set<string>>(
    new Set()
  );

  const {
    data: tasks,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["task"], queryFn: fetchTaskData });

  const queryClient = useQueryClient();

  const deleteTaskMutation = useMutation({
    mutationFn: (taskId: string) => deleteTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["task"] });
      setTasksBeingDeleted(new Set());
    },
    onError: () => {
      alert("Failed to delete task");
    },
  });

  const handleCheckboxChange = (taskId: string, isChecked: boolean) => {
    if (isChecked) {
      setTasksBeingDeleted((prev) => new Set(prev).add(taskId));
      setTimeout(() => deleteTaskMutation.mutate(taskId), 500);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full bg-gray-100 p-3 flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (isError || !tasks) {
    return <div>Error fetching task details</div>;
  }

  const incompleteTasks = tasks.filter(
    (task: Task) => task.status === "incomplete"
  );
  incompleteTasks.map((task: Task) => {
    console.log(task.$id);
  });

  return (
    <div className="mt-1">
      {tasks.length == 0 && (
        <div className="bg-[#F7F7F7] h-[60px] w-full rounded-lg flex items-center justify-center">
          <h2 className="text-sm text-center text-[#7C7C7C]">No task added</h2>
        </div>
      )}
      <AnimatePresence>
        {incompleteTasks.map((task: Task) => (
          <motion.div
            key={task.$id}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className={`w-full bg-gray-100 rounded-lg py-3 px-3 border-l-4 mb-2 ${
              priorityClasses[task.priority]
            }`}
          >
            <div className="flex justify-between">
              <h1 className="text-sm">{task.taskName}</h1>
              <input
                type="checkbox"
                checked={tasksBeingDeleted.has(task.$id)}
                onChange={(e) =>
                  handleCheckboxChange(task.$id, e.target.checked)
                }
              />
            </div>
            <p className="text-[10px] text-gray-500">{task.taskDescription}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
