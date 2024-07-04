import React from "react";
import Header from "../Header";
import Tasks from "./Tasks";
import CoverPhotos from "./CoverPhotos";
import LibariansPick from "./LibariansPick";
import Trending from "./Trending";
function StudentDashboard() {
  return (
    <>
      <Header headerName="Dashboard" />
      <div className="space-y-10 px-5 lg:px-10 ">
        <Tasks />
        <CoverPhotos />
        <LibariansPick />
        <Trending />
      </div>
    </>
  );
}

export default StudentDashboard;
