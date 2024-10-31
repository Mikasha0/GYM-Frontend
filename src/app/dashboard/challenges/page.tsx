"use client";
import ChallengeDetailsCard from "@/components/challengeDetailsCard";
import ChallengesForm from "@/components/form/ChallengesForm";
import Spinner from "@/components/ui/spinner";
import { createChallengesSchema } from "@/types/z.schema.types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { RiAddLargeFill } from "react-icons/ri";
import { z } from "zod";
import { getMemberDetails } from "../page";
import ChallengePlaceholder from "@/components/ChallengePlaceholder";
export type challengeType = z.infer<typeof createChallengesSchema>;
export const getChallengesDetails = async (): Promise<challengeType[]> => {
  const data = await fetch("/api/challenges");
  if (!data.ok) {
    throw new Error("Network response was not ok");
  }
  const jsonData = await data.json();
  return jsonData as challengeType[];
};

export default function Challenges() {
  const [show, setShow] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");

  const {
    data: challenges,
    isLoading: challengesLoading,
    error: challengesError,
  } = useQuery({ queryKey: ["challenges"], queryFn: getChallengesDetails });

  const {
    data: membersData,
    isLoading: membersLoading,
    error: membersError,
  } = useQuery({
    queryKey: ["members"],
    queryFn: getMemberDetails,
  });

  if (challengesLoading || membersLoading) {
    return (
      <div className="w-full bg-gray-100 p-3 min-h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (challengesError || membersError || !challenges || !membersData) {
    return (
      <div>
        Error occurred: {challengesError?.message || membersError?.message}
      </div>
    );
  }

  const handleSearch = () => {
    const filterChallenges = challenges.filter((challenge: any) =>
      challenge.name.toLowerCase().includes(searchText.toLowerCase())
    );
    return filterChallenges;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const displayedChallenges = searchText ? handleSearch() : challenges;

  const handleProductModal = () => {
    setShow(!show);
  };

  return (
    <div className="w-full py-5 pr-5 bg-gray-100 min-h-screen flex flex-col">
      <div className="w-full bg-white rounded-2xl p-3 flex-grow flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 flex justify-between">
            <h1 className="font-semibold">Challenges</h1>
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
          <div className="px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3">
            {challenges.length == 0 && <ChallengePlaceholder />}
            {displayedChallenges.map((challenge: any) => (
              <ChallengeDetailsCard
                challenge={challenge}
                key={challenge.id}
                member={membersData}
              />
            ))}
          </div>
        </div>

        {show && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
            <div className="bg-white p-5 rounded shadow-lg w-4/12">
              <div className="flex justify-between">
                <h1 className="font-semibold mb-1">Add Challenges</h1>
                <button
                  onClick={handleProductModal}
                  className="text-gray-400 text-xl mb-1"
                >
                  &times;
                </button>
              </div>
              <ChallengesForm updateSetShow={setShow} />
            </div>
          </div>
        )}
        <div className="flex justify-end p-3">
          <button
            className="bg-white text-black border border-1 text-2xl rounded-full px-3 py-3 shadow-lg"
            onClick={handleProductModal}
          >
            <RiAddLargeFill size={25} />
          </button>
        </div>
      </div>
    </div>
  );
}
