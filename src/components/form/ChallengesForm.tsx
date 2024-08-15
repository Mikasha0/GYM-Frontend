import { createChallengesSchema } from "@/types/z.schema.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CiImageOn } from "react-icons/ci";
import { z } from "zod";
import InputForm from "../ui/inputForm";
import TextareaForm from "../ui/textareaForm";
import SelectInput from "../ui/selectInput";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function ChallengesForm({
  updateSetShow,
}: {
  updateSetShow: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const queryClient = useQueryClient();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof createChallengesSchema>>({
    resolver: zodResolver(createChallengesSchema),
    mode: "onChange",
  });
  const createChallenge = async (
    data: z.infer<typeof createChallengesSchema>
  ) => {
    const challengesData = data;
    try {
      const response = await fetch("https://haster-gym-server.onrender.com/challenges", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(challengesData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      await response.json();
      queryClient.invalidateQueries({ queryKey: ["challenges"] });
      toast.success("Challenge added successfully!");
       updateSetShow(false);
      reset();
    } catch (error) {
      console.error("Error adding challenge:", error);
    }
  };
  return (
    <form onSubmit={handleSubmit(createChallenge)}>
      <div className="mb-2">
        <InputForm
          labelName="Name"
          inputType="text"
          register={register}
          name="name"
          errors={errors}
        />
        <SelectInput
          labelName="Subscription"
          errors={errors}
          register={register}
          name="gender"
          options={["Inclusive", "Male", "Female", "Other"]}
        />
        <TextareaForm
          labelName="Description"
          register={register}
          name="description"
          errors={errors}
        />
      </div>

      <div className="flex justify-end mt-4">
        <button
          type="submit"
          className="px-3 py-1 bg-[#FF0000] text-white rounded-md text-xs mr-2 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => updateSetShow(false)}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-3 py-1 bg-[#1400FF] text-white rounded-md text-xs disabled:cursor-not-allowed disabled:opacity-50"
        >
          Add Item
        </button>
      </div>
    </form>
  );
}
