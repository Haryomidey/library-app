import { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { DeleteTopic } from "../../admin/AdminControllers";
import Swal from "sweetalert2";
import useGetToken from "../../../utils/useGetToken";
import NewTopicTeacher from "./NewTopicTeacher";
import GradeList from "./../../../utils/grades.json";
import { gradeInterface } from "./EditSubjectTeacher";

interface CourseContentProps {
  week: string;
  title: string;
  id: string;
}

interface Props {
  contents: CourseContentProps[];
  subject_name: string | undefined;
  subject_id: any;
  grade: string | undefined;
}

function CourseContentTeacher({
  contents,
  subject_name,
  subject_id,
  grade
}: Props) {
  const [loading, setLoading] = useState(true);
  const [isNewTopic, setIsNewTopic] = useState(false);
  const router = useNavigate();
  const { token } = useGetToken();

  useEffect(() => {
    if (contents?.length > 0 || contents?.length === 0) {
      setLoading(false);
    }
  }, [contents]);

  const handleTopicDelete = (topic_id: any) => {
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
        const deleteTopic = await DeleteTopic(topic_id, token);
        if (deleteTopic) {
          // subjects.filter((subject) => subject_id !== subject.subject_id);
          Swal.fire({
            title: "Deleted Successfully",
            icon: "success",
            timer: 2000
          });
          router(0);
        } else {
          Swal.fire({
            title: "Oops!",
            icon: "error",
            text: deleteTopic.error,
            timer: 2000
          });
        }
      }
    });
  };

  const handleRouting = (id: string, title: string) => {
    router(`/teacher/${subject_name}/${id}/${title}`);
  };

  const handleNewTopicRoute = () => {
    setIsNewTopic(true);
  };

  if (isNewTopic) {
    if (!grade) return null;
    let gradeObject;
    GradeList.map((gradeLabel: gradeInterface) => {
      if (gradeLabel.grade_id === Number(grade)) {
        gradeObject = gradeLabel;
      }
      return 0;
    });
    if (!gradeObject) return null;
    return (
      <NewTopicTeacher subjectId={subject_id} gradesForTopic={[gradeObject]} />
    );
  }

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <div className="w-full flex items-center justify-between py-2">
        <h1 className="hidden lg:block text-lg font-semibold">
          Course Content
        </h1>
        <button
          className="flex items-center gap-3 text-[#2B5BFC]"
          onClick={handleNewTopicRoute}
        >
          <IoMdAdd />
          Add new topic
        </button>
      </div>
      {contents?.length > 0 ? (
        contents.map((content, index: number) => (
          <div
            key={index}
            className="hover:bg-slate-200 bg-white p-6 flex justify-between border-b-2"
          >
            <div
              className="flex gap-5 text-sm lg:text-md cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                handleRouting(content.id, content.title);
              }}
            >
              <p>Week {content.week}</p>
              <div className="flex gap-2 [&>*]:self-center">
                <h3>{content.title}</h3>
                <FaAngleRight className="self-center" />
              </div>
            </div>
            <FaTrash
              onClick={(e) => {
                e.preventDefault();
                handleTopicDelete(content.id);
              }}
              className="self-center text-red-500 cursor-pointer"
            />
          </div>
        ))
      ) : (
        <p className="text-red-500">No topic assigned to this subject</p>
      )}
    </div>
  );
}

export default CourseContentTeacher;
