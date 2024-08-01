"use client";
import UpdateUserDetailsForm from "@/components/form/UpdateUserDetailsForm";
import { UserData } from "@/types/userdata.type";
// import WorkoutPlanner from "@/components/WorkoutPlanner";
// import StreakTracker from "@/components/StreakTracker";
import UpdateBodyMetricsForm from "@/components/form/UpdateBodyMetricsForm";
import UpdateSubscriptionForm from "@/components/form/UpdateSubscriptionForm";
import Spinner from "@/components/ui/spinner";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import Image from 'next/image';
import { useState } from "react";

async function getMemberDetailsById(
  memberId: number | undefined
): Promise<UserData> {
  const res = await fetch(`http://localhost:2000/users/${memberId}`)
  if (!res.ok) {
    throw new Error("Failed to fetch member details");
  }
  return res.json();
}

export default function MemberDetails({
  params,
}: {
  params: { memberId: number | undefined };
}) {
  const [showIndex, setShowIndex] = useState<number | null>(0);
  const index = [0, 1, 2];

  const {
    data: member,
    isLoading: isMemberLoading,
    isError: isMemberError,
  }: UseQueryResult<UserData, Error> = useQuery({
    queryKey: ["member", params.memberId],
    queryFn: () => getMemberDetailsById(params.memberId),
  });

  if (isMemberLoading) {
    return (
      <div className="w-full bg-gray-100 p-3 h-full">
        <Spinner />
      </div>
    );
  }

  if (isMemberError || !member) {
    return <div>Error fetching member or workout plan details</div>;
  }

  return (
    <div className="w-full bg-gray-100 p-5">
      <div className="w-full bg-white p-4 rounded-lg shadow-lg ">
        <h1 className="font-semibold">User Profile</h1>
        <div className="border border-gray-200 bg-white flex  shadow-lg p-4 rounded-lg mt-4 items-center">
          <Image
            src={member.profile}
            className="rounded-full"
            width={80}
            height={80}
            alt="profile-img"
          />
          <div>
            <p className="ml-6 text-gray-400 font-light text-xs">Name</p>
            <p className="font-semibold text-xs ml-6 mt-1">
              {member.firstname} {member.lastname}
            </p>
          </div>
          <div>
            <p className="font-light text-xs  ml-12 text-gray-400 ">
              Designation
            </p>
            <p className="font-semibold text-xs  ml-12 mt-1">Member</p>
          </div>
          <div>
            <p className="font-light text-xs  ml-12 text-gray-400">Email</p>
            <p className="font-semibold text-xs  ml-12 mt-1">{member.email}</p>
          </div>
        </div>
        <div className="p-4 border border-gray-200 shadow-lg rounded-lg mt-2">
          <UpdateUserDetailsForm
            memberDetails={member}
            showItem={index[0] === showIndex ? true : false}
            setShowIndex={() => {
              if (index[0] === showIndex) {
                setShowIndex(null);
              } else {
                setShowIndex(index[0]);
              }
            }}
          />
        </div>
        <div className="p-4 border border-gray-200 shadow-lg rounded-lg mt-2">
          <UpdateBodyMetricsForm
            memberDetails={member}
            showItem={index[1] === showIndex ? true : false}
            setShowIndex={() => {
              if (index[1] === showIndex) {
                setShowIndex(null);
              } else {
                setShowIndex(index[1]);
              }
            }}
          />
        </div>
        <div className="p-4 border border-gray-200 shadow-lg rounded-lg mt-2">
          <UpdateSubscriptionForm
            memberDetails={member}
            showItem={index[2] === showIndex ? true : false}
            setShowIndex={() => {
              if (index[2] === showIndex) {
                setShowIndex(null);
              } else {
                setShowIndex(index[2]);
              }
            }}
          />
        </div>
      </div>
      {/* <StreakTracker member={member} />
          <WorkoutPlanner member={member} /> */}
    </div>
  );
}
