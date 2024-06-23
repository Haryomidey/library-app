import React from "react";

function Trending() {
  const trends = [
    {
      name: "Mathematics",
      rank: "Upper Primary Level"
    },
    {
      name: "Integrated Science",
      rank: "Upper Primary Level"
    },
    {
      name: "Virtual Art",
      rank: "Upper Primary Level"
    }
  ];
  return (
    <div>
      <div className="gap-4">
        <h3 className="font-semibold text-lg">Trending</h3>
        <p>Covers that will make you want to read</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 py-4">
        {trends.map((trend: { name: string; rank: string }, index: number) => (
          <div
            className="bg-white lg:p-2 p-4 h-60 lg:h-72 rounded-lg cursor-pointer"
            key={index}
          >
            <div className="bg-[#58A942] rounded-lg h-3/5"></div>
            <div className="p-4">
              <h3 className="font-medium">{trend.name}</h3>
              <p className="font-light">{trend.rank}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Trending;
