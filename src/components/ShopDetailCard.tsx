import Image from "next/image";
import { MdFavoriteBorder } from "react-icons/md";

export default function ShopDetailCard({ items }: { items: any }) {
  return (
    <div className="w-full bg-white border  border-gray-200 h-[280px] rounded-lg shadow-md hover:shadow-xl">
      <Image
        height={300}
        width={185}
        src={items.photo}
        className="p-2"
        alt="profile-img"
      />
      <div className="flex-col px-2">
        <div className="flex justify-between">
          <p className="font-semibold text-xs">{items.name}</p>
          <MdFavoriteBorder />
        </div>
        <p className="text-[10px] w-full mt-2 font-light line-clamp-2">
          {items.description}
        </p>
        <div className="flex justify-between mt-1">
          <p className="text-base text-[#1400FF]">Rs.{items.price}</p>
          <button className="bg-[#1400FF] text-xs text-white rounded-sm p-1">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
