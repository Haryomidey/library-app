import React, { ReactNode } from "react";
import { Outlet } from "react-router-dom";

interface SubjectBodyProps {
  element: ReactNode;
}
function SubjectsBody({ element }: SubjectBodyProps) {
  return (
    <div>
      {element}
      <Outlet />
    </div>
  );
}

export default SubjectsBody;
