import React, { useEffect, useRef, useState } from "react";
import NewSubjectHeader from "./NewSubjectHeader";
import { useNavigate, useParams } from "react-router-dom";
import { BiCloudUpload } from "react-icons/bi";
import useGetToken from "../../../utils/useGetToken";
import {
  EditTopic as EditTopicAPI,
  GetAllTopicsUnderSubject
} from "../AdminControllers";
import Swal from "sweetalert2";

export interface topicInterface {
  id: string;
  subject_id: string;
  grade_id: string;
  week: string;
  title: string;
  introduction: string;
  video: string | undefined | null;
  file: string | undefined | null;
}
const EditTopic = ({ name }: { name: string }) => {
  const { token } = useGetToken();
  const { id } = useParams();
  const [loader, setLoader] = useState(false);
  const [topics, setTopics] = useState<topicInterface[]>();
  const [pageLoader, setPageLoader] = useState(true);
  const [week, setWeek] = useState<string>("1");
  const [title, setTitle] = useState<string>();
  const [topicId, setTopicId] = useState<string>();
  const [introduction, setIntroduction] = useState<string>("");
  const [video, setVideo] = useState<File>();
  const [file, setFile] = useState<File>();
  const [videoUrl, setVideoUrl] = useState<string | null>();
  const [fileUrl, setFileUrl] = useState<string | null>();
  const uploadedVideo = useRef<HTMLInputElement | null>(null);
  const uploadedFile = useRef<HTMLInputElement | null>(null);
  const route = useNavigate();
  const handleVideoSelectionDisplay = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      setVideo(event.target.files[0]);
      setVideoUrl(null);
    }
  };

  const handleFileSelectionDisplay = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
      setFileUrl(null);
    }
  };

  const handleTopicEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoader(true);

    try {
      if (!id || !week || !title) return;
      const formData = new FormData();
      formData.append("school_id", "1");
      formData.append("subject_id", id);
      formData.append("week", week);
      formData.append("title", title);
      formData.append("introduction", introduction);
      if (video) {
        formData.append("video", video);
      }
      if (file) {
        formData.append("file", file);
      }

      const data = await EditTopicAPI(formData, topicId, token);
      if (data) {
        console.log("Topic updated successfully:", data);
        Swal.fire({
          title: "Update Successful",
          icon: "success",
          timer: 2000
        });
        route(`/admin/subjects/${name}`);
      } else {
        Swal.fire({
          title: "Oops!",
          text: "An error occured",
          icon: "error",
          timer: 2000
        });
        console.error("Unexpected response structure:", data);
      }
    } catch (error) {
      console.error("Error updating topic:", error);
    }

    setLoader(false);
  };

  useEffect(() => {
    if (!id) return;
    const fetchTopic = async () => {
      try {
        const data = await GetAllTopicsUnderSubject(id, token);
        if (data) {
          setTopics(data);
          console.log(data);
        }
      } catch (error) {
        console.error("Error fetching topic:", error);
        setPageLoader(false);
      }
    };
    fetchTopic();
  }, [token, id]);

  useEffect(() => {
    topics?.map((topic: topicInterface) => {
      if (topic.week === week) {
        setIntroduction(topic?.introduction);
        setWeek(topic?.week);
        setVideoUrl(topic?.video);
        setFileUrl(topic?.file);
        setTopicId(topic?.id);
        setTitle(topic?.title);
      }
      return 0;
    });
  }, [topics, week]);
  return (
    <div>
      <NewSubjectHeader
        headerName={"Edit Topic"}
        loader={loader}
        handleSubmit={handleTopicEdit}
        actionButtonName="Publish"
      />
      <form className="py-5 px-10 space-y-8" onSubmit={handleTopicEdit}>
        <div className="flex justify-between">
          <select
            onChange={(e) => setWeek(e.target.value)}
            className="px-3 py-2 rounded-md border border-[#E4E4E7]]"
            value={week}
          >
            {[1, 2, 3, 4, 5].map((weekNum) => (
              <option key={weekNum} value={weekNum}>
                Week {weekNum}
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
          <div className="bg-white h-64 rounded-lg flex flex-col justify-center gap-5 px-5 text-center">
            {!videoUrl ? (
              <div className="self-center mx-auto py-5">
                <div className="bg-[#F9FAFB] p-6 mx-auto w-fit rounded-full">
                  <BiCloudUpload className="text-4xl text-[#98A2B3]" />
                </div>
                <p className="font-light text-lg text-center">
                  <span className="font-semibold text-blue-500">
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
            ) : (
              <a href={videoUrl} className="text-blue-500">
                {videoUrl}
              </a>
            )}
            <button
              onClick={(e) => {
                e.preventDefault();
                uploadedVideo.current?.click();
              }}
              className="bg-blue-500 flex mx-auto w-fit [&>*]:self-center gap-2 text-white rounded-md py-2 px-8"
            >
              Upload
            </button>
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
              {!fileUrl ? (
                <div className="self-center">
                  <h1>Tap to Upload</h1>
                  <p className="text-[#98A2B3]">PDF, DOC, EXCEL | 10MB max.</p>
                </div>
              ) : (
                <a href={fileUrl} className="text-blue-500">
                  {fileUrl}
                </a>
              )}
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
