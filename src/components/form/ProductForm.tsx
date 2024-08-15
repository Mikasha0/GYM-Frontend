import { createProductSchema } from "@/types/z.schema.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputForm from "../ui/inputForm";
import TextareaForm from "../ui/textareaForm";
import { CiImageOn } from "react-icons/ci";
import { useState } from "react";
import Loading from "../ui/loading";
import { toast } from "sonner";

export default function ProductForm({
  updateSetShow,
}: {
  updateSetShow: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [imageName, setImageName] = useState("");

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof createProductSchema>>({
    resolver: zodResolver(createProductSchema),
    mode: "onChange",
  });
  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setImageName(file.name);
    } else {
      setImageName("");
    }
  };
  const notify = () => toast("This is a sonner toast");

  const createProduct = async (data: z.infer<typeof createProductSchema>) => {
    const image = data.profile[0];
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "images_preset");

    const uploadResponse = await fetch(
      "https://api.cloudinary.com/v1_1/deb5hrg5z/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const uploadedImageData = await uploadResponse.json();
    const imageUrl = uploadedImageData.secure_url;
    const productData = {
      name: data.name,
      price: data.price,
      quantity: data.quantity,
      description: data.description,
      image: imageUrl,
    };

    try {
      const response = await fetch("https://haster-gym-server.onrender.com/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      await response.json();
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product added successfully!");
      // alert("Product added successfully!");
      updateSetShow(false);
      reset();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(createProduct)}>
      <div className="mb-2">
        <InputForm
          labelName="Name"
          inputType="text"
          register={register}
          name="name"
          errors={errors}
        />
        <div className="grid grid-cols-2 gap-2">
          <InputForm
            labelName="Price"
            inputType="number"
            registrationOption={{ valueAsNumber: true }}
            register={register}
            name="price"
            errors={errors}
          />
          <InputForm
            labelName="Quantity"
            inputType="number"
            registrationOption={{ valueAsNumber: true }}
            register={register}
            name="quantity"
            errors={errors}
          />
        </div>
        <TextareaForm
          labelName="Description"
          register={register}
          name="description"
          errors={errors}
        />
      </div>
      <div className="flex items-center justify-center w-full mt-2">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-14 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-[#F2F7FF] dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex">
            <CiImageOn size={20} className="text-gray-400" />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-1">
              {imageName ? imageName : "Upload Image"}
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            {...register("profile", { onChange: handleImageChange })}
          />
        </label>
      </div>
      {errors.profile && (
        <span className="text-red-600 text-sm">{errors.profile.message}</span>
      )}
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
          className="px-3 py-1 bg-[#FF0000] text-white rounded-md text-xs mr-2 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => updateSetShow(false)}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-3 py-1 bg-[#1400FF] text-white rounded-md text-xs disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? <Loading loadingText="Adding..." /> : "Add Item"}
        </button>
      </div>
    </form>
  );
}
