import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../Header";
import useGetToken from "../../../utils/useGetToken";
import { GetSubject } from "../../admin/AdminControllers";
import ClassGrades from "./ClassGrades";
function StudentOneSubject() {
  const [subjectDetails, setSubjectDetails] = useState<any>(null);
  const { subjectId } = useParams();
  const { token } = useGetToken();
  useEffect(() => {
    if (!subjectId) return;
    const fetchSubject = async () => {
      try {
        const data = await GetSubject(parseInt(subjectId), token);
        if (data) {
          console.log(data);
          setSubjectDetails(data[0]);
        }
      } catch (error) {
        console.error("Error fetching subject: ", error);
      }
    };
    fetchSubject();
  }, [subjectId, token]);

  return (
    <div>
      <Header headerName="Edit Subject" />
      <div className="px-10 py-5 space-y-10">
        <div
          className={
            !subjectDetails?.cover
              ? "bg-[#58A942] h-56 rounded-lg"
              : "relative h-56 bg-black rounded-lg"
          }
        >
          {subjectDetails?.cover && (
            <img
              src={subjectDetails?.cover}
              className="inset-0 absolute h-56 w-full object-cover rounded-lg opacity-50"
              alt=""
            />
          )}
          <div className="relative px-10 py-5">
            <div className="flex justify-between">
              <h1 className="font-semibold text-lg text-white">
                {subjectDetails?.subject_name}
              </h1>
            </div>
            <p className="text-white">{subjectDetails?.subject_description}</p>
          </div>
        </div>
        <ClassGrades grades={subjectDetails?.grades} />
      </div>
    </div>
  );
}

export default StudentOneSubject;
