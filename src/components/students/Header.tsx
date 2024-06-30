import { useState, useRef, useEffect } from "react";
import Sidebar from "./SideBar";
import { useNavigate } from "react-router-dom";

import { BiSearch } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import { FaBars } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";



function Header({ headerName }: any) {

  const [openState, setOpenState] = useState(false);
  const [searchState, setSearchState] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const [searchItems, setSearchItems] = useState<string>('');
  const router = useNavigate();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;
    setSearchItems(value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log("Enter key pressed");
      router(`/student/subjects?q=${searchItems}`)

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

          <div className="flex items-center gap-2 ml-4">
            <p className="cursor-pointer" onClick={handleGoBack}><FaArrowLeftLong /></p>
            <h1 className="hidden lg:block font-semibold self-center">{headerName}</h1>
          </div>
        </div>
        <div>
          <div className="absolute left-0">
            <Sidebar openState={openState} sidebarRef={sidebarRef} />
          </div>
        </div>
        <div className="flex gap-2 lg:gap-5 [&>*]:self-center">
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
