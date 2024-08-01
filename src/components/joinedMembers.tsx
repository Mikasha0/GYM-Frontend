import { getMemberDetails } from "@/app/dashboard/page";
import { useQuery } from "@tanstack/react-query";
import Spinner from "./ui/spinner";
import Image from 'next/image'

export default function JoinedMembers() {
    const {
        data: member,
        isLoading,
        isError,
      } = useQuery({ queryKey: ["challenges"], queryFn: getMemberDetails });
    
      if (isLoading) {
        return (
          <div className="w-full bg-gray-100 p-3 h-full">
            <Spinner />
          </div>
        );
      }
    
      if (isError || !member) {
        return <div>Error fetching member or workout plan details</div>;
      }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
    {member.slice(0, 3).map((member_image) => (
      <Image
        src={member_image.profile}
        key={member_image.id}
        className="w-[40px] h-[40px] rounded-full mt-5"
        alt="profile-img"
      />
    ))}
    {member.length > 3 && (
      <span className="text-xs text-black font-semibold mt-8">
        +{member.length - 3} more
      </span>
    )}
  </div>  )
}
