import SubjectIcon from '../../../img/courses.png';
import { FaCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useGetToken from '../../../utils/useGetToken';
import { GetNotifications } from '../../admin/AdminControllers';
import { useEffect, useState } from 'react';

function Tasks({ subjects }: any) {
  const route = useNavigate();
  const { token } = useGetToken();
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await GetNotifications(token);
      if (data && data?.success) {
        const sortedNotifications = data.data.sort((a: any, b: any) => b.notification_id - a.notification_id);
        setNotifications(sortedNotifications);
      }
    };
    fetchData();
  }, [token]);

  return (
    <div className="grid lg:grid-cols-2 gap-10 mb-5">
      <div className="grid grid-cols-1 gap-5 w-full">
        <div
          className="flex flex-col justify-center rounded-xl bg-[#FAFAFA] space-y-2 border-2 self-center py-3 h-fit text-center mx-auto w-full cursor-pointer"
          onClick={() => route('/student/subjects')}
        >
          <img src={SubjectIcon} alt="" className="mx-auto self-center" />
          <h1>Subjects</h1>
          <b className="text-lg">{subjects?.length}</b>
        </div>
      </div>
      <div className="bg-[#FAFAFA] p-4 rounded-xl border-2">
        <h1 className="font-semibold text-lg">Announcements</h1>
        {notifications && notifications?.length > 0 && notifications.slice(0, 2).map((notification, index) => (
          <li className="flex gap-2 [&>*]:self-center p-3 border-b-2 cursor-pointer" onClick={() => route('/student/all-notifications')} key={index}>
            <FaCircle className={`text-xs ${index % 2 === 0 ? 'text-[#F5C451]' : 'text-[#4E0D76]'}`} />
            <span>{notification.message}</span>
          </li>
        ))}
        {notifications && notifications?.length <= 0 && <p className='text-center text-xl font-semibold pt-4'>No Announcement yet!!</p>}
      </div>
    </div>
  );
}

export default Tasks;
