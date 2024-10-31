"use client";
import { LoginData } from "@/types/logindata.type";
import { loginSchema } from "@/types/z.schema.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { AppwriteException, ID } from "appwrite";
import { account } from "@/lib/appwrite_client";
import { useRouter } from "next/navigation";
import { BsApple } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";

export default function LoginForm() {
  const [signedIn, setSignedIn] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const submitData = async (data: LoginData) => {
    console.log(data, "login form");
  };

  // const handleLogout = async () => {
  //   try {
  //     await account.deleteSession('current'); // Deletes the current session
  //     setSignedIn(false); // Set signedIn state to false
  //     window.location.href = '/'; // Redirect to the login page
  //   } catch (error) {
  //     console.error("Logout error:", error);
  //   }
  // };

  return (
    <form onSubmit={handleSubmit(submitData)}>
      <h1 className="font-bold text-xl">Welcome Back</h1>

      <div className="mt-4">
        <p className="font-light text-sm">Email</p>
        <input
          type="text"
          placeholder="Email address*"
          {...register("email")}
          className="w-[70%] border border-gray-400 px-3 py-2 mt-2 text-sm rounded-lg"
        />
        {errors.email && (
          <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="mt-4">
        <p className="font-light text-sm">Password</p>
        <input
          type="password"
          placeholder="Password*"
          {...register("password")}
          className="w-[70%] border border-gray-400 px-3 py-2 mt-2 text-sm rounded-lg"
        />
        {errors.password && (
          <p className="text-xs text-red-400 mt-1">{errors.password.message}</p>
        )}
        {authError && <p className="text-xs text-red-400 mt-1">{authError}</p>}
      </div>

      <button
        type="submit"
        className="bg-[#8671D4] text-white w-[70%] rounded-lg mt-5 py-2 font-semibold"
      >
        Log In
      </button>

      <p className="text-xs mt-3">
        Don't have an account?
        <a
          className="cursor-pointer text-blue-500 text-xs font-semibold"
          onClick={() => router.push("/signup")}
        >
          &nbsp; Sign Up
        </a>
      </p>
      <button className="border border-gray-300 px-3 py-[5px] w-[70%] rounded-lg mt-5 hover:bg-gray-200">
        <div className="flex items-center">
          <FcGoogle size={17} />
          <p className="text-sm ml-[5px]"> Continue with Google</p>
        </div>
      </button>
      <button className="border border-gray-300 px-3 py-[5px] w-[70%] rounded-lg mt-4 hover:bg-gray-200">
        <div className="flex items-center">
          <BsApple size={17} />
          <p className="text-sm ml-[5px]"> Continue with Apple</p>
        </div>
      </button>
    </form>
  );
}
