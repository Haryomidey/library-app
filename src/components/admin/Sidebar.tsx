import React, { useState } from "react";
import navs from "../../utils/admin/navs.json";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { FiLogOut } from "react-icons/fi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { GiTeacher } from "react-icons/gi";
import { PiStudent } from "react-icons/pi";

import Cookies from "js-cookie";
import Swal from "sweetalert2";

function Sidebar() {
  const route = useNavigate();
  const location = useLocation();
  const [isManagementClicked, setIsManagementClicked] = useState<boolean>(false);

  const handleRouting = (path: string) => {
    route(path);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");

    sessionStorage.removeItem("card_user_token");
    sessionStorage.removeItem("card_user_user");
    route("/");

    Swal.fire({
      title: "Logged Out!",
      icon: "success",
      text: "You have been logged out"
    });
  };

  const handleManagementClicked = () => {
    setIsManagementClicked(prev => !prev);
  };
  

  const userManagementPaths = ["/admin/user-management/teacher", "/admin/user-management/student"];

  return (
    <div
      className={`h-full w-full overflow-hidden duration-300 relative`}
    >
      <ul className="flex flex-col gap-8 pt-16">
        {navs.map((nav, index) => (
          index === 1 ? 
            <div key={index} className="flex flex-col gap-4">
              <div
                className="flex gap-4 whitespace-nowrap border-blue-500 hover:border-l-4 px-5 hover:text-blue-500 transition-all ease duration-300 cursor-pointer"
                onClick={handleManagementClicked}
              >
                <div>
                  <img
                    src={userManagementPaths.includes(location.pathname) ? nav.active : nav.image}
                    alt=""
                    className="min-w-6"
                  />
                </div>
                <div className="hidden lg:flex items-center gap-1">
                  <h2>User Management</h2>
                  <MdOutlineKeyboardArrowDown />
                </div>
              </div>
              <ul className={`flex-col gap-4 pl-3 lg:pl-8 mt-3 ${isManagementClicked ? 'flex' : 'hidden'}`}>
                <li onClick={() => handleRouting('/admin/user-management/teacher')} className="list-none lg:list-disc mx-5">
                  <Link
                    to='/admin/user-management/teacher'
                    className={`flex items-center gap-2 ${
                      location.pathname === '/admin/user-management/teacher' ? 'text-blue-500' : ''
                    }`}
                  >
                    <div className='block lg:hidden'>
                      <GiTeacher className="text-lg" />
                    </div>
                    <span className="hidden lg:inline">Teacher</span>
                  </Link>
                </li>
                <li onClick={() => handleRouting('/admin/user-management/student')} className="list-none lg:list-disc mx-5">
                  <Link
                    to='/admin/user-management/student'
                    className={`flex items-center gap-2 ${
                      location.pathname === '/admin/user-management/student' ? 'text-blue-500' : ''
                    }`}
                  >
                    <div className='block lg:hidden'>
                      <PiStudent className="text-lg" />
                    </div>
                    <span className="hidden lg:inline">Student</span>
                  </Link>
                </li>
              </ul>
            </div>
          :
            <div
              key={index}
              onClick={() => handleRouting(nav.path)}
              className="flex whitespace-nowrap gap-4 group border-blue-500 hover:border-l-4 px-5 hover:text-blue-500 transition-all ease duration-300 cursor-pointer"
            >
              <div>
                <img
                  src={location.pathname === nav.path ? nav.active : nav.image}
                  alt=""
                  className="min-w-6"
                />
              </div>
              <li className="hidden lg:block">{nav.name}</li>
            </div>
        ))}
      </ul>

      <button className='absolute left-5 bottom-[8%] shadow-sm text-red-600 px-4 py-2 rounded-md border border-[#d9d9d9] min-w-[fit-content] hidden lg:flex items-center gap-2' onClick={handleLogout}>
        Logout
        <FiLogOut />
      </button>
      <div className='absolute left-0 bottom-[8%] w-full grid place-items-center'>
        <button className='text-red-600 px-4 py-2 rounded-md border border-[#d9d9d9] min-w-[fit-content] block lg:hidden items-center gap-2' onClick={handleLogout}>
          <FiLogOut />
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
