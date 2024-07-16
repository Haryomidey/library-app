import React, { ReactNode, useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";
import { useUserContext } from "../../contexts/UserContext";
import { VerifyToken } from "../admin/AdminControllers";

interface AdminCompProps {
  element: ReactNode;
}

const headers: { [key: string]: string } = {
  "/teacher/": "Overview",
  "/teacher/subjects": "Subjects",
  "/teacher/settings": "Settings",
  "/teacher/help-and-support": "Help and Support",
  "/teacher/messages": "Messages",
};

export default function AdminComp({ element }: AdminCompProps) {
  const {isAdminSearchBarOpen} = useUserContext()
  const [isAuthorizationChecked, setIsAuthorizationChecked] = useState(false);
  const route = useNavigate();
  const location = useLocation();
  const [headerName, setHeaderName] = useState<string | null>("Overview");


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
    setHeaderName(headers[path] || null);
  }, [location.pathname]);

  if (!isAuthorizationChecked) {
    return <div></div>;
  }

  return (
    <div className="w-full h-screen flex">
      <div className={`${isAdminSearchBarOpen ? 'w-[80px]' : 'w-[0]'}  sm:w-[80px] lg:w-[28%] lg:max-w-[220px] overflow-x-hidden border-r bg-white`}>
        <Sidebar />
      </div>
      <div className="w-full h-full overflow-y-scroll">
        {headerName && <Header headerName={headerName} />}
        <Outlet />
      </div>
    </div>
  );
}
