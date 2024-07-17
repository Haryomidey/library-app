import React, { ReactNode, useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { VerifyToken } from "./AdminControllers";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useUserContext } from "../../contexts/UserContext";
import useGetToken from "../../utils/useGetToken";

interface AdminCompProps {
  element: ReactNode;
}

const headers: { [key: string]: string } = {
  "/admin": "Dashboard",
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
  const [headerName, setHeaderName] = useState<string | null>("Dashboard");
  const {token} = useGetToken();

  useEffect(() => {
    const checkAuthorization = async () => {
      const verifyToken = VerifyToken(token);
      if (!verifyToken) {
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
