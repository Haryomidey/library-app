import { useEffect, useState } from "react";
import Header from "../../Header";
import { GetAllTopicsUnderSubject, GetComments } from "../../AdminControllers";
import Cookies from "js-cookie";
import { FaUser } from "react-icons/fa";
import timeAgo from "../../../../utils/time-converter";

function SingleMaterialAdmin() {
  const [subjectState, setSubjectState] = useState<any>(null);
  const [topics, setTopics] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);

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
          setTopics(data[0]);
          console.log(data);
        } catch (error: any) {
          console.error(error.message);
        }
      }
    };

    fetchTopicDetails();
  }, [subjectState]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await GetComments();
        console.log(data);
        setComments(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchComments();
  }, []);

  return (
    <div>
      <Header headerName="Courses" />
      <div className="px-5 lg:px-10 py-5">
        <div className="flex flex-wrap gap-2 text-blue-500 text-sm list-none [&>*]:self-center">
          <li>{subjectState?.subject_name} &gt;&nbsp;</li>
          <li>Week {topics?.week} - {topics?.title} &gt;&nbsp;</li>
          <li>Week {topics?.week} Material &gt;&nbsp;</li>
          <li className="text-black">Week {topics?.week} Video&gt;&nbsp;</li>
        </div>
        <div className="py-5 space-y-5">
          <video
            src={topics?.video}
            controls
            className="w-full h-[400px]"
          />
          <h1 className="text-xl font-semibold">{topics?.title}</h1>
          <div className="flex gap-2">
            <img
              src="/images/student-avatar.png"
              alt="student"
              className="self-center h-16 w-16 rounded-full"
            />
            <div className="flex flex-col text-slate-500 self-center">
              <h3>{!subjectState?.teacher_name ? 'nill' : subjectState?.teacher_name}</h3>
              <span className="text-sm">Instructor</span>
            </div>
          </div>
          <div>
            {topics?.introduction}
          </div>

          <div className='mt-5'>
            <h2 className='font-semibold text-xl'>{comments.length} Comments</h2>
            <div className='flex flex-col gap-4'>
              <div className='mt-3 flex gap-4'>
                <div className='min-w-12 h-12 rounded-full grid place-items-center shadow-md bg-[#eeeded]'>
                  <FaUser />
                </div>
                <div className="w-full">
                  <input 
                    type="text"
                    placeholder="Do you have a question or comment? Drop it here..."
                    className="w-full border-b border-[black] px-2 bg-transparent"
                  />
                  <div className="w-full flex items-center justify-end mt-3">
                    <button className="px-5 py-2 rounded-full">Cancel</button>
                    <button className="px-5 py-2 rounded-full bg-[#3471E1] text-white">Comment</button>
                  </div>
                </div>
              </div>

              {comments.map(comment => (
                <div key={comment.comment_id} className="flex flex-col gap-4 border-b pb-6">
                  <div className='mt-3 flex gap-4'>
                    <div className='min-w-12 h-12 rounded-full grid place-items-center shadow-md bg-[#eeeded]'>
                      <FaUser />
                    </div>
                    <div>
                      <p><span className='font-semibold'>{comment.user_name}</span> <span className='text-[gray] text-sm'>{timeAgo(commen.created_at)}</span></p>
                      <p className='text-sm'>{comment.comment}</p>
                    </div>
                  </div>
                  {comment.replies && comment.replies.map((reply:any) => (
                    <div key={reply.comment_id} className='ml-10 mt-3 flex gap-4 border-t pt-4'>
                      <div className='min-w-12 h-12 rounded-full grid place-items-center shadow-md bg-[#eeeded]'>
                        <FaUser />
                      </div>
                      <div>
                        <p><span className='font-semibold'>{reply.user_name}</span> <span className='text-[gray] text-sm'>{timeAgo(reply.created_at)}</span></p>
                        <p className='text-sm'>{reply.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleMaterialAdmin;
