"use client";
import { useTheme } from "@/context/ThemeContext";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { GrHomeRounded } from "react-icons/gr";
import {
  IoBookOutline,
  IoCartOutline,
  IoPersonOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { LuShoppingBag } from "react-icons/lu";
import { MdOutlineLeaderboard } from "react-icons/md";
import { PiBookOpenLight } from "react-icons/pi";
import { RxHamburgerMenu } from "react-icons/rx";
import { GiArchiveRegister } from "react-icons/gi";
import { FiBarChart2 } from "react-icons/fi";
import UserIcon from "../UserIcon";

export function Sidebar() {
  const [toggle, setToggle] = useState<boolean>(false);
  const pathname = usePathname();
  const { darkTheme } = useTheme();

  const getLinkClasses = (path: string) => {
    const baseClasses = `w-full ${
      darkTheme ? "text-white" : "text-black"
    } font-semibold text-sm flex items-center py-2 px-5 rounded-lg hover:bg-[#B4A4EE] hover:text-white mt-3`;
    let isActive = pathname === path;
    if (
      path === "/dashboard/members" &&
      pathname.startsWith("/dashboard/members/")
    ) {
      isActive = true;
    }
    return isActive ? `${baseClasses} bg-[#8671D4] text-white` : baseClasses;
  };

  const toggleSidebar = () => {
    setToggle(!toggle);
  };

  return (
    <div
      className={`p-5 h-screen ${darkTheme ? "bg-[#353935]" : "bg-gray-100"}`}
    >
      <div
        className={`${
          toggle ? "w-[90px]" : "w-[210px]"
        } text-white px-4 py-3 h-full rounded-2xl transition-width duration-300 flex flex-col justify-between shadow-lg ${
          darkTheme ? "bg-black" : "bg-white"
        }`}
      >
        <div>
          <div className="flex justify-between items-center mb-6">
            {!toggle && (
              <Link href="/dashboard">
                <h1
                  className={` ${
                    darkTheme ? "text-white" : "text-black"
                  } font-bold cursor-pointer`}
                >
                  Dashboard
                </h1>
              </Link>
            )}
            <RxHamburgerMenu
              className={`${
                darkTheme ? "text-white" : "text-black"
              } cursor-pointer ${toggle ? "text-center w-full" : ""}`}
              size={22}
              onClick={toggleSidebar}
            />
          </div>
          <Link href="/dashboard">
            <p className={getLinkClasses("/dashboard")}>
              <GrHomeRounded className="icon" size={16} />
              {!toggle && <span className="ml-3 font-medium">Home</span>}
            </p>
          </Link>
          <Link href="/dashboard/admin">
            <p className={getLinkClasses("/dashboard/admin")}>
            {/* <UserIcon/> */}
              <IoPersonOutline className="icon" size={18} />
              {!toggle && <span className="ml-3 font-medium">Admin</span>}
            </p>
          </Link>
          <Link href="/dashboard/createUser">
            <p className={getLinkClasses("/dashboard/createUser")}>
              <PiBookOpenLight className="icon" size={20} />
              {!toggle && <span className="ml-3 font-medium">Registration</span>}
            </p>
          </Link>
          <Link href="/dashboard/members">
            <p className={getLinkClasses("/dashboard/members")}>
              <IoPersonOutline className="icon" size={18} />
              {!toggle && <span className="ml-3 font-medium">Members</span>}
            </p>
          </Link>
          <Link href="/dashboard/products">
            <p className={getLinkClasses("/dashboard/products")}>
              <LuShoppingBag className="icon" size={19} />
              {!toggle && <span className="ml-3 font-medium">Products</span>}
            </p>
          </Link>
          <Link href="/dashboard/challenges">
            <p className={getLinkClasses("/dashboard/challenges")}>
              <IoBookOutline className="icon" size={18} />
              {!toggle && <span className="ml-3 font-medium">Challenges</span>}
            </p>
          </Link>
          <Link href="/dashboard/leaderboard">
            <p className={getLinkClasses("/dashboard/leaderboard")}>
              <FiBarChart2 className="icon" size={18} />
              {!toggle && <span className="ml-3 font-medium">Leaderboard</span>}
            </p>
          </Link>
          {/* <Link href="/dashboard/user">
            <p className={getLinkClasses("/dashboard/user")}>
              <GiArchiveRegister className="icon" size={18} />
              {!toggle && <span className="ml-3 font-medium">User Creation</span>}
            </p>
          </Link> */}
          {/* <Link href="/dashboard/shop">
            <p className={getLinkClasses("/dashboard/shop")}>
              <IoCartOutline className="icon" size={18} />
              {!toggle && <span className="ml-3 font-medium">Shop</span>}
            </p>
          </Link> */}
        </div>
        <div className="mt-auto">
          <Link href="/dashboard/settings">
            <p className={getLinkClasses("/dashboard/settings")}>
              <IoSettingsOutline className="icon" size={18} />
              {!toggle && <span className="ml-3 font-medium">Setting</span>}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
