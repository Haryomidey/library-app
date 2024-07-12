import React, { ReactNode, useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { VerifyToken } from "./AdminControllers";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useUserContext } from "../../contexts/UserContext";

interface AdminCompProps {
  element: ReactNode;
}

const headers: { [key: string]: string } = {
  "/admin/": "Dashboard",
  "/admin/user-management/teacher": "Teacher Management",
  "/admin/user-management/student": "Student Management",
  "/admin/settings": "Settings",
  "/admin/help-and-support": "Help and Support",
  "/admin/library": "Library",
  "/admin/subjects": "Subjects"
};

export default function AdminComp({ element }: AdminCompProps) {
  const {isAdminSearchBarOpen} = useUserContext()
  const [isAuthorizationChecked, setIsAuthorizationChecked] = useState(false);
  const route = useNavigate();
  const location = useLocation();
  const [headerName, setHeaderName] = useState<string>("Dashboard");

  // useEffect(() => {
  //   const menuOutsideClick = (e: MouseEvent) => {
  //     if (sidebarRef.current?.contains(e.target as Node)) {
  //       setOpenState(true);
  //     } else {
  //       setOpenState(false);
  //     }
  //   };

  //   document.addEventListener('mousedown', menuOutsideClick);

  //   return () => {
  //     document.removeEventListener('mousedown', menuOutsideClick);
  //   };
  // }, []);

  useEffect(() => {
    const checkAuthorization = async () => {
      const token = VerifyToken();
      if (!token) {
        route("/");
        return;
      }
      try {
        setIsAuthorizationChecked(true);
      } catch (error: any) {
        route("/");
      }
    };

    checkAuthorization();
  }, [route]);

  useEffect(() => {
    const path = location.pathname;
    setHeaderName(headers[path] || "Dashboard");
  }, [location.pathname]);

  if (!isAuthorizationChecked) {
    return <div></div>;
  }

  return (
    <div className="w-full h-screen flex">
      <div className={`${isAdminSearchBarOpen ? 'w-[80px]' : 'w-[0]'}  sm:w-[80px] lg:w-[28%] lg:max-w-[250px] overflow-x-hidden border-r bg-white`}>
        <Sidebar />
      </div>
      <div className="w-full h-full overflow-y-scroll">
        {headerName && <Header headerName={headerName} />}
        <Outlet />
      </div>
    </div>
  );
}
