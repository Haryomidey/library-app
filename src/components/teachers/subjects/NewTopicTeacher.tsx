import React, { useEffect, useRef, useState } from "react";
import NewSubjectHeader from "./NewSubjectHeader";
import { BiCloudUpload } from "react-icons/bi";
import { CreateTopic, GetSubject } from "../../admin/AdminControllers";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom"; 
import useGetToken from "../../../utils/useGetToken";

interface NewTopicProps {
  subjectId: number;
}

interface GradeType {
  grade_id: number;
  grade_name: string;
}

const NewTopicTeacher = ({ subjectId }: NewTopicProps) => {
  const {token} = useGetToken();
  const [title, setTitle] = useState("");
  const [loader, setLoader] = useState(false);
  const [week, setWeek] = useState(1);
  const [introduction, setIntroduction] = useState("");
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<number | null>(1);
  const [grades, setGrades] = useState<GradeType[] | null>(null);
  const uploadedVideo = useRef<HTMLInputElement | null>(null);
  const uploadedFile = useRef<HTMLInputElement | null>(null);

  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const route = useNavigate();

  const handleTopicSubmission = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation check
    if (!title || !introduction || !selectedGrade) {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "Please fill all required fields",
        timer: 4000
      });
      return;
    }

    setLoader(true);
    try {
      const formData = new FormData();
      formData.append("subject_id", subjectId.toString());
      formData.append("grade_id", selectedGrade?.toString() || "");
      formData.append("week", week.toString());
      formData.append("title", title);
      formData.append("introduction", introduction);
      if (video) {
        formData.append("video", video);
      }
      if (file) {
        formData.append("file", file);
      }
      await CreateTopic(formData, token);
      Swal.fire({
        title: "Topic Added Successfully",
        icon: "success",
        timer: 4000
      });
      setTitle("");
      setIntroduction("");
      setFile(null);
      setVideo(null);
      setFileName("");
      route(`/teacher/subjects`);
    } catch (error: any) {
      Swal.fire({
        title: "Topic not Added",
        icon: "error",
        text: error.message,
        timer: 4000
      });
    }
    setLoader(false);
  };

  const handleVideoSelectionDisplay = () => {
    const file = uploadedVideo.current?.files?.[0];
    if (file) {
      setVideo(file);
    }
  };

  const handleFileSelectionDisplay = () => {
    const file = uploadedFile.current?.files?.[0];
    if (file) {
      setFile(file);
      setFileName(file.name);
    }
  };

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const data = await GetSubject(subjectId, token);
        setSelectedSubject(data[0].subject_name);
        setGrades(data.grade);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSubject();
  }, [subjectId]);

  return (
    <div>
      <NewSubjectHeader
        headerName={"Add Topic"}
        loader={loader}
        handleSubmit={handleTopicSubmission}
        actionButtonName="Publish"
      />
      <form className="py-5 px-10 space-y-8">
        <div className="flex justify-between">
          <select
            onChange={(e) => setWeek(Number(e.target.value))}
            className="px-3 py-2 rounded-md border border-[#E4E4E7]]"
          >
            {[1, 2, 3, 4, 5].map((weekNum) => (
              <option key={weekNum} value={weekNum}>Week {weekNum}</option>
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
                <p className="text-[#98A2B3]">
                  JPG, PDF, MP3, DOC, EXCEL | 10MB max.
                </p>
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
              ref={uploadedFile}
              className="hidden"
              onChange={handleFileSelectionDisplay}
            />
            <h1>{fileName}</h1>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewTopicTeacher;
