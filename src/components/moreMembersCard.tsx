import { UserData } from "@/types/userdata.type";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

export default function MoreMembersCard({
  member,
  setShowMembers,
  showMembers,
}: {
  member: UserData[];
  setShowMembers: Dispatch<SetStateAction<boolean>>;
  showMembers: boolean;
}) {
  const handleClose = () => {
    setShowMembers(!showMembers);
  };
  return (
    <div className="absolute w-[220px] right-2 px-4 py-2 mt-12 w-28 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white z-10">
      <div className="flex justify-between">
        <h1 className="font-semibold mt-1">Members</h1>
        <button className="text-gray-400 text-xl mb-1" onClick={handleClose}>
          &times;
        </button>
      </div>
      <div className="flex flex-col mb-4">
        {member.map((members: UserData) => (
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
                {members.firstname} {members?.middlename} {members.lastname}
              </p>
            </div>
          </ul>
        ))}
      </div>
    </div>
  );
}
