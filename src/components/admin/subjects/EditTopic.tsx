import React, { useRef, useState } from "react";
import NewSubjectHeader from "./NewSubjectHeader";
import { gradeInterface } from "./EditSubject";
import { BiCloudUpload } from "react-icons/bi";

const EditTopic = ({ gradesProp }: { gradesProp: gradeInterface[] | null }) => {
  const [loader] = useState(false);
  const [week, setWeek] = useState<number>();
  const [selectedGrade, setSelectedGrade] = useState<number>();
  const [grades, setGrades] = useState<gradeInterface[] | null>(gradesProp);
  const [title, setTitle] = useState<string>();
  const [introduction, setIntroduction] = useState<string>();
  const [video, setVideo] = useState<File>();
  const [file, setFile] = useState<File>();
  const uploadedVideo = useRef<HTMLInputElement | null>(null);
  const uploadedFile = useRef<HTMLInputElement | null>(null);

  const handleVideoSelectionDisplay = () => {};
  const handleFileSelectionDisplay = () => {};
  const handleTopicEdit = () => {};
  return (
    <div>
      <NewSubjectHeader
        headerName={"Add Topic"}
        loader={loader}
        handleSubmit={handleTopicEdit}
        actionButtonName="Publish"
      />
      <form className="py-5 px-10 space-y-8">
        <div className="flex justify-between">
          <select
            onChange={(e) => setWeek(Number(e.target.value))}
            className="px-3 py-2 rounded-md border border-[#E4E4E7]]"
          >
            {[1, 2, 3, 4, 5].map((weekNum) => (
              <option key={weekNum} value={weekNum}>
                Week {weekNum}
              </option>
            ))}
          </select>
          <select
            onChange={(e) => setSelectedGrade(Number(e.target.value))}
            className="px-3 py-2 rounded-md border border-[#E4E4E7]]"
          >
            {grades?.map((grade) => (
              <option key={grade.grade_id} value={grade.grade_id}>
                {grade.grade_name}
              </option>
            ))}
          </select>
        </div>
        <input
          type="text"
          className="p-4 focus:outline-none w-full border-1 border-[#E4E4E7]]"
          placeholder="Topic Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {!video ? (
          <div className="bg-white h-64 rounded-lg flex">
            <div className="self-center mx-auto py-5">
              <div className="bg-[#F9FAFB] p-6 mx-auto w-fit rounded-full">
                <BiCloudUpload className="text-4xl text-[#98A2B3]" />
              </div>
              <p className="font-light text-lg text-center">
                <span
                  onClick={() => uploadedVideo.current?.click()}
                  className="font-semibold cursor-pointer text-blue-500"
                >
                  Click to upload your video &nbsp;
                </span>
                or drag and drop
              </p>
              <input
                type="file"
                ref={uploadedVideo}
                className="hidden"
                onChange={handleVideoSelectionDisplay}
                accept="video/*"
              />
              <p className="text-[#98A2B3] text-center">(max. 100mb)</p>
            </div>
          </div>
        ) : (
          <video
            src={URL.createObjectURL(video)}
            controls
            className="h-48 w-full object-cover"
          ></video>
        )}
        <textarea
          className="min-h-36 w-full rounded-lg p-4 focus:outline-none"
          value={introduction}
          onChange={(e) => setIntroduction(e.target.value)}
          placeholder="Add your topic introduction ..."
        />
        <div className="space-y-3">
          <label>For Additional Materials</label>
          <div className="bg-white rounded-lg flex justify-between [&>*]:self-center px-5 py-2 gap-4">
            <div className="flex gap-4">
              <div className="bg-[#F9FAFB] p-2 w-fit rounded-full">
                <BiCloudUpload className="text-4xl text-[#98A2B3]" />
              </div>
              <div className="self-center">
                <h1>Tap to Upload</h1>
                <p className="text-[#98A2B3]">PDF, DOC, EXCEL | 10MB max.</p>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                uploadedFile.current?.click();
              }}
              className="bg-blue-500 flex [&>*]:self-center gap-2 text-white rounded-md py-2 px-8"
            >
              Upload
            </button>
            <input
              type="file"
              accept=".pdf,.docx,.xlsx"
              ref={uploadedFile}
              className="hidden"
              onChange={handleFileSelectionDisplay}
            />
            <h1>{file?.name}</h1>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditTopic;
