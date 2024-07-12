
import Header from "../Header";
import Tasks from "./Tasks";
import CoverPhotos from "./CoverPhotos";
import LibariansPick from "./LibariansPick";
import Trending from "./Trending";
function StudentDashboard() {
  return (
    <>
      <div className="px-5 lg:px-10 pt-8">
        <Tasks />
        <CoverPhotos />
        <LibariansPick />
        <Trending />
      </div>
    </>
  );
}

export default StudentDashboard;
