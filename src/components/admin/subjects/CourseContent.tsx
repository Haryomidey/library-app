import { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";

interface CourseContentProps {
  week: string;
  title: string;
  id: string;
}

interface Props {
  contents: CourseContentProps[];
  subject_name: string | undefined;
  subject_id: any
}

function CourseContent({ contents, subject_name, subject_id }: Props) {
  const [loading, setLoading] = useState(true);
  const router = useNavigate();

  useEffect(() => {
    if (contents?.length > 0 || contents?.length === 0) {
      setLoading(false);
    }
  }, [contents]);

  const handleRouting = (id: string, title: string) => {
    router(`/admin/${subject_name}/${id}/${title}`);
  };

  const handleNewTopicRoute = () => {
    router(`/admin/subjects/new-topic/${subject_id}`)
  }


  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className='w-full flex items-center justify-between py-2'>
        <h1 className="hidden lg:block text-lg font-semibold">Course Content</h1>
        <button className='flex items-center gap-3 text-[#2B5BFC]' onClick={handleNewTopicRoute}>
          <IoMdAdd />
          Add new topic
        </button>
      </div>
      {contents?.length > 0 ? (
        contents.map((content, index: number) => (
          <div
            key={index}
            onClick={() => handleRouting(content.id, content.title)}
            className="cursor-pointer hover:bg-slate-200 bg-white p-6 flex justify-between border-b-2"
          >
            <div className="flex gap-5 text-sm lg:text-md">
              <p>Week {content.week}</p>
              <h3>{content.title}</h3>
            </div>
            <FaAngleRight className="self-center" />
          </div>
        ))
      ) : (
        <p className="text-red-500">No topic assigned to this subject</p>
      )}
    </div>
  );
}

export default CourseContent;
