import React from "react";
import Header from "../Header";
import ComingSoon from "../../ComingSoon";

function Library() {
  return (
    <div>
      <Header headerName="Library" />
      <div className="relative">
        <ComingSoon />
      </div>
    </div>
  );
}

export default Library;
