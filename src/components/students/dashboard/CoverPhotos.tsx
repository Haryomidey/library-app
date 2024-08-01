import { useNavigate } from "react-router-dom";
import DefaultImage from '../../../img/default-image.png';
import Cookies from "js-cookie";

interface Subject {
  subject_name: string;
  cover?: string;
  teacher_name?: string;
  grades: any;
}

interface CoverPhotosProps {
  subjects: Subject[];
  justViewed: Subject[];
}

function CoverPhotos({ subjects, justViewed }: CoverPhotosProps) {
  const recentlyViewed = justViewed?.length > 1 ? justViewed?.slice(0, 1)[0] : justViewed[0];
  const recentlyUploaded = subjects?.length > 1 ? subjects?.slice(0, 1)[0] : subjects[0];
  const navigate = useNavigate();

  const handleRouting = (subject: Subject) => {
    navigate(`/student/${subject?.subject_name}`);
    Cookies.set("selectedSubject", JSON.stringify(subject));
    Cookies.set("grades", JSON.stringify(subject.grades));
  };

  return (
    <div className="grid lg:grid-cols-2 gap-10 mb-4">
      {recentlyViewed ? (
        <div className="relative rounded-xl bg-[#FAFAFA] cursor-pointer" onClick={() => handleRouting(recentlyViewed)}>
          <img
            src={recentlyViewed?.cover ? recentlyViewed?.cover : DefaultImage}
            className="w-full object-cover h-72 rounded-lg"
            alt={recentlyViewed.subject_name}
          />
          <div className="absolute text-black bottom-0 flex flex-col p-6 rounded-lg space-y-3">
            <span className="font-semibold text-xl bg-[white] px-4 py-1 rounded-md shadow-sm">{recentlyViewed?.subject_name}</span>
            <span className="font-light bg-[white] px-3 py-1 rounded-md w-[fit-content] shadow-sm">{recentlyViewed?.teacher_name}</span>
          </div>
        </div>
      ) : (
        <div className="text-center grid place-items-center">
          <p>No recently viewed subjects yet</p>
        </div>
      )}
      {recentlyUploaded ? (
        <div className="relative rounded-xl bg-[#FAFAFA] cursor-pointer" onClick={() => handleRouting(recentlyUploaded)}>
          <img
            src={recentlyUploaded?.cover ? recentlyUploaded?.cover : DefaultImage}
            className="w-full object-cover h-72 rounded-lg"
            alt={recentlyUploaded.subject_name}
          />
          <div className="absolute text-black bottom-0 flex flex-col p-6 rounded-lg space-y-3">
            <span className="font-semibold text-xl bg-[white] px-4 py-1 rounded-md shadow-sm">{recentlyUploaded?.subject_name}</span>
            <span className="font-light bg-[white] px-3 py-1 rounded-md w-[fit-content] shadow-sm">{recentlyUploaded?.teacher_name}</span>
          </div>
        </div>
      ) : (
        <div className="text-center grid place-items-center">
          <p>No recently uploaded subjects yet</p>
        </div>
      )}
    </div>
  );
}

export default CoverPhotos;
