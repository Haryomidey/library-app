import { useEffect, useState } from "react";
import Header from "../../Header";
import { BiCheckCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { GetAllTopicsUnderSubject } from "../../StudentController";

function LessonDetails() {
  const route = useNavigate();
  const [subjectState, setSubjectState] = useState<any>(null);
  const [topics, setTopics] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
          const data = await GetAllTopicsUnderSubject(subjectState?.subject_id);
          console.log(data)
          setTopics(data[0]);
          setLoading(false);
        } catch (error: any) {
          console.error(error.message);
          setLoading(false);
        }
      }
    };
    if (subjectState) {
      fetchTopicDetails();
    }
  }, [subjectState]);

  const handleRouting = (subject_name: any, id: any, title: any) => {
    route(`/student/${subject_name}/${id}/${title}/video`);
  };

  const handleDownLoadFile = () => {
    const blobUrl = topics?.file;
    const fileName = blobUrl?.split('/').pop();
    const link = document.createElement("a");
    link.style.display = 'none';
    document.body.appendChild(link);
    link.href = blobUrl;
    link.download = fileName;
    link.setAttribute('target', '_blank');
    link.click();
    window.URL.revokeObjectURL(blobUrl);
    document.body.removeChild(link);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header headerName={`Week ${topics?.week} - ${topics?.title}`} />
      <div className="lg:px-10 px-5 py-5">
        <div className="flex flex-wrap gap-2 text-blue-500 text-sm list-none [&>*]:self-center">
          <li>{subjectState?.subject_name} &gt;&nbsp;</li>
          <li>Week {topics?.week} - {topics?.title} &gt;&nbsp;</li>
          <li className="text-black">Module</li>
        </div>
        <div className="py-5 space-y-3">
          <h3 className="font-semibold">Module Details</h3>
          <p className="text-sm lg:text-md lg:leading-[2rem]">
            {topics?.introduction}
          </p>
        </div>
        <div className="py-5 space-y-4">
          <h3 className="font-semibold">Module Materials</h3>
          <div className="flex gap-3 [&>*]:self-center ">
            <BiCheckCircle className="text-2xl" />
            {topics?.title ?
              <h3
              className="text-blue-500 cursor-pointer"
              onClick={() => handleRouting(subjectState?.subject_name, topics?.id, topics?.title)}
            >
              Video - {topics?.title}
            </h3>
            :
            <h3
              className="text-blue-500 cursor-pointer"
              onClick={() => handleRouting(subjectState?.subject_name, topics?.id, topics?.title)}
            >
              No Video Attached
            </h3>
            }
          </div>
          <div className="flex gap-3 [&>*]:self-center ">
            <BiCheckCircle className="text-2xl" />
            {topics?.file ? <h3 className="text-blue-500 cursor-pointer" onClick={handleDownLoadFile}>
              File - {topics?.file?.split('/').pop()}
            </h3>
            :
            <h3 className="text-blue-500">
              No File Attached
            </h3>
            }
            </div>
        </div>
      </div>
    </div>
  );
}

export default LessonDetails;
