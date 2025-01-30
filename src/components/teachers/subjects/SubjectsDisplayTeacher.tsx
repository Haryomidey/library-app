import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../Header";
import TaskBar from "./TaskBar";
import { DeleteSubject, GetSubjects } from "../../admin/AdminControllers";
import Cookies from "js-cookie";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useGetToken from "../../../utils/useGetToken";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa6";

function SubjectsDisplayTeacher() {
  const { token } = useGetToken();
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get("q");
  const route = useNavigate();
  const [subjects, setSubjects] = useState<any[]>([]);
  const [filteredSubjects, setFilteredSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

   const handleDelete = (subject_id: any) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const deleteSubject = await DeleteSubject(subject_id, token);
        if (deleteSubject) {
          // subjects.filter((subject) => subject_id !== subject.subject_id);
          Swal.fire({
            title: "Deleted Successfully",
            icon: "success",
            timer: 2000
          });
          route(0);
        } else {
          Swal.fire({
            title: "Oops!",
            icon: "error",
            text: deleteSubject.error,
            timer: 2000
          });
        }
      }
    });
  };

  const handleRouter = (subject: any) => {
    route(`/teacher/subjects/${subject?.subject_name}`);
    Cookies.set("selectedSubject", JSON.stringify(subject));
    Cookies.set("grades", JSON.stringify(subject?.grades));
  };

  useEffect(() => {
    if (token) {
      const fetchSubjects = async () => {
        try {
          let teacher = Cookies.get("user");
          if (!teacher) return;
          let parsedTeacher = teacher && JSON.parse(teacher);
          const data = await GetSubjects(token);
          const filteredData = data.filter((subject: any) => {
            return subject.teacher_id === parsedTeacher.teacher_id;
          });
          setSubjects(filteredData);
          setLoading(false);
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      };
      fetchSubjects();
    }
  }, [token]);

  useEffect(() => {
    if (queryParam) {
      const filtered = subjects.filter(
        (subject) =>
          subject?.subject_name
            .toLowerCase()
            .includes(queryParam.toLowerCase()) ||
          subject?.subject_description
            .toLowerCase()
            .includes(queryParam.toLowerCase())
      );
      setFilteredSubjects(filtered);
    } else {
      setFilteredSubjects(subjects);
    }
  }, [queryParam, subjects, token]);

  return (
    <>
      <div className="px-10 py-5 space-y-10">
        <TaskBar total={subjects?.length} />
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: subjects.length || 6 }).map((_, index) => (
              <div key={index} className="bg-white p-2 h-80 rounded-lg">
                <Skeleton height="60%" />
                <div className="h-2/5 p-4 flex flex-col gap-5">
                  <Skeleton count={3} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {queryParam && filteredSubjects?.length === 0 ? (
              <div className="text-center text-xl text-gray-500">
                Your search does not yield any result
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredSubjects?.length > 0 &&
                  filteredSubjects?.map(
                    (
                      subject: {
                        subject_id: number;
                        subject_name: string;
                        cover: string | null;
                        subject_description: string;
                        department: string;
                      },
                      index: number
                    ) => (
                      <div
                        className="bg-white p-2 h-80 rounded-lg cursor-pointer"
                        key={index}
                      >
                        {subject.cover ? (
                          <img
                            src={subject?.cover}
                            onClick={() => handleRouter(subject)}
                            alt={subject?.subject_name}
                            className="object-cover rounded-lg w-full h-2/5"
                          />
                        ) : (
                          <div
                            className="bg-[#58A942] rounded-lg h-2/5"
                            onClick={() => handleRouter(subject)}
                          ></div>
                        )}
                        <div className="h-3/5 p-4 flex flex-col gap-5">
                          <div className="flex justify-between">
                            <h3 className="font-medium">
                              {subject?.subject_name}
                            </h3>
                            <label className="px-4 py-1 rounded-2xl h-fit bg-[#58A942]/20 text-green-500 ">
                              Active
                            </label>
                          </div>
                          <p className="text-sm">
                            {subject?.subject_description}
                          </p>
                          <FaTrash
                            onClick={(e) => {
                              e.preventDefault();
                              handleDelete(subject.subject_id);
                            }}
                            className="text-red-500 cursor-pointer text-lg self-end"
                          />
                        </div>
                      </div>
                    )
                  )}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default SubjectsDisplayTeacher;
