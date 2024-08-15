"use client";
import dynamic from "next/dynamic";

const Shop = dynamic(() => import("@/components/ShopComponent"));

export default function page() {
  return (
    <div className="bg-gray-100 w-full p-5">
      <div className="w-full bg-white p-3 shadow-lg rounded-lg">
        <Shop />
      </div>
    </div>
  );
}
