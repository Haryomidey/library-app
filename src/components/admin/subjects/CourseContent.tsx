import { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface CourseContentProps {
  week: string;
  title: string;
  id: string;
}

interface Props {
  contents: CourseContentProps[];
  subject_name: string | undefined;
}

function CourseContent({ contents, subject_name }: Props) {
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

  console.log(contents)

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1 className="hidden lg:block text-lg font-semibold py-2">Course Content</h1>
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
