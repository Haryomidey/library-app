import React, { RefObject } from "react";
import navs from "../../utils/students/navs.json";
import { useNavigate } from "react-router-dom";


import { FiLogOut } from "react-icons/fi";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

type SidebarProps = {
  openState: boolean
  sidebarRef: RefObject<HTMLDivElement>
}

function Sidebar(props: SidebarProps) {
  const route = useNavigate();
  const handleRouting = (path: string) => {
    route(path);
  };

  const handleLogout = () => {
    // Clear cookies
    Cookies.remove("token");
    Cookies.remove("user");

    // Clear sessionStorage
    sessionStorage.removeItem("card_user_token");
    sessionStorage.removeItem("card_user_user");
    route("/");

    Swal.fire({
      title: "Logged Out!",
      icon: "success",
      text: "You have been logged out"
    });
  };

  return (
    <div
    ref={props.sidebarRef as React.RefObject<HTMLDivElement>}
      className={
        props.openState
          ? `absolute h-screen w-screen md:w-[50vw] duration-300 lg:w-[18vw] overflow-hidden top-4 bg-white`
          : "absolute h-screen w-0 overflow-hidden duration-300 top-4 bg-white"
      }
    >
      <ul className="flex flex-col gap-8 py-20">
        {navs.map((nav, index) => (
          <div
            key={index}
            onClick={() => handleRouting(nav.path)}
            className="flex whitespace-nowrap gap-4 group border-blue-500 hover:border-l-4 px-5 hover:text-blue-500 cursor-pointer"
          >
            <img src={nav.image} alt="" className="w-6" />
            {/* <FaGraduationCap className="self-center group-hover:text-blue-500" /> */}
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
