import React, { useState } from "react";
import { FaAngleRight, FaSpinner } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";

interface subjectHeaderProps {
  headerName: string;
  handleSubmit: any;
  actionButtonName: string;
  loader: boolean;
}

function NewSubjectHeader({
  headerName,
  handleSubmit,
  actionButtonName,
  loader
}: subjectHeaderProps) {


  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="bg-white sticky top-0 py-3 border-b-2 w-full h-fit">
      <ul className="flex justify-between px-10 [&>*]:self-center">
      <div className="flex items-center gap-2 ml-4 cursor-pointer">
            <p onClick={handleGoBack}><FaArrowLeftLong /></p>
            <h1 className="hidden text-black lg:block font-semibold self-center">{headerName}</h1>
          </div>
        <div className="flex gap-5 [&>*]:self-center">

          <button
            onClick={handleSubmit}
            className="bg-blue-500 flex [&>*]:self-center gap-2 text-white rounded-md py-2 px-8"
          >
            {loader ? (
              <FaSpinner className="animate-spin" />
            ) : (
              <>
                <span>{actionButtonName}</span>
                <FaAngleRight />
              </>
            )}
          </button>
        </div>
      </ul>
    </div>
  );
}

export default NewSubjectHeader;
