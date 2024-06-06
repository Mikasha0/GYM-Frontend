import React, { useRef } from "react";
import { CgGym } from "react-icons/cg";

const Login = () => {
    const username = useRef('')
    const password = useRef('')

    const handleAdminLogin = () =>{
    //handles admin log in and proceeds to admin panel.

    }

  return (
    <div className="w-full bg-[#2563eb] h-[100vh] flex justify-center items-center">
      <div className="bg-white w-4/12 px-10 pt-8 pb-16">
          <CgGym className="mb-4" size={38} />

        <h1 className="font-semibold text-xl">Admin Log In</h1>
        <p className="text-sm mt-2 text-gray-500 font-light">
          please enter your details
        </p>
        <div className="mt-4">
          <p className="font-semibold text-sm">Username</p>
          <input
            type="text"
            placeholder="username"
            className="w-full border border-black px-3 py-2 mt-2 text-sm"
          />
        </div>
        <div className="mt-4">
          <p className="font-semibold text-sm">Password</p>
          <input
            type="password"
            placeholder="password"
            className="w-full border border-black px-3 py-2 mt-2 text-sm"
          />
        </div>
        <button className="bg-black text-white w-full mt-8 py-2 font-semibold" onClick={handleAdminLogin}>Log In</button>
      </div>
    </div>
  );
};

export default Login;
