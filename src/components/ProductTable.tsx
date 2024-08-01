import { createProductSchema, editProductSchema } from "@/types/z.schema.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CiEdit, CiImageOff, CiImageOn } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import { z } from "zod";
import InputForm from "./ui/inputForm";
import Pagination from "./ui/pagination";
import Image from 'next/image'

export default function ProductTable({
  products,
}: {
  products: (typeof createProductSchema)[];
}) {
  const [editProductId, setEditProductId] = useState<string | null>(null);
  const [display, setDisplay] = useState<boolean>(false);
  const [enableInput, setEnableInput] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const [imageName, setImageName] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof editProductSchema>>({
    resolver: zodResolver(editProductSchema),
    mode: "onChange",
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`http://localhost:2000/products/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      alert("Product deleted successfully");
    },
    onError: () => {
      alert("Failed to delete product");
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: any) => {
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
        image: imageUrl,
      };
      const response = await fetch(
        `http://localhost:2000/products/${data.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update product");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      alert("Product updated successfully");
      setImageName("");
      setEditProductId(null);
    },
    onError: () => {
      alert("Failed to update product");
    },
  });

  const handleProductDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleEdit = (product: any) => {
    setEditProductId(product.id);
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
    setImageName("")
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
        <thead className="text-xs text-gray-400 bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 font-normal">
              #
            </th>
            <th scope="col" className="px-6 py-3 font-normal">
              Product Name
            </th>
            <th scope="col" className="px-6 py-3 font-normal">
              Price
            </th>
            <th scope="col" className="px-6 py-3 font-normal">
              Quantity
            </th>
            <th scope="col" className="px-6 py-3 font-normal">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {products.slice(page * 8 - 8, page * 8).map((product: any, id) => (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              key={product.id}
            >
              <th
                scope="row"
                className="px-6 py-4 text-xs text-black whitespace-nowrap font-normal"
              >
                {id + 1}
              </th>
              <td className="px-6 py-4 text-xs font-normal text-black">
                <div className="flex">
                  {product.image ? (
                    <Image
                      className="mr-2"
                      width={25}
                      height={25}
                      src={product.image}
                      alt="product-img"
                    />
                  ) : (
                    <CiImageOff className="w-6 h-6 mr-2 text-gray-400" />
                  )}
                  <p className="mt-1">{product.name}</p>
                </div>
              </td>
              <td className="px-6 py-4 text-xs font-normal text-black">
                {product.price}
              </td>
              <td className="px-6 py-4 text-xs font-normal text-black">
                {product.quantity}
              </td>
              <td className="px-6 py-4 text-xs font-normal text-white">
                <span
                  className={`w-full px-3 py-[3px] rounded-sm text-white ${
                    product.quantity > 10
                      ? "bg-blue-400"
                      : product.quantity <= 10
                      ? "bg-yellow-400"
                      : product.quantity === 0
                      ? "bg-red-500"
                      : "bg-black"
                  }`}
                >
                  {product.quantity <= 10
                    ? "Low Stock"
                    : product.quantity == 0
                    ? "Sold Out"
                    : product.quantity > 10
                    ? "Stock"
                    : null}
                </span>
              </td>
              <td>
                <CiEdit
                  size={20}
                  className="text-black cursor-pointer"
                  onClick={() => handleEdit(product)}
                />
              </td>
              <td>
                <RiDeleteBinLine
                  size={18}
                  className="text-red-500 cursor-pointer"
                  onClick={() => handleProductDelete(product.id)}
                />
              </td>
              {editProductId === product.id && (
                <div className=" fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                  <div className="bg-white p-5 rounded shadow-lg w-4/12">
                    <div className="flex justify-between">
                      <h1 className="font-semibold mb-1">Update Product </h1>
                      <button
                        onClick={handleCancelEdit}
                        className="text-gray-400 text-xl mb-1"
                      >
                        &times;
                      </button>
                    </div>
                    <InputForm
                        inputType="text"
                        labelName="Product Name"
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
                        inputType="number"
                        labelName="Product Price"
                        inputClassName={`font-semibold text-xs ${
                          display ? "" : "border-none"
                        }`}
                        register={register}
                        registrationOption={{ valueAsNumber: true }}
                        name="price"
                        errors={errors}
                        enable={enableInput}
                      />
                      <InputForm
                        inputType="number"
                        labelName="Quantity"
                        inputClassName={`font-semibold text-xs ${
                          display ? "" : "border-none"
                        }`}
                        register={register}
                        registrationOption={{ valueAsNumber: true }}
                        name="quantity"
                        errors={errors}
                        enable={enableInput}
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
                          {...register("profile", {
                            onChange: handleImageChange,
                          })}
                        />
                      </label>
                    </div>
                    {errors.profile && (
                      <span className="text-red-600 text-sm">
                        {errors.profile.message}
                      </span>
                    )}
                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="text-xs text-white bg-red-500 rounded-md px-2 py-1 mr-2 mt-3"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="text-xs text-white py-1 bg-blue-500 rounded-md px-2 mt-3"
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
      <Pagination paginationData={products} page={page} setPage={setPage} />
    </form>
  );
}
