import React from "react";
import Header from "../Header";
import ComingSoon from "../../ComingSoon";

function LibraryHome() {
  return (
    <div>
      <Header headerName={"Library"} />
      <h1 className="lg:hidden font-semibold text-xl p-2">Library</h1>
      <ComingSoon />
    </div>
  );
}

export default LibraryHome;
