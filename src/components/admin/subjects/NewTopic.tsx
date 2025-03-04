import React, { useEffect, useRef, useState } from "react";
import { BiCloudUpload } from "react-icons/bi";
import { CreateTopic } from "../AdminControllers";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import useGetToken from "../../../utils/useGetToken";
import { FaSpinner } from "react-icons/fa6";

const NewTopic = () => {
  const { grade, subjectId } = useParams();
  const { token } = useGetToken();
  const [title, setTitle] = useState("");
  const [loader, setLoader] = useState(false);
  const [term, setTerm] = useState(1);
  const [introduction, setIntroduction] = useState("");
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const uploadedVideo = useRef<HTMLInputElement | null>(null);
  const uploadedFile = useRef<HTMLInputElement | null>(null);
  const coverPhoto = useRef<any>();
  const [selectedCoverPhoto, setSelectedCoverPhoto] = useState<File | null>(
    null
  );
  const [selectedSubject, setSelectedSubject] = useState<string>("");

  const handleTopicSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !introduction || !grade || !subjectId) {
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

      formData.append("school_id", "1");
      formData.append("subject_id", subjectId.toString());
      formData.append("term_id", term.toString());
      formData.append("grade_ids[]", grade);

      formData.append("title", title);
      formData.append("introduction", introduction);
      if (video) {
        formData.append("video", video);
      }
      if (file) {
        formData.append("file", file);
      }
      if (selectedCoverPhoto) {
        formData.append("cover", selectedCoverPhoto);
      }
      const topicCreation = await CreateTopic(formData, token);
      if (topicCreation) {
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
        window.location.href = `/admin/subjects/${subjectId}/${grade}/${topicCreation.id}`;
      } else {
        Swal.fire({
          title: "Topic not Added",
          icon: "error",
          timer: 4000
        });
      }
    } catch (error: any) {
      console.error("Error uploading topic:", error);
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
      if (file.size > 100 * 1024 * 1024) {
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "Video file size must be less than 100MB",
          timer: 4000
        });
        return;
      }
      setVideo(file);
    }
  };

  const handleFileSelectionDisplay = () => {
    const file = uploadedFile.current?.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "File size must be less than 10MB",
          timer: 4000
        });
        return;
      }
      const validTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ];
      if (!validTypes.includes(file.type)) {
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "Invalid file type. Only PDF, DOCX, and Excel files are allowed.",
          timer: 4000
        });
        return;
      }
      setFile(file);
      setFileName(file.name);
    }
  };
  const handleCoverSelectionDisplay = () => {
    const file = coverPhoto.current.files[0];
    if (file) {
      const img = new Image();
      img.onload = () => {
        setSelectedCoverPhoto(file);
      };
      img.src = URL.createObjectURL(file);
    }
  };

  // useEffect(() => {
  //   const fetchSubject = async () => {
  //     try {
  //       if (!subjectId) return;
  //       const data = await GetSubject(parseInt(subjectId), token);
  //       setSelectedSubject(data[0].subject_name);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchSubject();
  // }, [subjectId]);

  return (
    <div>
      <form onSubmit={handleTopicSubmission} className="py-5  space-y-5">
        <div className="flex justify-between">
          <select
            onChange={(e) => setTerm(parseInt(e.target.value))}
            className="px-3 py-2 rounded-md border border-[#E4E4E7]]"
          >
            <option value="1">1st Term</option>
            <option value="2">2nd Term</option>
            <option value="3">3rd Term</option>
          </select>
        </div>
        <input
          type="text"
          className="p-4 focus:outline-none w-full border-1 border-[#E4E4E7]]"
          placeholder="Topic Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="space-y-3">
          <label className="font-semibold">Add a Cover Photo</label>
          {!selectedCoverPhoto ? (
            <div className="bg-white h-48 rounded-lg flex">
              <div className="self-center mx-auto py-5">
                <div className="bg-[#F9FAFB] p-6 mx-auto w-fit rounded-full">
                  <BiCloudUpload className="text-4xl text-[#98A2B3]" />
                </div>
                <p className="font-light text-lg text-center">
                  <span
                    onClick={() => {
                      coverPhoto.current.click();
                    }}
                    className="font-semibold cursor-pointer text-blue-500"
                  >
                    Click to upload &nbsp;
                  </span>
                </p>
                <p className="text-[#98A2B3]">
                  SVG, PNG, JPG or GIF (max. 800x400px)
                </p>
              </div>
            </div>
          ) : (
            <img
              src={URL.createObjectURL(selectedCoverPhoto)}
              onClick={() => {
                coverPhoto.current.click();
              }}
              className="h-48 w-full object-contain cursor-pointer"
              alt=""
            />
          )}
          <input
            type="file"
            ref={coverPhoto}
            onChange={handleCoverSelectionDisplay}
            className="hidden"
            accept="image/*"
          />
        </div>
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
          <div className="bg-white rounded-lg [&>*]:self-center px-5 py-2 gap-4">
            <div className="flex justify-between">
              <div className="flex gap-4">
                <div className="bg-[#F9FAFB] p-2 w-fit rounded-full">
                  <BiCloudUpload className="text-4xl text-[#98A2B3]" />
                </div>
                <div className="self-center">
                  <h1 className="text-sm">
                    Upload Additional Materials for students
                  </h1>
                  <p className="text-[#98A2B3]">PDF, DOC, EXCEL | 10MB max.</p>
                </div>
              </div>
              <span
                onClick={(e) => {
                  e.preventDefault();
                  uploadedFile.current?.click();
                }}
                className="self-center text-blue-500 font-semibold text-sm flex cursor-pointer gap-2 rounded-md py-2 px-8"
              >
                Tap to Upload
              </span>
            </div>
            <input
              type="file"
              accept=".pdf,.docx,.xlsx"
              ref={uploadedFile}
              className="hidden"
              onChange={handleFileSelectionDisplay}
            />
            <li className="p-4 list-inside list-none">{fileName}</li>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 mx-auto rounded-lg w-fit place-content-center text-white px-10 py-2 cursor-pointer"
          >
            {loader ? <FaSpinner className="animate-spin" /> : "Add Topic"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewTopic;
