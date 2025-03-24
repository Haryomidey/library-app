import DefaultImage from "../../../img/default-image.png";

interface CourseCoverPhotoProps {
  cover: string;
  teacher_name: string;
  subject_name: string;
  grade: string;
}

function CourseCoverPhoto(content: CourseCoverPhotoProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-5">
      <div className="max-w-[300px] w-full">
        <img
          src={content.cover ? content.cover : DefaultImage}
          className="w-full rounded-md max-w-full"
          alt="Course Cover"
        />
      </div>
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold">{content.subject_name}</h1>
        <p>Grade {content.grade}</p>
        <p>
          Instructor:{" "}
          <span className="font-semibold text-blue-500">
            {content.teacher_name ? content.teacher_name : "nill"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default CourseCoverPhoto;
