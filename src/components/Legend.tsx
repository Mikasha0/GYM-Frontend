export default function Legend() {
  return (
    <div className="legend flex justify-end mt-4">
      <div className="flex items-center">
        <div className="w-2 h-2 rounded-full bg-[#FC4B67] mr-1"></div>
        <span className="text-xs mr-4">High</span>
      </div>
      <div className="flex items-center">
        <div className="w-2 h-2 rounded-full bg-[#FEB621] mr-1"></div>
        <span className="text-xs mr-4">Medium</span>
      </div>
      <div className="flex items-center">
        <div className="w-2 h-2 rounded-full bg-[#15C3FF] mr-1"></div>
        <span className="text-xs">Low</span>
      </div>
    </div>
  );
}
