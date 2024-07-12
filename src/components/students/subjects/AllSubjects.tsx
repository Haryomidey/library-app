import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../Header";
import { FaAngleDown } from "react-icons/fa";
import Cookies from "js-cookie";
import DefaultImage from '../../../img/default-image.png';
import { GetAllSubjects } from "../StudentController";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

function AllSubjects() {
  const [subjects, setSubjects] = useState<any[]>([]);
  const [filteredSubjects, setFilteredSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('q');
  const route = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handleRouting = (subject: any) => {
    route(`/student/${subject?.subject_name}/${subject.id}`);
    Cookies.set("selectedSubject", JSON.stringify(subject));
    Cookies.set("grades", JSON.stringify(subject.grades));
  };

  const toggleViewMode = (mode: 'grid' | 'list') => {
    setViewMode(mode);
  };

  const fetchStudentSubjects = async () => {
    try {
      const response = await GetAllSubjects();
      if (response) {
        setSubjects(response);
        if (queryParam) {
          const filtered = response.filter((subject: any) =>
            subject?.subject_name.toLowerCase().includes(queryParam.toLowerCase())
          );
          setFilteredSubjects(filtered);
        } else {
          setFilteredSubjects(response);
        }
      } else {
        setSubjects([]);
        setFilteredSubjects([]);
      }
    } catch (err: any) {
      console.error(err.message);
      setSubjects([]);
      setFilteredSubjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentSubjects();
  }, []);

  useEffect(() => {
    if (queryParam) {
      const filtered = subjects.filter(subject =>
        subject?.subject_name.toLowerCase().includes(queryParam.toLowerCase())
      );
      setFilteredSubjects(filtered);
    } else {
      setFilteredSubjects(subjects);
    }
  }, [queryParam, subjects]);

  const skeletonLength = subjects.length > 0 ? subjects.length : 8;

  return (
    <div>
      <h1 className="lg:hidden font-semibold text-xl p-5">Subjects</h1>
      <div className="hidden lg:flex gap-4 py-4 px-5 lg:px-10 justify-end">
        <div className="bg-white flex gap-5 px-4 py-2 rounded-md">
          <img
            src="/images/grid.png"
            alt=""
            className="w-5 object-cover cursor-pointer self-center"
            onClick={() => toggleViewMode('grid')}
          />
          <img
            src="/images/list.svg"
            alt=""
            className="w-5 object-cover cursor-pointer self-center"
            onClick={() => toggleViewMode('list')}
          />
        </div>
        <div className="flex bg-white [&>*]:self-center rounded-md font-light px-4 py-2 gap-2">
          <span className="self-center">Filter</span>
          <FaAngleDown />
        </div>
      </div>
      {loading ? (
        <div className="p-5 lg:p-10">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {Array.from({ length: skeletonLength }).map((_, index) => (
                <div
                  className="bg-white p-4 h-[250px] rounded-lg space-y-5 w-full"
                  key={index}
                >
                  <Skeleton height="70%" className="rounded-md min-h-[100px]" />
                  <Skeleton width="60%" />
                </div>
              ))}
            </div>
          ) : (
            <div>
              {Array.from({ length: skeletonLength }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center border-b border-gray-200 py-4"
                >
                  <Skeleton width="96px" height="96px" className="rounded-lg" />
                  <div className="ml-4 w-full">
                    <Skeleton width="60%" height="20px" />
                    <Skeleton width="40%" height="20px" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : queryParam && filteredSubjects?.length === 0 ? (
        <div className="p-5 lg:p-10">
          <p className="text-center text-xl text-gray-500">Your search does not yield any result!!!</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-5 lg:p-10 py-4">
          {filteredSubjects?.length > 0 && filteredSubjects?.map((subject, index) => (
            <div
              className="bg-white p-4 h-full max-h-[300px] rounded-lg space-y-5 w-full cursor-pointer"
              key={index}
              onClick={() => handleRouting(subject)}
            >
              <div className='h-[70%] min-h-[100px]'>
                <img
                  src={subject?.cover ? subject?.cover : DefaultImage}
                  alt=""
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <h3>{subject?.subject_name}</h3>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-5 lg:p-10">
          {filteredSubjects?.map((subject, index) => (
            <div
              key={index}
              className="flex items-center border-b border-gray-200 py-4 cursor-pointer"
              onClick={() => handleRouting(subject)}
            >
              <img
                src={subject?.cover ? subject?.cover : DefaultImage}
                alt=""
                className="w-24 h-24 object-cover rounded-lg mr-4"
              />
              <div>
                <h3>Subject Name: <span className="text-lg font-semibold">{subject?.subject_name}</span></h3>
                <p className="text-gray-500">Subject Desc: {subject.subject_description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllSubjects;
