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

export const getMemberDetails = async (): Promise<UserData[]> => {
  const data = await fetch(`https://haster-gym-server.onrender.com/users`);
  if (!data.ok) {
    throw new Error("Network response was not ok");
  }
  return data.json();
};

export default function Dashboard() {
  const [value, setValue] = useState("");

  const {
    data: members,
    isError,
    isLoading,
  } = useQuery({ queryKey: ["members"], queryFn: getMemberDetails });

  if (isLoading) {
    return (
      <div className="w-full bg-gray-100 p-3 h-full">
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

  return (
    <div className="w-full bg-gray-100 p-5 min-h-screen flex flex-col">
      <div className="w-full bg-white p-3 rounded-lg shadow-lg flex-grow flex flex-col">
        <div className="w-full bg-white rounded-lg flex-shrink-0 sticky top-0 z-10">
          <div className="flex justify-between">
            <div>
              <h1 className="font-bold"><Greeting/></h1>
              <h1 className="text-gray-500 text-sm font-light">
                Rise, shine and conquer the day.
              </h1>
            </div>
            <Image
              src={PROFILE_IMG}
              width={40}
              height={40}
              className=" rounded-full"
              alt="profile-img"
            />
          </div>
        </div>
        <div className="flex gap-3 w-full">
          <div className="w-6/12 rounded-lg bg-white shadow-lg mt-4 p-3 border-[1px]">
            <TaskPage />
          </div>
          <div className="w-3/12 rounded-lg bg-white shadow-lg mt-4 p-3 px-4 border-[1px] h-[230px]">
            <Member member={displayedMembers} />
          </div>
          <div className="w-3/12 rounded-lg bg-white shadow-lg mt-4 p-3 border-[1px] h-[230px]">
            <h1 className="font-semibold text-sm">Membership Details</h1>
            <MemberLineChart member={displayedMembers} />
          </div>
        </div>
        <div className="w-full bg-white p-3 rounded-lg shadow-lg mt-4 border-[1px] flex-grow">
          <div className="mb-5 flex justify-between">
            <h1 className="text-sm font-semibold">Member Sheet</h1>
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
