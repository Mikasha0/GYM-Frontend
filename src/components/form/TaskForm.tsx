import { createTaskSchema } from "@/types/z.schema.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputForm from "../ui/inputForm";
import SelectInput from "../ui/selectInput";
import TextareaForm from "../ui/textareaForm";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function TaskForm({updatePopup}:{updatePopup:React.Dispatch<React.SetStateAction<boolean>>}) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof createTaskSchema>>({
    resolver: zodResolver(createTaskSchema),
    mode: "onChange",
  });

  const createTask = async (data: z.infer<typeof createTaskSchema>) => {
    const taskData = { ...data, status: "incomplete" };
    try {
      const response = await fetch("https://haster-gym-server.onrender.com/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      await response.json();
      queryClient.invalidateQueries({ queryKey: ["task"] });
      toast.success("Task created successfully");
      updatePopup(false)
      reset();
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(createTask)}>
      <div className="mb-4">
        <InputForm
          labelName="Task Name"
          inputType="text"
          register={register}
          name="taskName"
          errors={errors}
          required={true}
        />
        <SelectInput
          labelName="Priority"
          errors={errors}
          register={register}
          name="priority"
          options={["High", "Medium", "Low"]}
        />
        <TextareaForm
          labelName="Task Description"
          register={register}
          name="taskDescription"
          errors={errors}
          required={true}
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="font-light px-10 py-1 bg-black text-white rounded-lg text-sm mr-3 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Create Task
        </button>
      </div>
    </form>
  );
}
