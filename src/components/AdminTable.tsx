import { createAdminSchema } from "@/types/z.schema.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CiEdit, CiImageOff } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import { toast } from "sonner";
import { z } from "zod";
import InputForm from "./ui/inputForm";
import Pagination from "./ui/pagination";
import SelectInput from "./ui/selectInput";
import { useTheme } from "@/context/ThemeContext";

export default function AdminTable({
  products,
}: {
  products: (typeof createAdminSchema)[];
}) {
  const [editProductId, setEditProductId] = useState<string | null>(null);
  const [display, setDisplay] = useState<boolean>(false);
  const [enableInput, setEnableInput] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const [imageName, setImageName] = useState("");
  const { themeClasses } = useTheme();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof createAdminSchema>>({
    resolver: zodResolver(createAdminSchema),
    mode: "onChange",
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/admin/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete admin");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin"] });
      toast.success("admin deleted successfully!");
    },
    onError: () => {
      alert("Failed to delete admin");
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: any) => {
      console.log(data)
      const response = await fetch(`/api/admin/${data.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to update admin");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin"] });
      toast.success("Admin updated successfully!");
      setImageName("");
      setEditProductId(null);
    },
    onError: () => {
      alert("Failed to update admin");
    },
  });

  const handleProductDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleEdit = (product: any) => {
    console.log(product.$id);
    setEditProductId(product.$id);
    setDisplay(true);
    setEnableInput(false);
    reset(product);
  };

  const handleUpdateProduct = (data: any) => {
    console.log(data);
    console.log("Form Data:", data);
    console.log("Edit Product ID:", editProductId);
    updateMutation.mutate({ ...data, id: editProductId });
  };

  const handleCancelEdit = () => {
    setEditProductId(null);
    setDisplay(false);
    setEnableInput(false);
    setImageName("");
  };

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setImageName(file.name);
    } else {
      setImageName("");
    }
  };

  return (
    <form onSubmit={handleSubmit(handleUpdateProduct)}>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className={`text-xs ${themeClasses.card}`}>
          <tr>
            <th scope="col" className="px-6 py-3 font-normal">
              #
            </th>
            <th scope="col" className="px-6 py-3 font-normal">
              Name
            </th>
            <th scope="col" className="px-6 py-3 font-normal">
              Status
            </th>
            <th scope="col" className="px-6 py-3 font-normal">
              Phone Number
            </th>
            <th scope="col" className="px-6 py-3 font-normal">
              Email
            </th>
            <th scope="col" className="px-6 py-3 font-normal">
              Role
            </th>
          </tr>
        </thead>
        <tbody>
          {products.slice(page * 6 - 6, page * 6).map((product: any, id) => (
            <tr
              className={`${themeClasses.card} border-b dark:bg-gray-800 dark:border-gray-700`}
              key={product.id}
            >
              <th
                scope="row"
                className={`px-6 py-4 text-xs ${themeClasses.text} whitespace-nowrap font-normal`}
              >
                {id + 1}
              </th>
              <td
                className={`px-6 py-4 text-xs font-normal ${themeClasses.text}`}
              >
                <div className="flex">
                  {product.profile ? (
                    <Image
                      className="mr-2"
                      width={25}
                      height={25}
                      src={product.profile}
                      alt="admin-img"
                    />
                  ) : (
                    <CiImageOff className="w-6 h-6 mr-2 text-gray-400" />
                  )}
                  <p className="mt-1">{product.name}</p>
                </div>
              </td>

              <td
                className={`px-6 py-4 text-xs font-normal ${themeClasses.text}`}
              >
                🟢 Active
              </td>
              <td
                className={`px-6 py-4 text-xs font-normal ${themeClasses.text}`}
              >
                {product.phone}
              </td>
              <td
                className={`px-6 py-4 text-xs font-normal ${themeClasses.text}`}
              >
                {product.email}
              </td>
              <td
                className={`px-6 py-4 text-xs font-normal ${themeClasses.text}`}
              >
                {product.role}
              </td>
              <td>
                <CiEdit
                  size={20}
                  className="${themeCLasses.text} cursor-pointer"
                  onClick={() => handleEdit(product)}
                />
              </td>
              <td>
                <RiDeleteBinLine
                  size={18}
                  className="text-red-500 cursor-pointer"
                  onClick={() => handleProductDelete(product.$id)}
                />
              </td>
              {editProductId === product.$id && (
                <div className=" fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                  <div className="bg-white p-5 rounded shadow-lg w-4/12">
                    <div className="flex justify-between">
                      <h1 className="font-semibold mb-1">Update Admin </h1>
                      <button
                        onClick={handleCancelEdit}
                        className="text-gray-400 text-xl mb-1"
                      >
                        &times;
                      </button>
                    </div>
                    <InputForm
                      inputType="text"
                      labelName="Admin Name"
                      inputClassName={`font-semibold text-xs ${
                        display ? "" : "border-none"
                      }`}
                      register={register}
                      name="name"
                      errors={errors}
                      enable={enableInput}
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <InputForm
                        inputType="text"
                        labelName="Email"
                        inputClassName={`font-semibold text-xs ${
                          display ? "" : "border-none"
                        }`}
                        register={register}
                        name="email"
                        errors={errors}
                        enable={enableInput}
                      />
                      <InputForm
                        inputType="text"
                        labelName="Phone Number"
                        inputClassName={`font-semibold text-xs ${
                          display ? "" : "border-none"
                        }`}
                        register={register}
                        name="phone"
                        errors={errors}
                        enable={enableInput}
                      />
                    </div>
                    <SelectInput
                      labelName="Role"
                      errors={errors}
                      register={register}
                      inputClassName={`font-semibold text-xs ${
                        display ? "" : "border-none"
                      }`}
                      name="role"
                      options={["Admin", "Receptionist", "Trainer"]}
                      enable={enableInput}
                    />
                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="px-4 py-2 w-[106px] text-xs text-white bg-[#F94343] rounded-sm px-2 py-1 mr-2 mt-3"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 w-[106px] text-xs text-white py-1 bg-[#8671D4] rounded-sm px-2 mt-3"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {products.length == 0 && (
        <>
          <h1 className="text-center text-sm  text-[#7C7C7C] mt-3">
            No admin added
          </h1>
          <hr className="mt-5" />
        </>
      )}
      <Pagination paginationData={products} page={page} setPage={setPage} />
    </form>
  );
}
