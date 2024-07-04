import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { BiSearch } from "react-icons/bi";
import { FaBars, FaUser } from "react-icons/fa";
import Sidebar from './SideBar';
import { MdClose } from "react-icons/md";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaArrowLeftLong } from "react-icons/fa6";
import { GetNotifications } from "../admin/AdminControllers";
import timeAgo from "../../utils/time-converter";

function Header({ headerName }: any) {
  const [openState, setOpenState] = useState(false);
  const [userState, setUserState] = useState<any>(null);
  const [searchState, setSearchState] = useState(false);
  const [notifState, setNotifState] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const [searchItems, setSearchItems] = useState<string>('');
  const router = useNavigate();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchItems(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      router(`/student/subjects?q=${searchItems}`);
    }
  };

  const initialGetter = (value: string) => {
    return value.charAt(0);
  };

  const handleGoBack = () => {
    window.history.back();
  };

  useEffect(() => {
    const menuOutsideClick = (e: MouseEvent) => {
      if (searchRef && searchRef.current?.contains(e.target as Node)) {
        setSearchState(true);
      } else {
        setSearchState(false);
      }
    };

    document.addEventListener('mousedown', menuOutsideClick);

    return () => {
      document.removeEventListener('mousedown', menuOutsideClick);
    };
  }, []);

  useEffect(() => {
    const menuOutsideClick = (e: MouseEvent) => {
      if (sidebarRef && sidebarRef.current?.contains(e.target as Node)) {
        setOpenState(true);
      } else {
        setOpenState(false);
      }
    };

    document.addEventListener('mousedown', menuOutsideClick);

    return () => {
      document.removeEventListener('mousedown', menuOutsideClick);
    };
  }, []);

  useEffect(() => {
    let user = Cookies.get("user");
    user && setUserState(JSON.parse(user));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await GetNotifications();
      if (data?.success) {
        const sortedNotifications = data.data.sort((a: any, b: any) => b.notification_id - a.notification_id);
        if (sortedNotifications.length > 3) {
          setNotifications(sortedNotifications.slice(0, 3));
        } else {
          setNotifications(sortedNotifications);
        }
      }
    };
    fetchData();
  }, []);

  return (
    <div className="z-[1111] w-full flex flex-col justify-center mb-[84px]">
      <ul className="fixed z-[1111] top-0 border-b-2 w-full h-16 py-3 bg-white flex justify-between px-5 lg:px-10 [&>*]:self-center">
        <div className="flex gap-5 [&>*]:self-center">
          <div>
            {openState ? (
              <MdClose onClick={() => setOpenState(false)} className="z-20 cursor-pointer" />
            ) : (
              <FaBars onClick={() => setOpenState(true)} className="z-20 cursor-pointer" />
            )}
          </div>

          <div className="flex items-center gap-2 ml-4 cursor-pointer">
            <p onClick={handleGoBack}><FaArrowLeftLong /></p>
            <h1 className="hidden lg:block font-semibold self-center">{headerName}</h1>
          </div>
        </div>
        <div>
          <div className="absolute left-0">
            <Sidebar openState={openState} sidebarRef={sidebarRef} />
          </div>
        </div>
        <div className="flex gap-2 lg:gap-5 [&>*]:self-center">
          <div className="border-2 p-2 rounded-full cursor-pointer relative">
            {searchState ? (
              <BiSearch className="text-lg lg:text-xl self-center" onClick={() => setSearchState(false)} />
            ) : (
              <BiSearch className="text-lg lg:text-xl self-center" onClick={() => setSearchState(true)} />
            )}

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
          <div className="border-2 p-2 rounded-full cursor-pointer relative" onClick={() => setNotifState(prev => !prev)}>
            <IoNotificationsOutline className="text-lg lg:text-xl self-center" />
            {notifications.length >= 1 && <p className="absolute top-2 right-2 h-2 w-2 bg-red-600 rounded-full"></p>}
          </div>
          <div className="bg-red-200 w-10 h-10 text-center rounded-full flex flex-col justify-center">
            {userState && <span className="font-semibold text-lg">
              {initialGetter(userState?.first_name) +
                "" +
                initialGetter(userState?.last_name)}
            </span>}
          </div>
          <div className="hidden lg:flex flex-col text-sm text-slate-500 self-center">
            <h3>{userState?.first_name} {userState?.last_name}</h3>
            <span>Grade 10</span>
          </div>
        </div>
      </ul>

      <div className={`fixed left-0 top-0 bottom-0 w-full h-screen bg-[#00000048] z-[11] ${!notifState ? 'invisible' : 'visible'}`}>
        <div className={`bg-white w-[300px] max-w-[90%] min-h-[100px] rounded-lg absolute right-20 top-16 shadow-md p-5 ${notifState ? 'scale-1' : 'scale-0'} transition-transform ease duration-300`}>
          <div className="flex items-center justify-between w-full gap-2">
            <p className="font-semibold">Notifications</p>
            <p className="text-sm text-[#5689E6]">Mark as read</p>
          </div>

          {notifications.length < 1 && <div className='text-center my-5 font-semibold'>
            No Notifications yet!!!  
          </div>}

          {notifications.map((notification) => (
            <div key={notification.notification_id} className="mt-5 w-full flex gap-3">
              <p className="min-w-12 h-12 rounded-full bg-[#FFECE5] grid place-items-center"><FaUser /></p>
              <div>
                <p className='font-semibold'>{notification.message}</p>
                <p className="text-xs text-[#98A2B3] mt-3">{timeAgo(notification.from)}</p>
              </div>
            </div>
          ))}

          <p className='text-right mt-6 underline cursor-pointer'>View all notifications</p>
        </div>
      </div>
    </div>
  );
}

export default Header;