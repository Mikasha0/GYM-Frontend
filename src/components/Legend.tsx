import { useTheme } from "@/context/ThemeContext";

export default function Legend() {
  const {darkTheme} = useTheme();
  return (
    <div className="legend flex justify-end">
      <div className="flex items-center">
        <div className="w-2 h-2 rounded-full bg-[#FC4B67] mr-1"></div>
        <span className={`text-xs mr-4 ${darkTheme?'text-white':'text-balck'}`}>High</span>
      </div>
      <div className="flex items-center">
        <div className="w-2 h-2 rounded-full bg-[#FEB621] mr-1"></div>
        <span className={`text-xs mr-4 ${darkTheme?'text-white':'text-balck'}`}>Medium</span>
      </div>
      <div className="flex items-center">
        <div className="w-2 h-2 rounded-full bg-[#15C3FF] mr-1"></div>
        <span className={`text-xs mr-4 ${darkTheme?'text-white':'text-balck'}`}>Low</span>
      </div>
    </div>
  );
}
