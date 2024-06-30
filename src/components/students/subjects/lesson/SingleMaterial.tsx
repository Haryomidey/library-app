

import { useEffect, useState } from "react";
import Header from "../../Header";
import { GetAllTopicsUnderSubject } from "../../StudentController";
import Cookies from "js-cookie";
import { FaUser } from "react-icons/fa";



function SingleMaterial() {


  const [subjectState, setSubjectState] = useState<any>(null);
  const [topics, setTopics] = useState<any>(null);

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
          console.log(topics?.video)
        } catch (error: any) {
          console.error(error.message);
        }
      }
    };

    fetchTopicDetails();
  }, [subjectState]);

  return (
    <div>
      <Header headerName="Courses" />
      <div className="px-5 lg:px-10 py-5">
        <div className="flex flex-wrap gap-2 text-blue-500 ext-sm list-none [&>*]:self-center">
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
              alt="feyi"
              className="self-center h-16 w-16 rounded-full"
            />
            <div className="flex flex-col text-slate-500 self-center">
              <h3>{subjectState?.teacher_name ?? 'nill'}</h3>
              <span className="text-sm">Instructor</span>
            </div>
          </div>
          <div>
            {topics?.introduction}
          </div>

          <div className='mt-5'>
            <h2 className='font-semibold text-xl'>22 Comments</h2>
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

              <div className='mt-3 flex gap-4'>
                <div className='min-w-12 h-12 rounded-full grid place-items-center shadow-md bg-[#eeeded]'>
                  <FaUser />
                </div>
                <div>
                  <p><span className='font-semibold'>John Doe</span> <span className='text-[gray] text-sm'>12 mins ago</span></p>
                  <p className='text-sm'>Elementum placerat semper ut porttitor. Diam aliquet ultrices suspendisse nunc. Venenatis ornare eu accumsan nec luctus lectus eget in. Placerat scelerisque eros volutpat eleifend a urna. Mollis proin ullamcorper nec semper in tortor platea est. Viverra justo et loborti arcu adipiscing nisl vehicula. Arcu nisl fusce eget purus quis quam ornare lectus rutrum. Bibendum nunc at viverra nunc quis mattis non nec sagittis. </p>
                </div>
              </div>
                
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleMaterial;
