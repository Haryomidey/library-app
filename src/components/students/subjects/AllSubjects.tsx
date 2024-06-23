"use client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import { FaAngleDown } from "react-icons/fa";
import Cookies from "js-cookie";

import DefaultImage from '../../../img/default-image.png';
import { GetAllSubjects } from "../StudentController";


function AllSubjects() {
  const [subjects, setSubjects] = useState<any>(null);
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
    } catch(err: any){
      console.error(err.message)
    } 
      
  };

  useEffect(() => {
    fetchStudentSubject();
  }, []);

  
  return (
    <div>
      <Header headerName={"Subjects"} />
      <h1 className="lg:hidden font-semibold text-xl p-5">Subjects</h1>
      <div className="hidden lg:flex gap-4 py-4 px-5 lg:px-10 justify-end ">
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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-5 lg:p-10 py-4">
        {subjects && subjects.map((subject: 
          {
            id: number;
            subject_name: string;
            cover: string | null;
          }, index: number
        ) => (
          <div
            className="bg-white p-4 h-full max-h-[300px] rounded-lg space-y-5 w-full cursor-pointer "
            key={index}
            onClick={() => handleRouting(subject)}
          >
            <img src={subject.cover ? subject.cover : DefaultImage} alt="" className="w-full h-[70%] object-cover rounded-md" />
            <h3 className="">{subject.subject_name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllSubjects;
