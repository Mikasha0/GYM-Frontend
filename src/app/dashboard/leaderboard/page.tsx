"use client";
import Spinner from "@/components/ui/spinner";
import { useQuery } from "@tanstack/react-query";
import { getChallengesDetails } from "../challenges/page";

export default function Leaderboard() {
  const {
    data: challenges,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["challenges"], queryFn: getChallengesDetails });

  if (isLoading) {
    return (
      <div className="w-full bg-gray-100 p-3 h-full">
        <Spinner />
      </div>
    );
  }

  if (isError || !challenges) {
    return <div>Error fetching member or workout plan details</div>;
  }

  return (
    <div className="w-full p-5 bg-gray-100 h-full">
      <div className="w-full bg-white rounded-lg p-3 relative">
        <h1 className="font-semibold px-4">Challenge Categories</h1>
        <div className="flex overflow-x-auto space-x-4 p-4">
          {challenges.map((challenge: any) => (
            <button
              key={challenge.id}
              className="border border-[#A75815] text-[#A75815] px-4 py-2 whitespace-nowrap rounded-md"
            >
              {challenge.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
