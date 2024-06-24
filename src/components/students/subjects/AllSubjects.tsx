"use client";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../Header";
import { FaAngleDown } from "react-icons/fa";
import Cookies from "js-cookie";
import DefaultImage from '../../../img/default-image.png';
import { GetAllSubjects } from "../StudentController";

function AllSubjects() {
  const [subjects, setSubjects] = useState<any[]>([]);
  const [filteredSubjects, setFilteredSubjects] = useState<any[]>([]);
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('q');
  const route = useNavigate();

  const handleRouting = (subject: any) => {
    route(`/student/${subject.subject_name}/${subject.id}`);
    Cookies.set("selectedSubject", JSON.stringify(subject));
    Cookies.set("grades", JSON.stringify(subject.grades));
  };

  const fetchStudentSubject = async () => {
    try {
      const response = await GetAllSubjects();
      setSubjects(response);
    } catch(err: any) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchStudentSubject();
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
  }, [queryParam, subjects, route]);

  return (
    <div>
      <Header headerName={"Subjects"} />
      <h1 className="lg:hidden font-semibold text-xl p-5">Subjects</h1>
      <div className="hidden lg:flex gap-4 py-4 px-5 lg:px-10 justify-end">
        <div className="bg-white flex gap-5 px-4 py-2 rounded-md">
          <img
            src="/images/grid.png"
            alt=""
            className="w-5 object-cover cursor-pointer self-center"
          />
          <img
            src="/images/list.svg"
            alt=""
            className="w-5 object-cover cursor-pointer self-center"
          />
        </div>
        <div className="flex bg-white [&>*]:self-center rounded-md font-light px-4 py-2 gap-2">
          <span className="self-center">Filter</span>
          <FaAngleDown />
        </div>
      </div>
      {filteredSubjects.length === 0 ? (
        <div className="p-5 lg:p-10">
          <p className="text-center text-xl text-gray-500">Your search does not yield any result!!!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-5 lg:p-10 py-4">
          {filteredSubjects.map((subject, index) => (
            <div
              className="bg-white p-4 h-full max-h-[300px] rounded-lg space-y-5 w-full cursor-pointer"
              key={index}
              onClick={() => handleRouting(subject)}
            >
              <img
                src={subject.cover ? subject.cover : DefaultImage}
                alt=""
                className="w-full h-[70%] object-cover rounded-md"
              />
              <h3>{subject.subject_name}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllSubjects;
