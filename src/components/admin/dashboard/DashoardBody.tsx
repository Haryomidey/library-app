import React from "react";
import users from "../../../utils/admin/users.json";
import DashboardRowTwo from "./DashboardRowTwo";
// import LeaderBoard from "./LeaderBoard";
import Header from "../Header";
import ContentDistribution from "./ContentDistribution";
function DashboardBody() {
  return (
    <>
      <Header headerName="Dashboard" />
      <div className="space-y-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 lg:gap-10 px-10">
          {users.map((user, index) => (
            <div
              key={index}
              className=" bg-white/20 border-2 p-5 h-40 flex flex-col justify-between rounded-xl"
            >
              <div className="flex justify-between">
                <h1 className="self-center md:text-lg font-light">
                  {user.name}
                </h1>
                <div className="border-2 rounded-full p-2">
                  <img src={user.image} alt="student" />
                </div>
              </div>
              <b className="block text-xl">{user.total}</b>
            </div>
          ))}
        </div>
        <div className="px-5 lg:px-10">
          <DashboardRowTwo />
        </div>
        <div className="px-5 lg:px-10 grid grid-cols-2 lg:grid-cols-3 gap-5 py-4">
          <div className="bg-white rounded-xl w-full h-[28rem] p-5">
            <h3 className="font-semibold text-lg">Content Distribution</h3>
            <ContentDistribution />
          </div>
          <div className="grid grid-rows-2 gap-5">
          <div className="bg-white w-full h-1/2"></div>
          <div className="bg-white w-full h-1/2"></div>
          </div>
          <div className="bg-white w-full"></div>
        </div>
      </div>
    </>
  );
}

export default DashboardBody;
