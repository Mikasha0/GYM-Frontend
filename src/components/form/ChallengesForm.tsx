import { createChallengesSchema } from "@/types/z.schema.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import InputForm from "../ui/inputForm";
import SelectInput from "../ui/selectInput";
import TextareaForm from "../ui/textareaForm";

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
      const response = await fetch("/api/challenges", {
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
          className="w-[106px] px-4 py-2 bg-[#E94713] text-white rounded-sm text-xs mr-2 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => updateSetShow(false)}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="w-[120px] px-4 py-2 bg-[#8671D4] text-white rounded-sm text-xs disabled:cursor-not-allowed disabled:opacity-50"
        >
          Add Challenge
        </button>
      </div>
    </form>
  );
}
