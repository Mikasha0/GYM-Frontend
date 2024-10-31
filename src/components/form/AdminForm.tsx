import { createAdminSchema, createProductSchema } from "@/types/z.schema.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import InputForm from "../ui/inputForm";
import Loading from "../ui/loading";
import SelectInput from "../ui/selectInput";
import { AvatarGenerator } from "random-avatar-generator";

export default function AdminForm({
  updateSetShow,
}: {
  updateSetShow: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const generator = new AvatarGenerator();
  const ramdom_avatar = generator.generateRandomAvatar();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof createProductSchema>>({
    resolver: zodResolver(createAdminSchema),
    mode: "onChange",
  });


  const createAdmin = async (data: z.infer<typeof createProductSchema>) => {
    console.log(data)
    const adminData = {...data, profile:ramdom_avatar}
    try {
      const response = await fetch("/api/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adminData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      await response.json();
      queryClient.invalidateQueries({ queryKey: ["admin"] });
      toast.success("Admin added successfully!");
      // alert("Product added successfully!");
      updateSetShow(false);
      reset();
    } catch (error) {
      console.error("Error adding Admin:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(createAdmin)}>
      <div className="mb-2">
        <InputForm
          labelName="Name"
          inputType="text"
          register={register}
          name="name"
          errors={errors}
        />
        <InputForm
          labelName="E-mail :"
          inputType="text"
          register={register}
          name="email"
          errors={errors}
        />
        <div className="grid grid-cols-2 gap-2">
          <InputForm
            labelName="Phone Number"
            inputType="number"
            register={register}
            name="phone"
            errors={errors}
          />
          <SelectInput
            labelName="Role"
            errors={errors}
            register={register}
            labelClassName="text-gray-400 font-light ml-[10px]"
            name="role"
            options={["Admin", "Receptionist", "Trainer"]}
          />
        </div>
      </div>
      {/* <div className="flex items-center justify-center w-full mt-2">
        <label
          htmlFor="image-upload"
          className="flex flex-col items-center justify-center w-full h-14 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-[#F2F7FF] dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex">
            <CiImageOn size={20} className="text-gray-400" />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-1">
              Upload Image
            </p>
          </div>
          <input
            {...register("profile")}
            aria-describedby="file_input_help"
            id="file_input"
            type="file"
          />
        </label>
        {errors.profile && (
          <span className="text-red-600 text-sm">{errors.profile.message}</span>
        )}
      </div> */}

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
          disabled={isSubmitting}
          className="w-[106px] px-4 py-2 bg-[#8671D4] text-white rounded-sm text-xs disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? <Loading loadingText="Adding..." /> : "Add Role"}
        </button>
      </div>
    </form>
  );
}
