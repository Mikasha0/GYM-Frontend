"use client";
import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import { IoIosSearch } from "react-icons/io";
import Spinner from "./ui/spinner";
import ShopDetailCard from "./ShopDetailCard";
import { useEffect, useState } from "react";

const fetchShopAPI = async () => {
  const response = await fetch("https://haster-gym-server.onrender.com/shop");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const ShopComponent = () => {
  const [shopItems, setShopItems] = useState([]);
  const [value, setValue] = useState("");
  const {
    data: shop,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["shop"],
    queryFn: fetchShopAPI,
  });

  useEffect(() => {
    if (shop) {
      setShopItems(shop);
    }
  }, [shop]);

  const handleSearch = () => {
    if (shop) {
      const filteredMembers = shop.filter((items: any) =>
        items.name.toLowerCase().includes(value.toLowerCase())
      );
      setShopItems(filteredMembers);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  if (isLoading) {
    return (
      <div className="w-full bg-gray-100 py-5 pr-5 h-screen flex justify-center items-center">
        <div className="w-full bg-white rounded-2xl h-full flex justify-center items-center ">
          <Spinner />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full bg-gray-100 p-5">
        <p className="text-red-500">Failed to load shop data.</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-5 flex justify-between">
        <h1 className="font-semibold">Shop</h1>
        <div className="relative">
          <input
            type="text"
            className="border border-gray-300 w-[300px] pl-8 pr-3 text-sm py-[4px] rounded-2xl"
            placeholder="Search"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            onKeyDown={handleKeyDown}
          />
          <IoIosSearch className="absolute left-2 top-[6px] text-gray-400" />
        </div>
      </div>
      <div className="grid grid-cols-5 gap-3">
        {shopItems.map((item: any) => (
          <ShopDetailCard key={item.id} items={item} />
        ))}
        <div>
          <button className="w-5 h-5 border border-black">+</button>
        </div>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(ShopComponent), { ssr: false });
