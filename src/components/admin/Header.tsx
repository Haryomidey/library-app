"use client";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Cookies from "js-cookie";

import { BiSearch } from "react-icons/bi";
import { FaBars } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { FaArrowLeftLong } from "react-icons/fa6";

function Header({ headerName }: any) {
  const [openState, setOpenState] = useState(false);
  const [searchState, setSearchState] = useState(false);
  const [userState, setUserState] = useState<any>(null);
  const [searchItems, setSearchItems] = useState<string>('');
  const sidebarRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useNavigate();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;
    setSearchItems(value)
  }

  const initialGetter = (value: string) => {
    return value.charAt(0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log("Enter key pressed");
      router(`/admin/subjects?q=${searchItems}`)

    }
  }

  const handleGoBack = () => {
    window.history.back();
  };

  useEffect(() => {
    const menuOutsideClick = (e: MouseEvent) => {
      if (searchRef && searchRef.current?.contains(e.target as Node)) {
        setSearchState(true);
      }
      else {
        setSearchState(false);
      }
    }
  
    document.addEventListener('mousedown', menuOutsideClick);
  
    return () => {
      document.removeEventListener('mousedown', menuOutsideClick);
    }
      
  }, []);

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
          <div className="flex items-center gap-2 ml-4">
            <p className="cursor-pointer" onClick={handleGoBack}><FaArrowLeftLong /></p>
            <h1 className="hidden lg:block font-semibold self-center">{headerName}</h1>
          </div>
        </div>
        <div>
          <div className="absolute left-0 ">
            <Sidebar openState={openState} sidebarRef={sidebarRef} />
          </div>
        </div>
        <div className="flex gap-5 [&>*]:self-center">
        <div className="border-2 p-2 rounded-lg cursor-pointer relative">
            {
              searchState ?
              <BiSearch className="text-lg lg:text-xl self-center"  onClick={() => setSearchState(false)} />
              :
              <BiSearch className="text-lg lg:text-xl self-center"  onClick={() => setSearchState(true)} />
            }

            <div ref={searchRef} className={`absolute w-[180px] h-[70px] shadow-md bg-white border top-12 right-0 p-2 transition-transform ease duration-300 ${searchState ? 'scale-1' : 'scale-0'}`}>
              <input 
                type="text"
                className="w-full h-full border px-2"
                placeholder="Search..."
                value={searchItems}
                onChange={handleSearch}
                onKeyDown={handleKeyDown}
                autoFocus={true}
              />
            </div>
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
