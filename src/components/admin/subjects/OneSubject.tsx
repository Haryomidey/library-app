import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Header";
import ClassGrades from "./ClassGrades";
import { BiEdit } from "react-icons/bi";
import useGetToken from "../../../utils/useGetToken";
import { GetSubject } from "../AdminControllers";
function OneSubject() {
  const [subjectDetails, setSubjectDetails] = useState<any>(null);
  const { subjectId } = useParams();
  const { token } = useGetToken();
  const route = useNavigate();
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

  const handleRouteToEdit = () => {
    route(`/admin/subjects/edit-subject/${subjectId}`);
  };
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
              <button
                onClick={handleRouteToEdit}
                className="bg-[#F3F4F6] hover:bg-white hover:text-[#58A942]  text-[#BFBFBF] p-2 px-4 rounded-md inline-flex gap-2 [&>*]:self-center"
              >
                <BiEdit />
                <span className="text-sm">Edit Subject</span>
              </button>
            </div>
            <p className="text-white">{subjectDetails?.subject_description}</p>
          </div>
        </div>
        <ClassGrades grades={subjectDetails?.grades} />
      </div>
    </div>
  );
}

export default OneSubject;
