import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../Header";
import TaskBar from "./TaskBar";
import { GetSubjects } from "../AdminControllers";
import Cookies from "js-cookie";

function SubjectsDisplay() {
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('q');
  const route = useNavigate();

  const [subjects, setSubjects] = useState<any[]>([]);
  const [filteredSubjects, setFilteredSubjects] = useState<any[]>([]);

  const handleRouter = (subject: any) => {
    route(`/admin/subjects/${subject?.subject_name}`);
    Cookies.set("selectedSubject", JSON.stringify(subject));
    Cookies.set("grades", JSON.stringify(subject?.grades));
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

  useEffect(() => {
    if (queryParam) {
      const filtered = subjects.filter(subject =>
        subject?.subject_name.toLowerCase().includes(queryParam.toLowerCase()) ||
        subject?.subject_description.toLowerCase().includes(queryParam.toLowerCase())
      );
      setFilteredSubjects(filtered);
    } else {
      setFilteredSubjects(subjects);
    }
  }, [queryParam, subjects]);

  return (
    <>
      <Header headerName="Subjects" />
      <div className="px-10 py-5 space-y-10">
        <TaskBar total={subjects?.length} />
        {queryParam && filteredSubjects?.length === 0 ? (
          <div className="text-center text-xl text-gray-500">
            Your search does not yield any result
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSubjects?.map(
              (subject: {
                id: number;
                subject_name: string;
                cover: string | null;
                subject_description: string;
                department: string;
              }, index: number) => (
                <div
                  className="bg-white p-2 h-80 rounded-lg cursor-pointer"
                  key={index}
                  onClick={() => handleRouter(subject)}
                >
                  {subject.cover ? (
                    <img
                      src={subject?.cover}
                      alt={subject?.subject_name}
                      className="object-cover rounded-lg w-full h-3/5"
                    />
                  ) : (
                    <div className="bg-[#58A942] rounded-lg h-3/5"></div>
                  )}
                  <div className="h-2/5 p-4 flex flex-col gap-5">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{subject?.subject_name}</h3>
                        <label className="px-4 py-1 rounded-2xl h-fit bg-[#58A942]/20 text-green-500 ">
                          Active
                        </label>
                      </div>
                      <p>{subject?.subject_description}</p>
                    </div>
                    {/* <p className="font-light">Lower Primary Level</p> */}
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default SubjectsDisplay;
