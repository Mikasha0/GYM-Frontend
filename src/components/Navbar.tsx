'use client'
import { useRouter } from "next/navigation";
import React from "react";

export default function Navbar() {
  const router = useRouter()
  return (
    <div className="w-full flex justify-center mt-[30px] fixed sticky-top">
      <div className="w-[95%] flex justify-between py-2 px-2 bg-[#F8F8F8] rounded-[67px] shadow-md border border-gray-200">
        <div className="flex items-center ">
          <p className="bg-[#8671D4] w-11 h-11 rounded-full ml-1"></p>
          <p className="px-4 text-xs font-bold">Home</p>
          <p className="px-3 text-xs font-bold">Features</p>
          <p className="px-3 text-xs font-bold">Pricing</p>
          <p className="px-3 text-xs font-bold">Demo</p>
          <p className="px-3 text-xs font-bold">About Us</p>
        </div>
        <div className="flex items-center">
          <p className="px-[32px] py-2.5 border border-[#8671D4] text-sm mr-[10px] rounded-[45px] text-[#8671D4] font-extrabold cursor-pointer" onClick={()=> router.push('/login')}>
            Log In
          </p>
          <p className="py-2.5 px-[68px] text-sm bg-[#8671D4] rounded-[67px] text-white font-extrabold cursor-pointer" onClick={()=> router.push('/register')}>
            Join Now
          </p>
        </div>
      </div>
    </div>
  );
}
