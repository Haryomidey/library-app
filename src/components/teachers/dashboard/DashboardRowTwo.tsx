import React from "react";
import { FaCircle } from "react-icons/fa";
import LineChartComponent from "./LineChartComponent";
import timeAgo from "../../../utils/time-converter";


function DashboardRowTwo(activities: any) {

  const acts = activities?.activities?.activities

  
  return (
    <div className="lg:grid grid-cols-5 w-full h-[350px] lg:gap-10">
      <div className="lg:col-span-3 bg-white rounded-xl w-full h-full p-5">
        <h3 className="font-semibold text-lg pb-6">Engagement Rate</h3>
        <div className="-ml-5">
          <LineChartComponent/>
        </div>
      </div>
      <div className="col-span-2 bg-white h-full rounded-xl p-5">
        <h2 className="font-semibold text-lg ">Recent Activities</h2>
        <div className="md:grid lg:grid-cols-1 grid-cols-2 gap-3 h-full">
          {acts && acts.length > 0 && acts?.map((activity: any, index: number) => (
            <div className="flex gap-2 py-2" key={index}>
              <img src="/images/ruby.png" className="h-fit" alt="" />
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">{activity.name}</h4>
                  <p className="text-sm">
                    {activity.description}
                  </p>
                </div>
                <div>
                  <div className="flex gap-2">
                    <img src="/images/pdf.png" alt="pdf" className="h-fit" />
                    <div>
                      <h3 className="font-medium">Meeting Minute</h3>
                      <div className="flex gap-5">
                        <span className="text-black/70">PDF FILE</span>
                        <div className="flex gap-2">
                          <FaCircle className="self-center text-[10px] text-slate-400" />
                          <li className="list-none text-slate-400">720 KB</li>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <span className="font-light ">{timeAgo(activity.time)}</span>
              </div>
            </div>
          ))}

          {acts && acts.length < 0 && <div className="flex items-center justify-center w-full h-full text-center font-semibold text-2xl">No data yet!!!</div>}
        </div>
      </div>
    </div>
  );
}

export default DashboardRowTwo;
