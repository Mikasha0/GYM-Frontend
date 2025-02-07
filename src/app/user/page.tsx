"use client";
import { LoginData } from "@/types/logindata.type";
import { loginSchema } from "@/types/z.schema.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BsApple } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { Query } from "appwrite";
import { databases } from "@/lib/appwrite_client";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";

export default function User() {
  const router = useRouter();
  const [error, setError] = useState<String>();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });
  console.log(showPassword);
  const submitData = async (data: LoginData) => {
    try {
      const usersCollectionId = "66f3d57b0008cd6db213";
      const databaseId = "66c19c5d002a148ac20f";

      const response = await databases.listDocuments(
        databaseId,
        usersCollectionId,
        [Query.equal("email", data.email)]
      );

      if (response.documents.length > 0) {
        router.push(`/user/details?email=${encodeURIComponent(data.email)}`);
      } else {
        setError("Email not found. Please register first.");
      }
    } catch (error) {
      console.error("Error verifying email:", error);
      alert("An error occurred while verifying the email. Please try again.");
    }
  };
  return (
    <div className="w-full h-screen flex items-center justify-center flex-col">
      <div className="w-[303px] sm:w-full">
        <h1 className="text-[26px] font-medium text-center">
          Get Started with your fitness journey.
        </h1>
        <p className="text-center mt-2 text-[15px]">Login</p>
      </div>
      <form onSubmit={handleSubmit(submitData)}>
        <div className="w-[329px] sm:w-full mt-[57px]">
          <div className="relative w-full">
            <label
              htmlFor="email"
              className={`absolute top-2 left-[10.4px] text-[8px] text-black transition-all pointer-events-none `}
            >
              Email
            </label>
            <input
              type="text"
              {...register("email")}
              placeholder=" "
              className="h-10 w-full bg-[#dfdfdf] px-2 pt-5 border rounded-[5.2px] focus:outline-none focus:border-blue-500 text-xs pb-[6.5px] pl-[10.4px]"
            />
          </div>
          {errors.email && (
            <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>
          )}
          <div className="relative w-full mt-3">
            <label
              htmlFor="password"
              className={`absolute top-2 left-[10.4px] text-[8px] text-black transition-all pointer-events-none `}
            >
              Password
            </label>
            <input
              type={`${showPassword ? "text" : "password"}`}
              {...register("password")}
              placeholder=" "
              className="h-10 w-full bg-[#dfdfdf] px-2 pt-5 border rounded-[5.2px] focus:outline-none focus:border-blue-500 text-xs pb-[6.5px] pl-[10.4px]"
            />
            <p
              className="relative -top-[22px] w-full flex justify-end pr-2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </p>
         
          </div>
          {errors.password && (
            <p className="text-xs text-red-400 mt-1">
              {errors.password.message}
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-[#8671D4] h-[40px]  rounded-lg mt-3 text-white text-sm font-semibold"
          >
            Get Started
          </button>
          {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
          <p className="mt-3 text-xs">
            Don't have an account ?{" "}
            <span className="text-[#003670] font-medium">Sign Up</span>
          </p>
          <div className="flex items-center mt-4">
            <hr className="border-t border-[#c3c3c3] flex-grow" />
            <span className="mx-2 text-[#1e1e1e] text-sm">Or</span>
            <hr className="border-t border-[#c3c3c3] flex-grow" />
          </div>
          <button className="border border-gray-300 px-3 py-[5px] w-full h-[40px] rounded-lg mt-4 hover:bg-gray-200 text-center">
            <div className="flex items-center justify-center">
              <FcGoogle size={24} />
              <p className="text-sm ml-[10px]"> Continue with Google</p>
            </div>
          </button>
          <button className="border border-gray-300 px-3 py-[5px] w-full h-[40px] rounded-lg mt-3 hover:bg-gray-200">
            <div className="flex items-center justify-center">
              <BsApple size={24} />
              <p className="text-sm ml-[10px]"> Continue with Apple</p>
            </div>
          </button>
        </div>
      </form>
    </div>
  );
}
