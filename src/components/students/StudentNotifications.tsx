import React, { useEffect, useState } from 'react'
import Header from './Header';
import timeAgo from '../../utils/time-converter';
import { FaUser } from 'react-icons/fa';
import { GetNotifications } from '../admin/AdminControllers';

const StudentNotifications = () => {
    const [notifications, setNotifications] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
          const data = await GetNotifications();
          console.log(data)
          if (data?.success) {
            const sortedNotifications = data.data.sort((a: any, b: any) => b.notification_id - a.notification_id);
            setNotifications(sortedNotifications);
          }
        };
        fetchData();
      }, []);

    return (
        <div>
            <Header headerName="Notifications" />
            <div className='w-full h-full flex flex-col justify-center items-center'>
                <div className='w-full max-w-[700px] px-5'>
                    {notifications.map((notification) => (
                        <div key={notification.notification_id} className="mt-5 w-full flex gap-3 border-b pb-3">
                            <p className="min-w-12 h-12 rounded-full bg-[#FFECE5] grid place-items-center"><FaUser /></p>
                            <div>
                                <p className='font-semibold border p-2'>{notification.message}</p>
                                <p className="text-xs text-[#98A2B3] mt-1">{timeAgo(notification.created_at)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default StudentNotifications
