import React, { RefObject, useState } from "react";
import navs from "../../utils/admin/navs.json";
import { Link, useNavigate } from "react-router-dom";

import { FiLogOut } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

import Cookies from "js-cookie";
import Swal from "sweetalert2";


type SidebarProps = {
  openState: boolean
  sidebarRef: RefObject<HTMLDivElement>
}

function Sidebar(props: SidebarProps) {
  const route = useNavigate();
  const [isManagementClicked, setIsManagementClicked] = useState<boolean>()

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
      text: "You have been logged"
    });
  };

  const handleManagementClicked = () => {
    setIsManagementClicked(prev => !prev)
  }

  return (
    <div
      ref={props.sidebarRef as React.RefObject<HTMLDivElement>}
      className={
        props.openState
          ? `absolute h-screen w-screen md:w-[25vw] duration-300 lg:w-[18vw] overflow-hidden top-4 bg-white`
          : "absolute h-screen w-0 overflow-hidden duration-300 top-4 bg-white"
      }
    >
      <ul className="flex flex-col gap-8 py-20">
        {navs.map((nav, index) => (
          index === 1 ? 
            <div key={index} className="flex flex-col gap-4 ">
                <div className="flex gap-4 whitespace-nowrap border-blue-500 hover:border-l-4 px-5 hover:text-blue-500 transition-all ease duration-300 cursor-pointer" onClick={handleManagementClicked}>
                  <FaUsers className="text-2xl" />
                  <div className="flex items-center gap-1">
                    <h2>User Management</h2>
                    <MdOutlineKeyboardArrowDown />
                  </div>
                </div>
              <ul className={`flex-col gap-3 px-6 ${isManagementClicked ? 'flex' : 'hidden'}`}>
                <li onClick={() => handleRouting('/admin/user-management/teacher')} className="list-disc mx-5"><Link to='/admin/user-management/teacher'>Teacher</Link></li>
                <li onClick={() => handleRouting('/admin/user-management/student')} className="list-disc mx-5"><Link to=''>Student</Link></li>
              </ul>
            </div>
            :
            <div
              key={index}
              onClick={() => handleRouting(nav.path)}
              className="flex whitespace-nowrap gap-4 group border-blue-500 hover:border-l-4 px-5 hover:text-blue-500 transition-all ease duration-300 cursor-pointer"
            >
              <img src={nav.image} alt="" className="w-6" />
              <li>{nav.name}</li>
            </div>
        ))}
      </ul>

      <button className='absolute left-5 bottom-[15%] shadow-sm text-red-600 px-4 py-2 rounded-md border border-[#d9d9d9] min-w-[fit-content] flex items-center gap-2' onClick={handleLogout}>
        Logout
        <FiLogOut />
      </button>

    </div>
  );
}

export default Sidebar;
