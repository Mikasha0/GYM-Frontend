"use client";
  import Link from "next/link";
import { usePathname } from "next/navigation";
import { GrHomeRounded } from "react-icons/gr";
import { IoBookOutline, IoCartOutline, IoPersonOutline, IoStatsChartSharp } from "react-icons/io5";
import { LuShoppingBag } from "react-icons/lu";
import { PiBookOpenLight } from "react-icons/pi";
import { RxHamburgerMenu } from "react-icons/rx";

export function Sidebar() {
  const pathname = usePathname();

  const getLinkClasses = (path: string) => {
    const baseClasses =
      "w-full text-black font-semibold text-sm flex py-2 px-5 rounded-lg hover:bg-[#CA9A72] hover:text-white mt-3";
    let isActive = pathname === path;
    if (
      path === "/dashboard/members" &&
      pathname.startsWith("/dashboard/members/")
    ) {
      isActive = true;
    }
    return isActive ? `${baseClasses} bg-[#A75815] text-white` : baseClasses;
  };

  return (
    <div className="w-[230px] text-white h-screen px-4 py-3">
      <div className="flex justify-between">
        <Link href="/dashboard">
          <h1 className="text-black font-bold cursor-pointer">Dashboard</h1>
        </Link>
        <RxHamburgerMenu className="text-black" size={22} />
      </div>
      <Link href="/dashboard">
        <p className={getLinkClasses("/dashboard")}>
          <GrHomeRounded className="mr-3" size={16} />
          Home
        </p>
      </Link>
      <Link href="/dashboard/createUser">
        <p className={getLinkClasses("/dashboard/createUser")}>
          <PiBookOpenLight className="mr-3" size={20} />
          Registration
        </p>
      </Link>
      <Link href="/dashboard/members">
        <p className={getLinkClasses("/dashboard/members")}>
          <IoPersonOutline className="mr-3" size={18} />
          Members
        </p>
      </Link>
      <Link href="/dashboard/products">
        <p className={getLinkClasses("/dashboard/products")}>
          <LuShoppingBag className="mr-3" size={18} />
          Products
        </p>
      </Link>
      <Link href="/dashboard/challenges">
        <p className={getLinkClasses("/dashboard/challenges")}>
          <IoBookOutline className="mr-3" size={18} />
          Challenges
        </p>
      </Link>
      <Link href="/dashboard/leaderboard">
        <p className={getLinkClasses("/dashboard/leaderboard")}>
          <IoStatsChartSharp className="mr-3" size={18} />
          leaderboard
        </p>
      </Link>
      <Link href="/dashboard/shop">
        <p className={getLinkClasses("/dashboard/shop")}>
          <IoCartOutline className="mr-3" size={18} />
          Shop
        </p>
      </Link>
    </div>
  );
}
