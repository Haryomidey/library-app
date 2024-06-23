import React from "react";
import ComingSoon from "../../ComingSoon";
import Header from "../Header";

function Settings() {
  return (
    <div>
      <Header headerName={"Settings"} />
      <h1 className="lg:hidden font-semibold text-xl p-2">Settings</h1>
      <ComingSoon />
    </div>
  );
}

export default Settings;
