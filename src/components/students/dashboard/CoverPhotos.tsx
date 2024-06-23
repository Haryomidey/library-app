import React from "react";
import photos from "../../../utils/students/coverSubjects.json";
function CoverPhotos() {
  return (
    <div className="grid lg:grid-cols-2 gap-10">
      {photos.map((photo, index) => (
        <div key={index} className="relative rounded-xl bg-[#FAFAFA]">
          <img
            src={photo.picture}
            className="w-full object-cover h-72 rounded-lg"
            alt=""
          />
          <div className="absolute text-white bottom-0 flex flex-col p-6 rounded-lg space-y-3">
            <span className="font-semibold ">{photo.name}</span>
            <span className="font-light">{photo.lecturer}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CoverPhotos;
