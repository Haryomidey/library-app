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

interface SubjectState {
  subject_id: string;
  subject_name: string;
  cover?: string;
  department?: string;
  teacher_name?: string;
}

interface Topic {
  id: number;
  week: number;
  title: string;
}

function SubjectForGrade() {
  const router = useNavigate();
  const [subjectState, setSubjectState] = useState<SubjectState | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedGradeState, setSelectedGradeState] = useState<GradeState>({
    grade_id: null,
    grade_name: ""
  });
  const [topics, setTopics] = useState<Topic[]>([]);

  const handleRouting = (title: string) => {
    router(`/admin/subjects/${subjectState?.subject_name}`);
  };

  useEffect(() => {
    const subject = Cookies.get("selectedSubject");
    const grades = Cookies.get("selectedGrade");
    if (subject) {
      setSubjectState(JSON.parse(subject));
    }
    if (grades) {
      setSelectedGradeState(JSON.parse(grades));
    }
  }, []);

  useEffect(() => {
    const fetchTopicDetails = async () => {
      if (subjectState?.subject_id) {
        setLoading(true);
        try {
          const data = await GetTopics(subjectState.subject_id);
          setTopics(data);
        } catch (error: any) {
          console.error(error.message);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchTopicDetails();
  }, [subjectState?.subject_id]);

  return (
    <div>
      <Header headerName="Course" />
      <div className="px-5 lg:px-10 py-5 space-y-5">
        <div className="flex flex-col md:flex-row gap-5">
          {subjectState?.cover && (
            <img
              src={subjectState.cover}
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
              <span className="font-semibold text-blue-500">{selectedGradeState.grade_name}</span>
            </p>
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
        {loading ? (
          <p>Loading...</p>
        ) : topics.length > 0 ? (
          topics.map((topic) => (
            <div
              key={topic.id}
              onClick={() => handleRouting(topic.title)}
              className="cursor-pointer hover:bg-slate-200 bg-white p-6 flex justify-between border-b-2"
            >
              <div className="flex gap-10 text-sm lg:text-md">
                <p>Week {topic.week}</p>
                <h3>{topic.title}</h3>
              </div>
              <FaAngleRight className="self-center" />
            </div>
          ))
        ) : (
          <div>
            <h1 className="text-red-500">
              No topics have been assigned to this subject yet.
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default SubjectForGrade;
