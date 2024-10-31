import { useTheme } from "@/context/ThemeContext";
import { UserData } from "@/types/userdata.type";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Member({ member }: { member: UserData[] }) {
  const [joinedMembers, setJoinedMembers] = useState<boolean>(false);
  const { darkTheme } = useTheme();
  const showJoinedMembers = () => {
    setJoinedMembers(!joinedMembers);
  };
  const handleClose = () => {
    setJoinedMembers(!joinedMembers);
  };

  const memberOnly = member.filter((mem) => mem.designation == "Member");
  return (
    <>
      <h1
        className={`font-semibold text-sm ${
          darkTheme ? "text-white" : "text-balck"
        }`}
      >
        Members
      </h1>
      {memberOnly.length == 0 && (
        <h1 className="w-full text-sm text-[#7C7C7C] pt-5">
          No members available
        </h1>
      )}
      <div className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
        {memberOnly.slice(0, 3).map((member_image) => (
          <Image
            src={member_image.profile}
            key={member_image.id}
            className="rounded-full mt-2"
            width={35}
            height={35}
            alt="profile-img"
          />
        ))}
        {memberOnly.length > 3 && (
          <Link href={"dashboard/members"} className="mt-4">
            <span
              className={`text-xs ${
                darkTheme ? "text-white" : "text-black"
              } font-semibold hover:text-red-400`}
            >
              +{memberOnly.length - 3} more
            </span>
          </Link>
        )}
      </div>
      <h1
        className={`font-semibold text-sm mt-3 ${
          darkTheme ? "text-white" : "text-balck"
        }`}
      >
        Recently Joined
      </h1>
      {memberOnly.length == 0 && (
        <h1 className="w-full text-sm text-[#7C7C7C] pt-5">
          No recent joiner available
        </h1>
      )}
      <div className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
        {memberOnly
          .slice(-3)
          .reverse()
          .map((member_image) => (
            <Image
              src={member_image.profile}
              key={member_image.id}
              className="rounded-full mt-2"
              width={35}
              height={35}
              alt="profile-img"
            />
          ))}
        {memberOnly.length > 3 && (
          <span
            className={`text-xs ${
              darkTheme ? "text-white" : "text-black"
            } font-semibold mt-4 cursor-pointer hover:text-red-400 ${
              joinedMembers ? "text-red-400" : ""
            }`}
            onClick={showJoinedMembers}
          >
            +{memberOnly.length - 3} more
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
              {memberOnly
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
