"use client";
import React, { useState, useRef, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { FaBars } from "react-icons/fa";
import Sidebar from "./SideBar";
import { MdClose } from "react-icons/md";
function Header({ headerName }: any) {

  const [openState, setOpenState] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const menuOutsideClick = (e: MouseEvent) => {
      if (sidebarRef && sidebarRef.current?.contains(e.target as Node)) {
        setOpenState(true);
      }
      else {
        setOpenState(false);
      }
    }
  
    document.addEventListener('mousedown', menuOutsideClick);
  
    return () => {
      document.removeEventListener('mousedown', menuOutsideClick);
    }
      
  }, []);

  return (
    <div className="bg-white sticky z-20 top-0 py-3 border-b-2 w-full h-16 flex flex-col justify-center">
      <ul className="flex justify-between px-5 lg:px-10 [&>*]:self-center">
        <div className="flex gap-5 [&>*]:self-center">
          <div>
            {openState ?
              <MdClose onClick={() => setOpenState(false)} className="z-20 cursor-pointer" />
              :
              <FaBars onClick={() => setOpenState(true)} className="z-20 cursor-pointer" />
            }
          </div>

          <div className="hidden lg:flex gap-4">
            <h1 className="font-semibold self-center">{headerName}</h1>
          </div>
        </div>
        <div>
          <div className="absolute left-0">
            <Sidebar openState={openState} sidebarRef={sidebarRef} />
          </div>
        </div>
        <div className="flex gap-2 lg:gap-5 [&>*]:self-center">
          <div className="border-2 p-2 rounded-lg">
            <BiSearch className="text-lg lg:text-xl self-center" />
          </div>
          <img src="/images/student-avatar.png" alt="feyi" />
          <div className="hidden lg:flex flex-col text-sm text-slate-500 self-center">
            <h3>Feyisayo</h3>
            <span>Grade 10</span>
          </div>
        </div>
      </ul>
    </div>
  );
}

export default Header;
