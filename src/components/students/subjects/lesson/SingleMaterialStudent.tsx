import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../Header";
import Cookies from "js-cookie";
import CommentContainer from "../../../CommentContainer";
import useGetToken from "../../../../utils/useGetToken";
import { GetSingleTopic } from "../../../admin/AdminControllers";

interface GradeState {
  grade_id: string | null;
}

function SingleMaterialAdmin() {
  const { token } = useGetToken();
  const route = useNavigate();
  const [subjectState, setSubjectState] = useState<any>(null);
  const [topic, setTopic] = useState<any>(null);
  const [selectedGradeState, setSelectedGradeState] = useState<GradeState>({
    grade_id: null
  });

  const { subjectId, grade, topicId } = useParams();

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
        try {
          const data = await GetSingleTopic(topicId, token);
          setTopic(data);
        } catch (error: any) {
          console.error(error.message);
        }
      }
    };
    fetchTopicDetails();
  }, [subjectState]);

  return (
    <div>
      <Header headerName="Courses" />
      <div className="px-5 lg:px-10 py-5">
        <div className="flex flex-wrap gap-2 text-blue-500 text-sm list-none [&>*]:self-center">
          <li
            onClick={() => {
              route(`/admin/subjects/${subjectId}/`);
            }}
            className="cursor-pointer"
          >
            {subjectState?.subject_name} &gt;&nbsp;
          </li>
          <li
            className="cursor-pointer"
            onClick={() => {
              route(`/admin/subjects/${subjectId}/${grade}`);
            }}
          >
            Grade {grade} &gt;&nbsp;
          </li>
          <li
            className="cursor-pointer"
            onClick={() => {
              route(`/admin/subjects/${subjectId}/${grade}/${topicId}`);
            }}
          >
            {topic?.title} &gt;&nbsp;
          </li>
          <li className="text-black">{topic?.title} -Video</li>
        </div>
        <div className="py-5 space-y-5">
          <video src={topic?.video} controls className="w-full h-[400px]" />
          <h1 className="text-xl font-semibold">{topic?.title}</h1>
          <div className="flex gap-2">
            <img
              src="/images/student-avatar.png"
              alt="student"
              className="self-center h-16 w-16 rounded-full"
            />
            <div className="flex flex-col text-slate-500 self-center">
              <h3>
                {!subjectState?.teacher_name
                  ? "nill"
                  : subjectState?.teacher_name}
              </h3>
              <span className="text-sm">Instructor</span>
            </div>
          </div>
          <div>{topic?.introduction}</div>

          <CommentContainer topic_id={topic?.id} />
        </div>
      </div>
    </div>
  );
}

export default SingleMaterialAdmin;
