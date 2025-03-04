import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../Header";
import { BiCheckCircle, BiXCircle } from "react-icons/bi";
import Cookies from "js-cookie";
import { GetSingleTopic } from "../../AdminControllers";
import useGetToken from "../../../../utils/useGetToken";

interface GradeState {
  grade_id: string | null;
}

function LessonDetailsAdmin() {
  const { token } = useGetToken();
  const route = useNavigate();
  const [subjectState, setSubjectState] = useState<any>(null);
  const [topic, setTopic] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
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
      try {
        const data = await GetSingleTopic(topicId, token);
        setTopic(data);
        setLoading(false);
      } catch (error: any) {
        console.error(error.message);
        setLoading(false);
      }
    };
    fetchTopicDetails();
  }, [token, topicId]);

  const handleRouting = () => {
    route(`/admin/subjects/${subjectId}/${grade}/${topicId}/video`);
  };

  const handleViewFile = () => {
    const fileUrl = topic?.file;
    if (fileUrl) {
      route(`/file-viewer?file_url=${fileUrl}`);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <Header headerName={`${topic?.title}`} />
      <div className="lg:px-10 px-5 py-5">
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
          <li className="text-black">{topic?.title}</li>
        </div>
        <div className="py-5 space-y-3">
          <h3 className="font-semibold">Module Details</h3>
          <p className="text-sm lg:text-md lg:leading-[2rem]">
            {topic?.introduction}
          </p>
        </div>
        <div className="py-5 space-y-4">
          <h3 className="font-semibold">Module Materials</h3>
          <div className="space-y-5">
            {topic?.video ? (
              <div className="flex gap-3 [&>*]:self-center ">
                <BiCheckCircle className="text-2xl" />
                <h3
                  className="text-blue-500 cursor-pointer"
                  onClick={() => handleRouting()}
                >
                  Video - {topic?.title}
                </h3>
              </div>
            ) : (
              <div className="flex gap-3 [&>*]:self-center ">
                <BiXCircle className="text-2xl" />
                <h3 className="text-red-500 cursor-pointer">
                  No Video Attached
                </h3>
              </div>
            )}
          </div>
          <div className="flex gap-3 [&>*]:self-center ">
            <BiCheckCircle className="text-2xl" />
            {topic?.file ? (
              <h3
                className="text-blue-500 cursor-pointer"
                onClick={handleViewFile}
              >
                File - {topic?.file?.split("/").pop()}
              </h3>
            ) : (
              <h3 className="text-red-500">No File Attached</h3>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LessonDetailsAdmin;
