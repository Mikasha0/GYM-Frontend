"use client";

import ProductForm from "@/components/form/ProductForm";
import ProductTable from "@/components/ProductTable";
import Spinner from "@/components/ui/spinner";
import { useTheme } from "@/context/ThemeContext";
import { createProductSchema } from "@/types/z.schema.types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { RiAddLargeFill } from "react-icons/ri";

async function getProductDetails(): Promise<(typeof createProductSchema)[]> {
  // const data = await fetch("https://haster-gym-server.onrender.com/products");
  const data = await fetch("/api/products");

  if (!data.ok) {
    throw new Error("Network response was not ok");
  }
  return data.json();
}

export default function Product() {
  const [show, setShow] = useState<boolean>(false);
  const [value, setValue] = useState("");
  const { themeClasses } = useTheme();
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["products"], queryFn: getProductDetails });

  if (isLoading) {
    return (
      <div className="w-full bg-gray-100 py-5 pr-5 h-screen flex justify-center items-center">
        <div className="w-full bg-white rounded-2xl h-full flex justify-center items-center ">
          <Spinner />
        </div>
      </div>
    );
  }

  if (isError || !products) {
    return <div>Error fetching member or workout plan details</div>;
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    const filteredData = products.filter((product: any) =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );
    return filteredData;
  };

  const displayedProducts = value ? handleSearch() : products;

  const handleProductModal = () => {
    setShow(!show);
  };

  return (
    <>
      <div
        className={`w-full py-5 pr-5 ${themeClasses.background} h-screen flex flex-col`}
      >
        <div
          className={`w-full ${themeClasses.card} rounded-2xl p-3 h-full flex flex-col`}
        >
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 flex justify-between">
              <h1 className={`font-semibold ${themeClasses.text}`}>Products</h1>
              <div className="relative">
                <input
                  type="text"
                  className="border border-gray-300 w-[300px] pl-8 pr-3 text-sm py-[4px] rounded-2xl"
                  placeholder="Search"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <IoIosSearch className="absolute left-2 top-[6px] text-gray-400" />
              </div>
            </div>
            <ProductTable products={displayedProducts} />
          </div>
          {show && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
              <div className="bg-white p-5 rounded shadow-lg w-4/12">
                <div className="flex justify-between">
                  <h1 className="font-semibold mb-1">Add Item</h1>
                  <button
                    onClick={handleProductModal}
                    className="text-gray-400 text-xl mb-1"
                  >
                    &times;
                  </button>
                </div>
                <ProductForm updateSetShow={setShow} />
              </div>
            </div>
          )}
          <div className="flex justify-end mt-4">
            <button
              className="bg-white text-black border border-1 text-2xl rounded-full px-3 py-3 shadow-lg"
              onClick={handleProductModal}
            >
              <RiAddLargeFill size={25} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
