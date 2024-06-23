
import { FaAngleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface CourseContentProps {
  week: string
  title: string
  id: string
}

interface Props {
  contents: CourseContentProps[];
  subject_name: string | undefined;
}

function CourseContent({contents, subject_name}: Props) {
  const router = useNavigate();
  const handleRouting = (id: string, title: string) => {
    router(`/student/${subject_name}/${id}/${title}`);
  };

  return (
    <div>
      <h1 className="hidden lg:block text-lg font-semibold py-2 ">Course Content</h1>
      {contents?.map((content, index: number) => (
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

      ))}
    </div>
  );
}

export default CourseContent;
