import DefaultImage from '../../../img/default-image.png'

interface CourseCoverPhotoProps {
  cover: string
  teacher_name: string
  subject_name: string
  grade: string
}

function CourseCoverPhoto(content: CourseCoverPhotoProps) {


  console.log(content)
  return (
    <div className="flex flex-col lg:flex-row gap-5">
      <img src={content.cover ? content.cover : DefaultImage} className='w-[300px] max-h-[300px] rounded-md max-w-full object-cover' alt="Course Cover" />
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold">{content.subject_name}</h1>
        <p>Grade {content.grade}</p>
        <p>
          Instructor: <span className="font-semibold text-blue-500">{content.teacher_name ? content.teacher_name : 'nill'}</span>
        </p>
      </div>
    </div>
  );
}

export default CourseCoverPhoto;
