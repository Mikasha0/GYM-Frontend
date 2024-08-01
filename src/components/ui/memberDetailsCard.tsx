import { UserData } from "@/types/userdata.type";
import Link from "next/link";
import { BsFire } from "react-icons/bs";
import { IoPersonCircleSharp } from "react-icons/io5";
import Image from 'next/image'

export default function MemberDetailsCard({ member }: { member: UserData }) {
  return (
    <Link href={`/dashboard/members/${member.id}`} key={member.id}>
      <div className="w-full bg-white border p-3 border-gray-200 h-[250px] rounded-lg shadow-md hover:shadow-xl">
        <div className="flex justify-end">
          <BsFire className="text-red-400" />
          <p className="text-sm font-semibold -mt-[3px] pl-2">
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
            <IoPersonCircleSharp size={85}/>

          )}
        </div>
        <div className="flex-col text-center mt-4">
          <p className="font-semibold text-xs">
            {member.firstname} {member.lastname}
          </p>
          <p className="text-xs w-full truncate mt-2">{member.email}</p>
          <button className="mt-5 bg-[#A75815] text-xs text-white px-3 py-[5px] rounded-sm">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
}
