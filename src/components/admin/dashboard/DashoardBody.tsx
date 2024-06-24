import React, { useEffect, useState } from "react";
import DashboardRowTwo from "./DashboardRowTwo";
import Header from "../Header";
import ContentDistribution from "./ContentDistribution";
import { GetAdminDashboard } from "../AdminControllers";

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


// Images import
import StudentImage from '../../../img/student.png';
import TeacherImage from '../../../img/instructor.png';
import FilesImage from '../../../img/folder.png';
import BooksImage from '../../../img/admin-books.png';
import Curve from '../../../img//curly.png';

import { TiArrowDown, TiArrowUp } from "react-icons/ti";

function DashboardBody() {

  const [dashboardInfo, setDashboardInfo] = useState<any>();
  const percentage = 40

  useEffect(() => {
    const fetchAdminDashboard = async () => {
      const data = await GetAdminDashboard();
      setDashboardInfo(data)
    }

    fetchAdminDashboard()
  }, [])

  return (
    <>
      <Header headerName="Dashboard" />
      <div className="space-y-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 lg:gap-10 px-10">
          <div
            className=" bg-white/20 border-2 p-5 h-40 flex flex-col justify-between rounded-xl"
          >
            <div className="flex justify-between">
              <h1 className="self-center md:text-lg font-light">
                Students
              </h1>
              <div className="border-2 rounded-full p-2">
                <img src={StudentImage} alt="student" />
              </div>
            </div>
            <b className="block text-xl">{dashboardInfo?.student_count}</b>
          </div>
          <div
            className=" bg-white/20 border-2 p-5 h-40 flex flex-col justify-between rounded-xl"
          >
            <div className="flex justify-between">
              <h1 className="self-center md:text-lg font-light">
                Instructors
              </h1>
              <div className="border-2 rounded-full p-2">
                <img src={TeacherImage} alt="teacher" />
              </div>
            </div>
            <b className="block text-xl">{dashboardInfo?.teacher_count}</b>
          </div>
          <div
            className=" bg-white/20 border-2 p-5 h-40 flex flex-col justify-between rounded-xl"
          >
            <div className="flex justify-between">
              <h1 className="self-center md:text-lg font-light">
                Files
              </h1>
              <div className="border-2 rounded-full p-2">
                <img src={FilesImage} alt="files" />
              </div>
            </div>
            <b className="block text-xl">{dashboardInfo?.files_count}</b>
          </div>
          <div
            className=" bg-white/20 border-2 p-5 h-40 flex flex-col justify-between rounded-xl"
          >
            <div className="flex justify-between">
              <h1 className="self-center md:text-lg font-light">
                Books
              </h1>
              <div className="border-2 rounded-full p-2">
                <img src={BooksImage} alt="books" />
              </div>
            </div>
            <b className="block text-xl">{dashboardInfo?.subject_count}</b>
          </div>
        </div>
        <div className="px-5 lg:px-10">
          <DashboardRowTwo activities={dashboardInfo} />
        </div>
        <div className="px-5 lg:px-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 py-4">
          <div className="bg-white rounded-xl w-full h-[450px] p-5">
            <h3 className="font-semibold text-lg">Content Distribution</h3>
            <ContentDistribution data={dashboardInfo?.chart} />
          </div>
          <div className="grid grid-rows-2 gap-5">
            <div className="bg-white w-full flex flex-col justify-center rounded-xl p-5">
              <h2 className="text-[#6B6F80] text-lg">Total courses enrolled</h2>
              <div className="w-full flex justify-between items-center mt-4">
                <div>
                  <h1 className="text-2xl font-bold">45</h1>
                  <div className="flex items-center gap-3 mt-4">
                    <span className="text-[#6B6F80]">Since last week</span>
                    <div className="flex items-center gap-2 text-[#CC0000]">
                      <p className="h-[20px] w-[20px] grid place-items-center rounded-full bg-[#FFE6E6]">
                        <TiArrowDown />
                      </p>
                      <p className="text-lg font-semibold">-9.3%</p>
                    </div>
                  </div>
                </div>
                <div>
                  <img src={Curve} alt="" className="w-full" />
                </div>
              </div>
            </div>
            <div className="bg-white w-full rounded-xl p-5">
              <h2 className="text-[#6B6F80] text-lg">Course completion rate</h2>
              <div className="flex items-center gap-3 mt-4">
                <div className="flex items-center gap-2 text-[#069952]">
                  <p className="text-lg font-semibold">+9.3%</p>
                  <p className="h-[20px] w-[20px] grid place-items-center rounded-full bg-[#E6FFF3]">
                    <TiArrowUp />
                  </p>
                </div>
                <span className="text-[#6B6F80]">Since last week</span>
              </div>
            </div>
          </div>
          <div className="bg-white w-full rounded-xl p-5">
            <h2 className="font-semibold text-lg">Storage Usage</h2>
            <div className="w-full mt-4">
              <div style={{height: '100%', width: '100%'}}>
                <CircularProgressbar
                  value={percentage}
                  text={`${percentage}%`}
                  styles={buildStyles({
                    pathColor: `#2B5BFC`,
                    textColor: '#000000',
                    trailColor: '#d6d6d6'
                  })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardBody;
