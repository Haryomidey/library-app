import React from "react";
import Header from "../Header";
import ComingSoon from "../../ComingSoon";

function AdminSettings() {
  return (
    <div>
      <Header headerName="Settings" />
      <div className="relative">
        <ComingSoon />
      </div>
    </div>
  );
}

export default AdminSettings;
