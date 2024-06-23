import React from "react";
import { FaCircle } from "react-icons/fa";
import LineChartComponent from "./LineChartComponent";
function DashboardRowTwo() {
  const activities = ["", ""];
  return (
    <div className="lg:grid grid-cols-5 w-full space-y-5 lg:gap-10">
      <div className="lg:col-span-3 bg-white rounded-xl w-full h-fit space-y-5 p-5">
        <h3 className="font-semibold text-lg">Engagement Rate</h3>

        <LineChartComponent/>
      </div>
      <div className="col-span-2 bg-[#FAFAFA] h-fit rounded-xl p-5">
        <h2 className="font-semibold text-lg ">Recent Activities</h2>
        <div className="md:grid lg:grid-cols-1 grid-cols-2 gap-5">
          {activities.map((activity, index) => (
            <div className="flex gap-2 py-4" key={index}>
              <img src="/images/ruby.png" className="h-fit" alt="" />
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Ruby Mars</h4>
                  <p className="text-sm">
                    Added a file to <b className="font-medium">Mathematics</b>
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
                <span className="font-light ">2 mins ago</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardRowTwo;
