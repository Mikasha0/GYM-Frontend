import { useTheme } from "@/context/ThemeContext";
import { UserData } from "@/types/userdata.type";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { BsFire } from "react-icons/bs";
import { IoPersonCircleSharp } from "react-icons/io5";

export default function MemberDetailsCard({ member }: { member: UserData }) {
  const {themeClasses} = useTheme();
  return (
    <Link href={`/dashboard/members/${member.id}`} key={member.id}>
      <div className={`w-full ${themeClasses.card} border p-3 border-gray-200 h-[245px] rounded-lg shadow-md hover:shadow-xl`}>
        <div className="flex justify-end">
          <BsFire className="text-red-400" />
          <p className={`text-sm font-semibold -mt-[3px] pl-2 ${themeClasses.text}`}>
            {member.streak}
          </p>
        </div>

        <div className="flex justify-center">
          {member.profile ? (
            <Image
              src={member.profile}
              className="rounded-full"
              width={85}
              height={85}
              alt="profile-img"
            />
          ) : (
            <IoPersonCircleSharp size={85} />
          )}
        </div>
        <div className="flex-col text-center mt-4">
          <p className={`font-semibold text-xs ${themeClasses.text}`}>
            {member.firstname} {member.lastname}
          </p>
          <p className={`text-xs w-full truncate mt-2 ${themeClasses.text}`}>{member.email}</p>
          <button className="mt-5 bg-[#8671D4] text-xs text-white px-3 py-[5px] rounded-sm">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
}

interface WithNonMemberTagProps {
  member: UserData;
}
export const WithNonMemberTag = (Component: FC<WithNonMemberTagProps>) => {
  const EnhancedComponent: FC<WithNonMemberTagProps> = ({ member }) => {
    return (
      <div className="relative">
             <div className="absolute top-1 left-2">
            <span className="inline-block px-2 py-[3px] text-[9px] font-semibold text-[#8671D4] bg-gray-200 rounded-md">
              Trial Member
            </span>
          </div>
        <Component member={member} />
      </div>
    );
  };

  return EnhancedComponent;
};

export const EnhancedMemberDetailsCard = WithNonMemberTag(MemberDetailsCard);
