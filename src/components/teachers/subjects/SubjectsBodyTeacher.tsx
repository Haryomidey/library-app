import React, { ReactNode } from "react";
import { Outlet } from "react-router-dom";

interface SubjectBodyProps {
  element: ReactNode;
}
function SubjectsBodyTeacher({ element }: SubjectBodyProps) {
  return (
    <div>
      {element}
      <Outlet />
    </div>
  );
}

export default SubjectsBodyTeacher;
