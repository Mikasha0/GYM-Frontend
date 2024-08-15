"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { GrHomeRounded } from "react-icons/gr";
import { IoBookOutline, IoCartOutline, IoPersonOutline } from "react-icons/io5";
import { LuShoppingBag } from "react-icons/lu";
import { MdOutlineLeaderboard } from "react-icons/md";
import { PiBookOpenLight } from "react-icons/pi";
import { RxHamburgerMenu } from "react-icons/rx";

export function Sidebar() {
  const [toggle, setToggle] = useState<boolean>(false);
  const pathname = usePathname();

  const getLinkClasses = (path: string) => {
    const baseClasses =
      "w-full text-black font-semibold text-sm flex items-center py-2 px-5 rounded-lg hover:bg-[#CA9A72] hover:text-white mt-3";
    let isActive = pathname === path;
    if (
      path === "/dashboard/members" &&
      pathname.startsWith("/dashboard/members/")
    ) {
      isActive = true;
    }
    return isActive ? `${baseClasses} bg-[#A75815] text-white` : baseClasses;
  };

  const toggleSidebar = () => {
    setToggle(!toggle);
  };

  return (
    <div
      className={`${
        toggle ? "w-[90px]" : "w-[210px]"
      } text-white h-screen px-4 py-3 transition-width duration-300 flex flex-col justify-between`}
    >
      <div>
        <div className="flex justify-between items-center mb-3">
          {!toggle && (
            <Link href="/dashboard">
              <h1 className="text-black font-bold cursor-pointer">Dashboard</h1>
            </Link>
          )}
          <RxHamburgerMenu
            className={`text-black cursor-pointer ${toggle ? "text-center w-full":""}`}
            size={22}
            onClick={toggleSidebar}
          />
        </div>
        <Link href="/dashboard">
          <p className={getLinkClasses("/dashboard")}>
            <GrHomeRounded className="icon" size={16} />
            {!toggle && <span className="ml-3">Home</span>}
          </p>
        </Link>
        <Link href="/dashboard/createUser">
          <p className={getLinkClasses("/dashboard/createUser")}>
            <PiBookOpenLight className="icon" size={20} />
            {!toggle && <span className="ml-3">Registration</span>}
          </p>
        </Link>
        <Link href="/dashboard/members">
          <p className={getLinkClasses("/dashboard/members")}>
            <IoPersonOutline className="icon" size={18} />
            {!toggle && <span className="ml-3">Members</span>}
          </p>
        </Link>
        <Link href="/dashboard/products">
          <p className={getLinkClasses("/dashboard/products")}>
            <LuShoppingBag className="icon" size={18} />
            {!toggle && <span className="ml-3">Products</span>}
          </p>
        </Link>
        <Link href="/dashboard/challenges">
          <p className={getLinkClasses("/dashboard/challenges")}>
            <IoBookOutline className="icon" size={18} />
            {!toggle && <span className="ml-3">Challenges</span>}
          </p>
        </Link>
        <Link href="/dashboard/leaderboard">
          <p className={getLinkClasses("/dashboard/leaderboard")}>
            <MdOutlineLeaderboard className="icon" size={18} />
            {!toggle && <span className="ml-3">Leaderboard</span>}
          </p>
        </Link>
        <Link href="/dashboard/shop">
          <p className={getLinkClasses("/dashboard/shop")}>
            <IoCartOutline className="icon" size={18} />
            {!toggle && <span className="ml-3">Shop</span>}
          </p>
        </Link>
      </div>
    </div>
  );
}
