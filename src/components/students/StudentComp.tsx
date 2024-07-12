import React, { ReactNode, useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";
import { VerifyToken } from "../admin/AdminControllers";
import Sidebar from "./SideBar";
import { useUserContext } from "../../contexts/UserContext";

interface StudentCompProps {
  element: ReactNode;
}

const headers: { [key: string]: string } = {
  "/student/": "Dashboard",
  "/student/settings": "Settings",
  "/student/library": "Library",
  "/student/subjects": "Subjects"
};

export default function StudentComp({ element }: StudentCompProps) {
  const {isAdminSearchBarOpen} = useUserContext()
  const [isAuthorizationChecked, setIsAuthorizationChecked] = useState(false);
  const route = useNavigate();
  const location = useLocation();
  const [headerName, setHeaderName] = useState<string>('Dashboard');

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
      <div className={`${isAdminSearchBarOpen ? 'w-[80px]' : 'w-[0]'}  sm:w-[80px] lg:w-[28%] lg:max-w-[210px] overflow-x-hidden border-r bg-white`}>
        <Sidebar />
      </div>
      <div className="w-full h-full overflow-y-scroll">
        {headerName && <Header headerName={headerName} />}
        <Outlet />
      </div>
    </div>
  );
}
