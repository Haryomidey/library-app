import { useEffect, useState } from "react";
import Tasks from "./Tasks";
import CoverPhotos from "./CoverPhotos";

import { GetAllSubjects } from "../StudentController";
import useGetToken from "../../../utils/useGetToken";
import RecentlyViewed from "./RecentlyViewed";
import NewlyUpdated from "./NewlyUpdated";

import Cookies from 'js-cookie'

function StudentDashboard() {
  const { token } = useGetToken();
  const [subjects, setSubjects] = useState<any[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<any[]>([]);

  const fetchStudentSubjects = async () => {
    if (token) {
      try {
        const data = await GetAllSubjects(token);
        if (data) {
          setSubjects(data);
        }
      } catch (err: any) {
        console.error(err.message);
      }
    }
    const unparsedData = Cookies.get('recently_viewed');
    if (unparsedData) {
      const parsedData = JSON.parse(unparsedData);
      setRecentlyViewed(parsedData);
    }
  };

  useEffect(() => {
    fetchStudentSubjects();
  }, [token]);

  return (
    <div className="px-5 lg:px-10 pt-8">
      <Tasks subjects={subjects}/>
      <CoverPhotos subjects={subjects} justViewed={recentlyViewed}/>
      <RecentlyViewed subjects={recentlyViewed}/>
      <NewlyUpdated subjects={subjects}/>
    </div>
  );
}

export default StudentDashboard;
