"use client";
import React, { useEffect, useState, useRef } from "react";
import { BiSearch } from "react-icons/bi";
import { FaBars } from "react-icons/fa";
import Sidebar from "./Sidebar";
import Cookies from "js-cookie";
import { MdClose } from "react-icons/md";
function Header({ headerName }: any) {
  const [openState, setOpenState] = useState(false);
  const [userState, setUserState] = useState<any>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const HandleToggleClick = () => {
    setOpenState(!openState);
  };

  const initialGetter = (value: string) => {
    return value.charAt(0);
  };

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

  useEffect(() => {
    let user = Cookies.get("user");
    user && setUserState(JSON.parse(user));
  }, []);

  return (
    <div className="bg-white sticky top-0 py-3 border-b-2 z-20 w-full">
      <ul className="flex justify-between px-10 [&>*]:self-center">
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
          <div className="absolute left-0 ">
            <Sidebar openState={openState} sidebarRef={sidebarRef} />
          </div>
        </div>
        <div className="flex gap-5 [&>*]:self-center">
          <div className="border-2 p-2 rounded-lg">
            <BiSearch className="text-xl self-center" />
          </div>
          <div className="bg-red-200 w-10 h-10 text-center rounded-full flex flex-col justify-center">
            {userState&&<span className="font-semibold text-lg">
              {initialGetter(userState?.first_name) +
                "" +
                initialGetter(userState?.last_name)}
            </span>}
          </div>
          <h3>{`${userState?.first_name} ${userState?.last_name}`}</h3>
        </div>
      </ul>
    </div>
  );
}

export default Header;
