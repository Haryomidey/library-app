import { useEffect, useState } from "react";
import Header from "../Header";
import CourseContent from "./CourseContent";
import CourseCoverPhoto from "./CourseCoverPhoto";
import Cookies from "js-cookie";
import useGetToken from "../../../utils/useGetToken";
import { GetAllTopicsUnderSubject } from "../../admin/AdminControllers";

interface GradeState {
  grade_id: string | null;
}

interface CourseCoverPhotoProps {
  cover: string;
  teacher_name: string;
  subject_name: string;
  grade: string;
  subject_id: string;
}

function StudentSubjectForGrade() {
  const { token } = useGetToken();
  const [subjectState, setSubjectState] = useState<any>(null);
  const [topics, setTopics] = useState<any>(null);
  const [selectedGradeState, setSelectedGradeState] = useState<GradeState>({
    grade_id: null
  });

  const [courseCoverPhotoContent, setCourseCoverPhotoContent] =
    useState<CourseCoverPhotoProps | null>(null);

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
      if (subjectState?.subject_id) {
        try {
          const data = await GetAllTopicsUnderSubject(
            subjectState.subject_id,
            token
          );
          let topicsForGrade = data.filter(
            (topic: any) =>
              topic.grade_id === selectedGradeState.grade_id?.toString()
          );
          setTopics(topicsForGrade);

          const coverPhotoData = {
            cover: subjectState.cover || "",
            subject_id: subjectState.subject_id || "",
            teacher_name: subjectState.teacher_name || "",
            subject_name: subjectState.subject_name || "",
            grade: selectedGradeState.grade_id || ""
          };

          setCourseCoverPhotoContent(coverPhotoData);
        } catch (error: any) {
          console.error(error.message);
        }
      }
    };

    fetchTopicDetails();
  }, [subjectState, selectedGradeState, token]);

  return (
    <div>
      <Header headerName="Course" />
      <div className="px-5 lg:px-10 py-5 space-y-5">
        {courseCoverPhotoContent && (
          <CourseCoverPhoto {...courseCoverPhotoContent} />
        )}
        <CourseContent
          contents={topics}
          grade={courseCoverPhotoContent?.grade}
          subject_id={courseCoverPhotoContent?.subject_id}
        />
      </div>
    </div>
  );
}

export default StudentSubjectForGrade;
