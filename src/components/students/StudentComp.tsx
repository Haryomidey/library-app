import React, { ReactNode, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { VerifyToken } from "../admin/AdminControllers";
import Cookies from "js-cookie";

interface StudentCompProps {
  element: ReactNode;
}

export default function StudentComp({ element }: StudentCompProps) {
  const [isAuthorizationChecked, setIsAuthorizationChecked] = useState(false);
  const route = useNavigate();

  useEffect(() => {
    const checkAuthorization = async () => {
      const token = Cookies.get("token");
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

  if (!isAuthorizationChecked) {
    return <div></div>;
  }

  return (
    <div className="w-full space-y-10">
      {element}
      <Outlet />
    </div>
  );
}
