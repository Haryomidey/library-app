import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import TaskBar from "./TaskBar";
import { GetSubjects } from "../AdminControllers";
import Cookies from "js-cookie";

function SubjectsDisplay() {
  const [subjects, setSubjects] = useState<any>(null);
  const route = useNavigate();
  const handleRouter = (subject: any) => {
    console.log(subject);
    route(`/admin/subjects/${subject.subject_name}`);
    Cookies.set("selectedSubject", JSON.stringify(subject));
    Cookies.set("grades", JSON.stringify(subject.grades));
  };
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const data = await GetSubjects();
        setSubjects(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSubjects();
  }, []);
  return (
    <>
      <Header headerName="Subjects" />
      <div className="px-10 py-5 space-y-10">
        <TaskBar total={subjects?.length} />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {subjects &&
            subjects.map(
              (subject: {
                id: number;
                subject_name: string;
                cover: string | null;
                subject_description: string;
              }) => (
                <div
                  className="bg-white p-2 h-80 rounded-lg cursor-pointer"
                  key={subject.id}
                  onClick={() => handleRouter(subject)}
                >
                  {subject.cover ? (
                    <img
                      src={subject.cover}
                      alt={subject.subject_name}
                      className="object-cover rounded-lg w-full h-3/5"
                    />
                  ) : (
                    <div className="bg-[#58A942] rounded-lg h-3/5"></div>
                  )}
                  <div className="h-2/5 p-4 flex flex-col gap-5">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{subject.subject_name}</h3>
                        <label className="px-4 py-1 rounded-2xl h-fit bg-[#58A942]/20 text-green-500 ">
                          Active
                        </label>
                      </div>
                      <p>{subject.subject_description}</p>
                    </div>
                    {/* <p className="font-light">Lower Primary Level</p> */}
                  </div>
                </div>
              )
            )}
        </div>
      </div>
    </>
  );
}

export default SubjectsDisplay;
