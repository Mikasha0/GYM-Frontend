import { UserData } from "@/types/userdata.type";
import Image from "next/image";
import { useState } from "react";
import MoreMembersCard from "./moreMembersCard";

export default function Member({ member }: { member: UserData[] }) {
  const [showMembers, setShowMembers] = useState<boolean>(false);
  const [joinedMembers, setJoinedMembers] = useState<boolean>(false);
  const showFullMembers = () => {
    setShowMembers(!showMembers);
  };

  const showJoinedMembers = () => {
    setJoinedMembers(!joinedMembers);
  };

  const handleClose = () => {
    setJoinedMembers(!joinedMembers);
  };

  return (
    <>
      <h1 className="font-semibold text-sm">Members</h1>
      <div className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
        {member.slice(0, 3).map((member_image) => (
          <Image
            src={member_image.profile}
            key={member_image.id}
            className="rounded-full mt-5"
            width={40}
            height={40}
            alt="profile-img"
          />
        ))}
        {member.length > 3 && (
          <span
            className={`text-xs text-black font-semibold mt-8 cursor-pointer hover:text-red-400 ${
              showMembers ? "text-red-400" : ""
            }`}
            onClick={showFullMembers}
          >
            +{member.length - 3} more
          </span>
        )}
        {showMembers && (
          <MoreMembersCard
            member={member}
            setShowMembers={setShowMembers}
            showMembers={showMembers}
          />
        )}
      </div>

      <h1 className="font-semibold text-sm mt-5">Recently Joined</h1>
      <div className=" relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
        {member
          .slice(-3)
          .reverse()
          .map((member_image) => (
            <Image
              src={member_image.profile}
              key={member_image.id}
              className="rounded-full mt-5"
              width={40}
              height={40}
              alt="profile-img"
            />
          ))}
        {member.length > 3 && (
          <span
            className={`text-xs text-black font-semibold mt-8 cursor-pointer hover:text-red-400 ${joinedMembers?"text-red-400":""}`}
            onClick={showJoinedMembers}
          >
            +{member.slice(-2).length} more
          </span>
        )}
        {joinedMembers && (
          <div className="absolute w-[220px] right-2 px-4 py-2 mt-12 w-28 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white z-10">
            <div className="flex justify-between">
              <h1 className="font-semibold mt-1">Recently Joined </h1>
              <button
                className="text-gray-400 text-xl mb-1"
                onClick={handleClose}
              >
                &times;
              </button>
            </div>
            <div className="flex flex-col mb-4">
              {member
                .slice(-5)
                .reverse()
                .map((members: UserData) => (
                  <ul key={members.id} className="flex flex-col">
                    <div className="flex">
                      <Image
                        src={members.profile}
                        className="rounded-full mt-2"
                        width={20}
                        height={20}
                        alt="profile-img"
                      />
                      <p className="mt-3 text-xs ml-2 font-light">
                        {members.firstname} {members?.middlename}{" "}
                        {members.lastname}
                      </p>
                    </div>
                  </ul>
                ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
