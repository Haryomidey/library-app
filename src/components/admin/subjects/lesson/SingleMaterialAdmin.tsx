import { useEffect, useState } from "react";
import Header from "../../Header";
import { GetAllTopicsUnderSubject } from "../../AdminControllers";
import Cookies from "js-cookie";
import CommentContainer from "../../../CommentContainer";

function SingleMaterialAdmin() {
  const [subjectState, setSubjectState] = useState<any>(null);
  const [topics, setTopics] = useState<any>(null);

  useEffect(() => {
    const subject = Cookies.get("selectedSubject");
    if (subject) {
      setSubjectState(JSON.parse(subject));
    }
  }, []);

  useEffect(() => {
    const fetchTopicDetails = async () => {
      if (subjectState?.subject_id) {
        try {
          const data = await GetAllTopicsUnderSubject(subjectState.subject_id);
          setTopics(data[0]);
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
          <li>{subjectState?.subject_name} &gt;&nbsp;</li>
          <li>Week {topics?.week} - {topics?.title} &gt;&nbsp;</li>
          <li>Week {topics?.week} Material &gt;&nbsp;</li>
          <li className="text-black">Week {topics?.week} Video&gt;&nbsp;</li>
        </div>
        <div className="py-5 space-y-5">
          <video src={topics?.video} controls className="w-full h-[400px]" />
          <h1 className="text-xl font-semibold">{topics?.title}</h1>
          <div className="flex gap-2">
            <img src="/images/student-avatar.png" alt="student" className="self-center h-16 w-16 rounded-full" />
            <div className="flex flex-col text-slate-500 self-center">
              <h3>{!subjectState?.teacher_name ? 'nill' : subjectState?.teacher_name}</h3>
              <span className="text-sm">Instructor</span>
            </div>
          </div>
          <div>
            {topics?.introduction}
          </div>

          <CommentContainer topic_id={topics?.id} />
        </div>
      </div>
    </div>
  );
}

export default SingleMaterialAdmin;
