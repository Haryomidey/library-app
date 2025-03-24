import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import DefaultImage from "../../../img/default-image.png";
import Cookies from "js-cookie";

interface Subject {
  subject_id: string;
  subject_name: string;
  subject_description: string;
  cover?: string;
  grades: any;
}

interface RecentlyViewedProps {
  subjects: Subject[];
}

const RecentlyViewed = ({ subjects }: RecentlyViewedProps) => {
  const [loading, setLoading] = useState(true);
  const displayedSubjects =
    subjects?.length > 3 ? subjects.slice(0, 3) : subjects;
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleRouting = (subject: Subject) => {
    navigate(`/student/subjects/${subject.subject_id}`);
    Cookies.set("selectedSubject", JSON.stringify(subject));
    Cookies.set(
      "grades",
      JSON.stringify(subject?.grades ? subject?.grades : "")
    );
  };

  return (
    <div>
      <div className="gap-4 mt-7">
        <h3 className="font-semibold text-lg">Recently Viewed</h3>
        <p>These are some of the subjects you recently viewed</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 py-4">
        {loading ? (
          Array(3)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="bg-white lg:p-2 p-4 h-60 lg:h-72 rounded-lg"
              >
                <Skeleton width="100%" height="70%" />
                <div className="p-4">
                  <Skeleton width="80%" height="20px" />
                  <Skeleton width="60%" height="20px" />
                </div>
              </div>
            ))
        ) : displayedSubjects?.length > 0 ? (
          displayedSubjects?.map((subject, index) => (
            <div
              className="bg-white lg:p-2 p-4 h-60 lg:h-72 rounded-lg cursor-pointer"
              key={index}
              onClick={() => handleRouting(subject)}
            >
              <div className="bg-[#58A942] rounded-lg h-[70%]">
                <img
                  src={subject?.cover ? subject?.cover : DefaultImage}
                  className="w-full h-full object-cover rounded-md"
                  alt={subject.subject_name}
                />
              </div>
              <div className="px-4 pb-4 pt-1">
                <h3 className="font-medium">
                  {subject?.subject_name ? subject?.subject_name : "None"}
                </h3>
                {/* <p className="font-light">{subject?.subject_description ? subject?.subject_description : 'None'}</p> */}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center h-[200px] grid place-items-center">
            <p>No recently viewed subjects yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentlyViewed;
