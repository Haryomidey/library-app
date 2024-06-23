import React from "react";

import { FaAngleDown, FaEllipsisH } from "react-icons/fa";
import { BiPlusCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
function TaskBar({ total }: { total: number }) {
  const router = useNavigate();
  return (
    <div className="flex justify-between">
      <span className="self-center">
        <span className="font-semibold">{total} </span> Subjects in total
      </span>
      <div className="flex gap-4">
        {/* <div className="bg-white flex gap-5 px-4 py-2 rounded-md">
          <img
            src="/images/grid.png"
            alt=""
            className="w-5 object-cover cursor-pointer self-center"
          />
          <img
            src="/images/list.svg"
            alt=""
            className="w-5 object-cover cursor-pointer self-center"
          />
        </div>
        <div className="flex bg-white [&>*]:self-center rounded-md font-light px-4 py-2 gap-2">
          <span className="self-center">Filter</span>
          <FaAngleDown />
        </div>
        <div className="flex bg-white [&>*]:self-center rounded-md font-light px-4 py-2 gap-2">
          <FaEllipsisH />
        </div>
        */}
        <button
          onClick={() => {
            router("/admin/subjects/new");
          }}
          className="bg-blue-500 flex [&>*]:self-center gap-2 text-white rounded-md py-3 px-8"
        >
          <BiPlusCircle className="text-xl" />
          <span>Add new Subject</span>
        </button>
      </div>
    </div>
  );
}

export default TaskBar;
