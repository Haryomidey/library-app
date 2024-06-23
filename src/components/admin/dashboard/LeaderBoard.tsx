import React from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import leaderboard from "../../../utils/admin/leaderboard.json";
function LeaderBoard() {
  return (
    <div className="grid lg:grid-cols-5 lg:p-5 gap-10">
      <div className="lg:col-span-3 w-full rounded-xl bg-white px-8 py-4">
        <div className="border-b-2">
          <h1 className="font-semibold text-xl py-6">Student Leadboard</h1>
          <div className="grid grid-cols-6 rounded-xl text-[#84868A]">
            <h1>RANK</h1>
            <h1 className="col-span-2">NAME</h1>
            <h1 className="text-center">COURSE</h1>
            <h1 className="text-center">HOUR</h1>
            <h1 className="text-center">POINT</h1>
          </div>
        </div>

        {leaderboard.map(
          (
            student: {
              rank: number;
              status: string;
              name: string;
              course: number;
              hour: number;
              point: string;
            },
            index: number
          ) => (
            <div className="grid grid-cols-6 py-5" key={index}>
              <div className="flex gap-1 [&>*]:self-center">
                <div className="bg-[#F5F7F9] w-8 h-8 text-center rounded-lg flex flex-col justify-center">
                  <span className="font-semibold text-sm lg:text-base">
                    {student.rank} 
                  </span>
                </div>
                {student.status === "up" ? (
                  <FaCaretUp className="text-green-500 text-lg self-center" />
                ) : (
                  <FaCaretDown className="text-red-500 text-lg self-center" />
                )}
              </div>
              <div className="flex gap-3 col-span-2">
                <img src="/images/first.png" alt="" className="self-center" />
                <h1 className="font-semibold self-center">{student.name}</h1>
              </div>
              <h2 className="text-center self-center">{student.course}</h2>
              <h2 className="text-center self-center">{student.hour}</h2>
              <h2 className="text-center self-center text-green-500">
                {student.point}
              </h2>
            </div>
          )
        )}
      </div>
      <div className="lg:col-span-2 bg-[#FAFAFA] h-fit rounded-xl p-5"></div>
    </div>
  );
}

export default LeaderBoard;
