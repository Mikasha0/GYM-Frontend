import React, { Dispatch, SetStateAction } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function Pagination({
  paginationData,
  page,
  setPage,
}: {
  paginationData: any;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}) {
  const itemsPerPage = 6;
  const totalPages = Math.ceil(paginationData.length / itemsPerPage);

  const selectPageHandler = (selectedPage: number) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= totalPages &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };

  return (
    <div className="mt-2 flex justify-end">
      {paginationData.length > 0 && (
        <>
          <span
            className={`text-xs border-r-0 px-2 py-1 cursor-pointer rounded-l-lg text-gray-500 ${
              page > 1 ? "hover:text-black" : "opacity-0"
            }`}
            onClick={() => selectPageHandler(page - 1)}
          >
            <div className="flex">
              <FaArrowLeft className="mt-[3px] mr-2" size={10} /> Previous
            </div>
          </span>
          {[...Array(totalPages)].map((_, i) => (
            <span
              className={`text-xs border-r-0 px-2 py-1 cursor-pointer text-gray-500 hover:bg-gray-300 hover:text-black rounded-md mr-1 ml-1 ${
                page === i + 1 ? "bg-[#8671D4] text-white" : ""
              }`}
              key={i}
              onClick={() => selectPageHandler(i + 1)}
            >
              {i + 1}
            </span>
          ))}
          {page < totalPages && (
            <span
              className="text-xs px-2 py-1 cursor-pointer rounded-r-lg text-gray-500 hover:text-black"
              onClick={() => selectPageHandler(page + 1)}
            >
              <div className="flex">
                Next
                <FaArrowRight className="mt-[3px] ml-2" size={10} />
              </div>
            </span>
          )}
        </>
      )}
    </div>
  );
}
