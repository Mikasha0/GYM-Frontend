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
  const data = await fetch(`/api/createUser`);
  if (!data.ok) {
    throw new Error("Network response was not ok");
  }
  const dashboard_data = await data.json();
  return dashboard_data.users;
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
      <div className="w-full bg-gray-100 py-5 pr-5 h-screen flex justify-center items-center">
        <div className="w-full bg-white rounded-2xl h-full flex justify-center items-center ">
        <Spinner />
        </div>
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
      className={`w-full h-screen top-0 left-0 ${
        darkTheme ? "bg-[#353935]" : "bg-gray-100"
      } py-5 pr-5 flex flex-col`}
    >
      {/* Outer Container */}
      <div
        className={`w-full ${
          darkTheme ? "bg-black" : "bg-white"
        } p-3 rounded-2xl shadow-lg flex flex-col h-full`}
      >
        {/* Fixed Header Section */}
        <div
            className={`w-full ${
              darkTheme ? "bg-black" : "bg-white"
            } rounded-2xl flex-shrink-0 top-0 z-10`}
          >
        {/* <div className="scrollbar-hide flex-grow overflow-auto"> */}
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
              <div className="absolute right-5 mt-12 flex flex-col bg-white rounded-lg">
                <button
                  className="px-2 py-2 border border-gray-300 text-xs hover:bg-gray-300 rounded-t-lg flex"
                  onClick={handleLogout}
                >
                  <RiLogoutCircleLine size={15} className="mr-2" />
                  Log Out
                </button>
                <button
                  className="px-2 py-2 border border-gray-300 text-xs hover:bg-gray-300 rounded-b-lg border-t-0 flex"
                  onClick={handleMode}
                >
                  {darkTheme ? (
                    <>
                      <MdLightMode size={15} className="mr-2" />
                      Light Mode
                    </>
                  ) : (
                    <>
                      <MdDarkMode size={15} className="mr-2" />
                      Dark Mode
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Scrollable Content Section */}
        <div
          className="overflow-y-auto flex-grow scrollbar-hide"
          style={{ maxHeight: "calc(100vh - 100px)" }} // Adjust 100px as per header height
        >
          <div className="flex gap-3 w-full">
            <div
              className={`w-6/12 rounded-lg ${
                darkTheme
                  ? "bg-[#353935]"
                  : "bg-white  border-[1px]"
              } shadow-lg mt-1 p-3`}
            >
              <TaskPage />
            </div>
            <div className="w-6/12 flex flex-col">
              <div className="flex w-full gap-3">
                <div
                  className={`w-6/12 rounded-lg ${
                    darkTheme
                      ? "bg-[#353935]"
                      : "bg-white border-[1px]"
                  } shadow-lg mt-1 p-3 px-4 h-[170px]`}
                >
                  <Member member={displayedMembers} />
                </div>
                <div
                  className={`w-6/12 rounded-lg ${
                    darkTheme
                      ? "bg-[#353935]"
                      : "bg-white border-[1px]"
                  } shadow-lg mt-1 p-3  h-[170px]`}
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
                    ? "bg-[#353935]"
                    : "bg-white border-[1px]"
                } shadow-lg mt-4 p-3 px-4  h-[115px]`}
              >
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
                ? "bg-[#353935]"
                : "bg-white border-[1px]"
            } p-3 rounded-lg shadow-lg mt-4 `}
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
    </div>
  );
}
