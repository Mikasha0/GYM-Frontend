"use client";

import { LoginData } from "@/types/logindata.type";
import { loginSchema } from "@/types/z.schema.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { BsApple } from "react-icons/bs";

export default function LoginForm() {
  const [signedIn, setSignedIn] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const submitData = (data: LoginData) => {
    if (data.username === "Mikasha@316" && data.password === "12@Dharan") {
      router.push("/dashboard");
    }
  };

  const toggleLoginRegister = () => {
    setSignedIn(!signedIn);
  };

  return (
    <form onSubmit={handleSubmit(submitData)}>
      <h1 className="font-bold text-xl">
        {signedIn ? "Welcome Back" : "Create an Account"}
      </h1>

      <div className="mt-4">
        <p className="font-light text-sm">Email</p>
        <input
          type="text"
          placeholder="Email address*"
          value="Mikasha@316"
          {...register("username")}
          className="w-[70%] border border-gray-400 px-3 py-2 mt-2 text-sm rounded-lg"
        />
        {errors.username ? (
          <p className="text-xs text-red-400 mt-1">{errors.username.message}</p>
        ) : null}
      </div>
      <div className="mt-4">
        <p className="font-light text-sm">Password</p>
        <input
          type="password"
          placeholder="password*"
          value="12@Dharan"
          {...register("password")}
          className="w-[70%] border border-gray-400 px-3 py-2 mt-2 text-sm rounded-lg"
        />
        {errors.password ? (
          <p className="text-xs text-red-400 mt-1">{errors.password.message}</p>
        ) : null}
      </div>
      <button
        type="submit"
        className="bg-[#A75815] text-white w-[70%] rounded-lg mt-5 py-2 font-semibold"
      >
        Log In
      </button>
      {signedIn ? (
        <>
          <p className="text-xs mt-3">
            Dont have an account ?
            <a
              className="cursor-pointer text-blue-500 text-xs font-semibold"
              onClick={toggleLoginRegister}
            >
              Sign Up
            </a>
          </p>
        </>
      ) : (
        <>
          <p className="text-xs mt-3">
            Already have a account ?
            <a
              className="cursor-pointer text-blue-500 text-xs font-semibold"
              onClick={toggleLoginRegister}
            >
              &nbsp; Log In
            </a>
          </p>
        </>
      )}
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
