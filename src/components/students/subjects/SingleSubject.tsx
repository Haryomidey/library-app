import { useEffect, useState } from "react";
import Header from "../Header";
import CourseContent from "./CourseContent";
import CourseCoverPhoto from "./CourseCoverPhoto";
import Cookies from "js-cookie";
import { GetAllTopicsUnderSubject } from "../StudentController";
import useGetToken from "../../../utils/useGetToken";

interface GradeState {
  grade_id: string | null;
}

interface CourseCoverPhotoProps {
  cover: string;
  teacher_name: string;
  subject_name: string;
  grade: string;
}

const updateCookieArray = (newObject: CourseCoverPhotoProps) => {
  const cookieName = "recently_viewed";
  let dataArray = [];

  const existingData = Cookies.get(cookieName);
  if (existingData) {
    dataArray = JSON.parse(existingData);
  }

  dataArray = dataArray.filter((item: CourseCoverPhotoProps) => (
    item.cover !== newObject.cover ||
    item.teacher_name !== newObject.teacher_name ||
    item.subject_name !== newObject.subject_name ||
    item.grade !== newObject.grade
  ));

  dataArray.unshift(newObject);

  if (dataArray.length > 3) {
    dataArray.pop();
  }

  Cookies.set(cookieName, JSON.stringify(dataArray), { expires: 7 });
};

function SingleSubject() {
  const {token} = useGetToken();
  const [subjectState, setSubjectState] = useState<any>(null);
  const [topics, setTopics] = useState<any>(null);
  const [selectedGradeState, setSelectedGradeState] = useState<GradeState>({
    grade_id: null,
  });

  const [courseCoverPhotoContent, setCourseCoverPhotoContent] = useState<CourseCoverPhotoProps | null>(null);

  useEffect(() => {
    const subject = Cookies.get("selectedSubject");
    const grades = Cookies.get("grades");

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
          const data = await GetAllTopicsUnderSubject(subjectState.subject_id, token);
          setTopics(data);
          
          const coverPhotoData = {
            cover: subjectState.cover || "",
            teacher_name: subjectState.teacher_name || "",
            subject_name: subjectState.subject_name || "",
            grade: selectedGradeState.grade_id || "",
          };

          setCourseCoverPhotoContent(coverPhotoData);

          updateCookieArray(subjectState);
        } catch (error: any) {
          console.error(error.message);
        }
      }
    };

    fetchTopicDetails();
  }, [subjectState, selectedGradeState]);

  return (
    <div>
      <Header headerName="Course" />
      <div className="px-5 lg:px-10 py-5 space-y-5">
        {courseCoverPhotoContent && <CourseCoverPhoto {...courseCoverPhotoContent} />}
        <CourseContent contents={topics} subject_name={courseCoverPhotoContent?.subject_name} />
      </div>
    </div>
  );
}

export default SingleSubject;
