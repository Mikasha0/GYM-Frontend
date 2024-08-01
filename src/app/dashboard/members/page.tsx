"use client";
import MemberDetailsCard from "@/components/ui/memberDetailsCard";
import Spinner from "@/components/ui/spinner";
import { UserData } from "@/types/userdata.type";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";

async function fetchMembers(): Promise<UserData[]> {
  const res = await fetch(`http://localhost:2000/users`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
}

export default function Members() {
  const [searchText, setSearchText] = useState<string>("");

  const {
    data: members,
    isLoading,
    isError,
  }: UseQueryResult<UserData[], Error> = useQuery({
    queryKey: ["members"],
    queryFn: fetchMembers,
  });

  if (isLoading) {
    return (
      <div className="w-full bg-gray-100 p-3 h-full">
        <Spinner />
      </div>
    );
  }

  if (isError || !members) {
    return <div>Error fetching members</div>;
  }
  const handleSearch = () => {
    const filteredMembers = members.filter((member) =>
      member.firstname.toLowerCase().includes(searchText.toLowerCase())
    );
    return filteredMembers;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const displayedMembers = searchText ? handleSearch() : members;

  return (
    <div className="w-full bg-gray-100 p-5 h-full">
      <div className="w-full bg-white p-3 rounded-lg shadow-lg">
      <div className="w-full bg-white rounded-lg flex-shrink-0 sticky top-0 z-10">
          <div className="p-4 flex justify-between">
            <h1 className="font-semibold">Members</h1>
            <div className="relative">
              <input
                type="text"
                className="border border-gray-300 w-[300px] pl-8 pr-3 text-sm py-[4px] rounded-2xl"
                placeholder="Search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <IoIosSearch className="absolute left-2 top-[6px] text-gray-400" />
            </div>
          </div>
        </div>
        <div className="px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {displayedMembers.map((member: UserData) => (
            <MemberDetailsCard member={member} key={member.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
