import React, { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import Cookies from "js-cookie";
import { GetTopics } from "../AdminControllers";

interface GradeState {
  grade_id: number | null;
  grade_name: string;
}

function SubjectForGrade() {
  const router = useNavigate();
  const [subjectState, setSubjectState] = useState<any>(null);
  const [selectedGradeState, setSelectedGradeState] = useState<GradeState>({
    grade_id: null,
    grade_name: ""
  });
  const [topics, setTopics] = useState<any>(null);

  const handleRouting = (title: string) => {
    router(`/admin/subjects/${subjectState?.subject_name}/${title}`);
  };

  useEffect(() => {
    let subject = Cookies.get("selectedSubject");
    subject && setSubjectState(JSON.parse(subject));
    let grades = Cookies.get("selectedGrade");
    grades && setSelectedGradeState(JSON.parse(grades));
    const fetchTopicDetails = async () => {
      try {
        const data = subjectState?.id && (await GetTopics(subjectState.id));
        setTopics(data);
      } catch (error: any) {
        alert(error.message);
      }
    };
    fetchTopicDetails();
  }, [subjectState?.id]);
  
  return (
    <div>
      <Header headerName="Course" />
      <div className="px-5 lg:px-10 py-5 space-y-5">
        <div className="flex flex-col md:flex-row gap-5">
          {subjectState?.cover && (
            <img
              src={subjectState?.cover}
              className="h-52 object-cover md:w-96 w-full"
              alt="Course Cover"
            />
          )}
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold">
              {subjectState?.subject_name}
            </h1>
            <p>
              Grade: &nbsp;
              <span className="font-semibold text-blue-500">{selectedGradeState?.grade_name}</span></p>
            <p>
              Subject Department(s):&nbsp;
              <span className="font-semibold text-blue-500">
                {subjectState?.department}
              </span>
            </p>
            <p>
              Instructor:&nbsp;
              <span className="font-semibold text-blue-500">
                {subjectState?.teacher_name}
              </span>
            </p>
          </div>
        </div>
        <h1 className="hidden lg:block text-lg font-semibold py-2 ">
          Course Content
        </h1>
        {topics &&
          topics.length > 0 &&
          topics.map((topic: { id: number; week: number; title: string }) => (
            <div
              key={topic?.id}
              onClick={() => handleRouting(topic.title)}
              className="cursor-pointer hover:bg-slate-200 bg-white p-6 flex justify-between border-b-2"
            >
              <div className="flex gap-10 text-sm lg:text-md">
                <p>Week {topic?.week}</p>
                <h3>{topic?.title}</h3>
              </div>
              <FaAngleRight className="self-center" />
            </div>
          ))}
        {topics?.length <= 0 && (
          <div>
            <h1 className="text-red-500">
              No Topics has been assigned to this subject yet.
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default SubjectForGrade;
