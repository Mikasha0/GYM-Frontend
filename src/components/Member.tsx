import { UserData } from "@/types/userdata.type";
import Image from "next/image";
import { useState } from "react";
import MoreMembersCard from "./moreMembersCard";

export default function Member({ member }: { member: UserData[] }) {
  const [showMembers, setShowMembers] = useState<boolean>(false);
  const showFullMembers = () => {
    setShowMembers(!showMembers);
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
            className="text-xs text-black font-semibold mt-8 cursor-pointer hover:text-red-400 "
            onClick={showFullMembers}
          >
            +{member.length - 3} more
          </span>
        )}
        {showMembers && (
        <MoreMembersCard member={member} setShowMembers={setShowMembers} showMembers={showMembers}/>
        )}
      </div>

      <h1 className="font-semibold text-sm mt-5">Recently Joined</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
        {member.slice(-3).map((member_image) => (
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
          <span className="text-xs text-black font-semibold mt-8">
            +{member.length - 3} more
          </span>
        )}
      </div>
    </>
  );
}
