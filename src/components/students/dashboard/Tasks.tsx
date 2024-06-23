import React from "react";
import tasks from "../../../utils/students/tasks.json";
import { FaCircle } from "react-icons/fa";
function Tasks() {
  return (
    <div className="grid lg:grid-cols-2 gap-10">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 w-full">
        {tasks.map(
          (
            task: { name: string; image: string; total: number },
            index: number
          ) => (
            <div
              key={index}
              className="flex flex-col  justify-center rounded-xl bg-[#FAFAFA] space-y-2 border-2 self-center py-3 h-fit text-center mx-auto w-full"
            >
              <img src={task.image} alt="" className="mx-auto self-center" />
              <h1>{task.name}</h1>
              <b className="text-lg">{task.total}</b>
            </div>
          )
        )}
      </div>
      <div className="bg-[#FAFAFA] p-4 rounded-xl border-2">
        <h1 className="font-semibold text-lg">Announcements</h1>
        <li className="flex gap-2 [&>*]:self-center p-3 border-b-2 ">
          <FaCircle className="text-xs text-[#F5C451]" />
          <span>Founder's Day</span>
        </li>
        <li className="flex gap-2 [&>*]:self-center p-3 border-b-2 ">
          <FaCircle className="text-xs text-[#4E0D76]" />
          <span>Inter-school sports</span>
        </li>
      </div>
    </div>
  );
}

export default Tasks;
