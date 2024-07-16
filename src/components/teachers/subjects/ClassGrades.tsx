import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ClassGrades({ name }: { name: string | undefined }) {
  const [grades, setGradeState] = useState([]);
  const route = useNavigate();
  const handleRouter = (grade: { grade_id: number; grade_name: string }) => {
    Cookies.set("selectedGrade", JSON.stringify(grade));
    route(`/teacher/subjects/${name}/${grade.grade_id}`);
  };

  useEffect(() => {
    let grades = Cookies.get("grades");
    grades && setGradeState(JSON.parse(grades));
  }, []);
  return (
    <div>
      <h3 className="font-semibold text-lg">Class grades</h3>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 py-4">
        {grades.map((grade: { grade_id: number; grade_name: string }) => (
          <div
            className="bg-white p-2 h-60 rounded-lg cursor-pointer"
            key={grade.grade_id}
            onClick={() => handleRouter(grade)}
          >
            <div className="bg-[#58A942] rounded-lg h-3/5"></div>
            <div className="h-2/5 p-4 flex flex-col justify-between">
              <div className="flex justify-between">
                <h3 className="font-medium">{grade.grade_name}</h3>
                <label className="px-4 py-1 rounded-2xl bg-[#58A942]/20 text-green-500 ">
                  Active
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClassGrades;
