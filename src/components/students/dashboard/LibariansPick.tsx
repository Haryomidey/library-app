import React from "react";

function LibariansPick() {
  const picks = [
    {
      name: "Mathematics",
      rank: "Upper Primary Level",
      color: "bg-[#58A942]"
    },
    {
      name: "Integrated Science",
      rank: "Upper Primary Level",
      color: "bg-[#FF9053]"
    },
    {
      name: "Virtual Art",
      rank: "Upper Primary Level",
      color: "bg-[#353297]"
    }
  ];
  return (
    <div>
      <h3 className="font-semibold text-lg">Libarian's Pick of the week</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 py-4">
        {picks.map(
          (
            pick: { name: string; rank: string; color: string },
            index: number
          ) => (
            <div
              className="bg-white lg:p-2 p-4 h-60 lg:h-72 rounded-lg cursor-pointer"
              key={index}
            >
              <div className={`${pick.color} rounded-lg h-3/5`}></div>
              <div className="p-4 h-2/5">
                <h3 className="font-medium">{pick.name}</h3>
                <p className="font-light">{pick.rank}</p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default LibariansPick;
