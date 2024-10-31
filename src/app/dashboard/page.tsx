"use client";
import MemberSheetTable from "@/components/MemberSheetTable";
import { UserData } from "@/types/userdata.type";
import { PROFILE_IMG } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import { IoIosSearch } from "react-icons/io";
import MemberLineChart from "@/components/MemberLineChart";
import { useState } from "react";
import Spinner from "@/components/ui/spinner";
import Member from "@/components/Member";
import TaskPage from "@/components/TaskPage";
import Image from "next/image";
import Greeting from "@/components/Greeting";
import { useTheme } from "@/context/ThemeContext";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";
import { account } from "@/lib/appwrite_client";
import { useRouter } from "next/navigation";

export const getMemberDetails = async (): Promise<UserData[]> => {
  const data = await fetch(`https://haster-gym-server.onrender.com/users`);
  if (!data.ok) {
    throw new Error("Network response was not ok");
  }
  return data.json();
};

export default function Dashboard() {
  const [value, setValue] = useState("");
  const { darkTheme, toggleTheme } = useTheme();
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  const {
    data: members,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["members"],
    queryFn: getMemberDetails,
  });

  if (isLoading) {
    return (
      <div className="w-full bg-gray-100 p-3 min-h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (isError || !members) {
    return <div>Error fetching member or workout plan details</div>;
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    const filteredData = members.filter((member) =>
      member.firstname.toLowerCase().includes(value.toLowerCase())
    );
    return filteredData;
  };

  const displayedMembers = value ? handleSearch() : members;

  const handleMode = () => {
    toggleTheme();
    setVisible(!visible);
  };

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`w-full ${
        darkTheme ? "bg-[#353935]" : "bg-gray-100"
      } py-5 pr-5 min-h-screen flex flex-col`}
    >
      <div
        className={`w-full ${
          darkTheme ? "bg-black border-[0.4px] border-gray-400" : "bg-white"
        } p-3 rounded-2xl shadow-lg flex-grow flex flex-col`}
      >
        <div
          className={`w-full ${
            darkTheme ? "bg-black" : "bg-white"
          } rounded-2xl flex-shrink-0 sticky top-0 z-10`}
        >
          <div className="flex justify-between">
            <div>
              <h1 className="font-bold">
                <Greeting />
              </h1>
              <h1
                className={`${
                  darkTheme ? "text-white" : "text-gray-500"
                } text-sm font-light`}
              >
                Rise, shine and conquer the day.
              </h1>
            </div>
            <button
              onClick={() => setVisible(!visible)}
              className="cursor-pointer relative"
            >
              <Image
                src={PROFILE_IMG}
                width={40}
                height={40}
                className="rounded-full cursor-pointer"
                alt="profile-img"
              />
            </button>
            {visible && (
              <div className="absolute right-0 mt-11 flex flex-col bg-white rounded-lg">
                <button
                  className="px-4 py-2 border border-gray-300 text-sm hover:bg-gray-300 rounded-t-lg flex"
                  onClick={handleLogout}
                >
                  <RiLogoutCircleLine size={18} className="mr-2" />
                  Log Out
                </button>
                <button
                  className="px-4 py-2 border border-gray-300 text-sm hover:bg-gray-300 rounded-b-lg border-t-0 flex"
                  onClick={handleMode}
                >
                  {darkTheme ? (
                    <>
                      <MdLightMode size={18} className="mr-2" />
                      Light Mode
                    </>
                  ) : (
                    <>
                      <MdDarkMode size={18} className="mr-2" />
                      Dark Mode
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-3 w-full">
          <div
            className={`w-6/12 rounded-lg ${
              darkTheme
                ? "bg-[#353935] border-[0.4px] border-gray-400"
                : "bg-white"
            } shadow-lg mt-1 p-3 border-[1px]`}
          >
            <TaskPage />
          </div>
          <div className="w-6/12 flex flex-col">
            <div className="flex w-full gap-3">
              <div
                className={`w-6/12 rounded-lg ${
                  darkTheme
                    ? "bg-[#353935] border-[0.4px] border-gray-400"
                    : "bg-white"
                } shadow-lg mt-1 p-3 px-4 border-[1px] h-[170px]`}
              >
                <Member member={displayedMembers} />
              </div>
              <div
                className={`w-6/12 rounded-lg ${
                  darkTheme
                    ? "bg-[#353935] border-[0.4px] border-gray-400"
                    : "bg-white"
                } shadow-lg mt-1 p-3 border-[1px] h-[170px]`}
              >
                <h1
                  className={`text-sm font-semibold ${
                    darkTheme ? "text-white" : "text-black"
                  }`}
                >
                  Membership Details
                </h1>
                <MemberLineChart member={displayedMembers} />
              </div>
            </div>
            <div
              className={`w-full rounded-lg ${
                darkTheme
                  ? "bg-[#353935] border-[0.4px] border-gray-400"
                  : "bg-white"
              } shadow-lg mt-4 p-3 px-4 border-[1px] h-[115px]`}
            >
              {/* <Member member={displayedMembers} /> */}
              <h1
        className={`font-semibold text-sm ${
          darkTheme ? "text-white" : "text-balck"
        }`}
      >
        Top 3 Products
      </h1>
            </div>
          </div>
        </div>
        <div
          className={`w-full ${
            darkTheme
              ? "bg-[#353935] border-[0.4px] border-gray-400"
              : "bg-white"
          } p-3 rounded-lg shadow-lg mt-4 border-[1px] flex-grow`}
        >
          <div className="mb-5 flex justify-between">
            <h1
              className={`text-sm font-semibold ${
                darkTheme ? "text-white" : "text-black"
              }`}
            >
              Member Sheet
            </h1>
            <div className="relative">
              <input
                type="text"
                className="border border-gray-300 w-[600px] pl-8 pr-3 text-sm py-[4px] rounded-2xl"
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
          <MemberSheetTable members={displayedMembers} />
        </div>
      </div>
    </div>
  );
}
