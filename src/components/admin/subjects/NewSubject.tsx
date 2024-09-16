import React, { useEffect, useRef, useState } from "react";
import NewSubjectHeader from "./NewSubjectHeader";
import { BiCloudUpload } from "react-icons/bi";
import { CreateSubject, GetAllTeachers } from "../AdminControllers";
import useGetToken from "../../../utils/useGetToken";

interface NewSubjectProps {
  contentUpdate: any;
  idUpdate: any;
}

function NewSubject({ idUpdate, contentUpdate }: NewSubjectProps) {
  const { token } = useGetToken();
  const [grade, setGrade] = useState<number[]>([]);
  const [loader, setLoader] = useState(false);
  const [subjectDescription, setSubjectDescription] = useState("");
  const [department, setDepartment] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [teacherId, setTeacherId] = useState<string | null>("");
  const coverPhoto = useRef<any>();
  const [selectedCoverPhoto, setSelectedCoverPhoto] = useState<File | null>(
    null
  );
  const [teachers, setTeachers] = useState<
    { teacher_id: string; first_name: string; last_name: string }[]
  >([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubjectSubmission = async (e: any) => {
    e.preventDefault();
    if (!validateInputs()) {
      return;
    }

    setLoader(true);
    try {
      const formData = new FormData();
      formData.append("school_id", "1");
      formData.append("teacher_id", teacherId || "");
      grade.forEach((g) => formData.append("grade_ids[]", g.toString()));
      formData.append("subject_name", subjectName);
      formData.append("subject_description", subjectDescription);
      formData.append("department", department);
      if (selectedCoverPhoto) {
        formData.append("cover", selectedCoverPhoto);
      }

      const data = await CreateSubject(formData, token);
      console.log(data);
      if (data && data.subject) {
        idUpdate(data.subject.id);
        contentUpdate("topic");
      } else {
        console.error("Unexpected response structure:", data);
      }
    } catch (error) {
      console.error(error);
    }
    setLoader(false);
  };

  const validateInputs = () => {
    let newErrors: { [key: string]: string } = {};
    if (!subjectName) newErrors.subjectName = "Subject title is required.";
    if (!department) newErrors.department = "Department is required.";
    if (!teacherId) newErrors.teacherId = "Teacher is required.";
    if (!subjectDescription)
      newErrors.subjectDescription = "Description is required.";
    if (grade.length === 0)
      newErrors.grade = "At least one grade must be selected.";
    if (
      selectedCoverPhoto &&
      !["image/jpeg", "image/png", "image/gif"].includes(
        selectedCoverPhoto.type
      )
    ) {
      newErrors.coverPhoto = "Cover photo must be an image (JPEG, PNG, GIF).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSelectionDisplay = () => {
    const file = coverPhoto.current.files[0];
    if (file) {
      const img = new Image();
      img.onload = () => {
        if (img.width > 800 || img.height > 400) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            coverPhoto: "Cover photo must be at most 800x400px."
          }));
          setSelectedCoverPhoto(null);
        } else {
          setSelectedCoverPhoto(file);
          setErrors((prevErrors) => {
            const { coverPhoto, ...rest } = prevErrors;
            return rest;
          });
        }
      };
      img.src = URL.createObjectURL(file);
    }
  };

  useEffect(() => {
    if (token) {
      const fetchTeachers = async () => {
        try {
          const data = await GetAllTeachers(token);
          if (data) {
            setTeachers(data);
          }
        } catch (error) {
          console.error("Error fetching teachers:", error);
        }
      };

      fetchTeachers();
    }
  }, [token]);

  return (
    <div>
      <NewSubjectHeader
        headerName="Add a New Subject"
        handleSubmit={handleSubjectSubmission}
        actionButtonName="Next"
        loader={loader}
      />

      <form className="flex flex-col gap-6 px-10 py-5">
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
                  or drag and drop
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
            onChange={handleSelectionDisplay}
            className="hidden"
            accept="image/*"
          />
          {errors.coverPhoto && (
            <p className="text-red-500">{errors.coverPhoto}</p>
          )}
        </div>

        <div className="space-y-3">
          <label className="font-semibold">Class Grade</label>
          <div className="flex flex-wrap gap-3">
            {["JSS1", "JSS2", "JSS3", "SS1", "SS2", "SS3"].map(
              (gradeLabel, index) => (
                <div key={index}>
                  <input
                    type="checkbox"
                    value={index + 1}
                    name="grade"
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      setGrade((prevGrade) => {
                        if (prevGrade.includes(value)) {
                          return prevGrade.filter((item) => item !== value);
                        } else {
                          return [...prevGrade, value];
                        }
                      });
                    }}
                  />
                  <label>{gradeLabel}</label>
                </div>
              )
            )}
          </div>
          {errors.grade && <p className="text-red-500">{errors.grade}</p>}
        </div>

        <div className="space-y-3">
          <label className="font-semibold">Subject department</label>
          <div className="flex gap-3">
            {["Art", "Science", "Commercial"].map((dept, index) => (
              <div key={index}>
                <input
                  type="radio"
                  onChange={(e) => setDepartment(e.target.value)}
                  value={dept}
                  name="department"
                />
                <label>{dept}</label>
              </div>
            ))}
          </div>
          {errors.department && (
            <p className="text-red-500">{errors.department}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-10">
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Subject Title</label>
            <input
              type="text"
              required
              onChange={(e) => setSubjectName(e.target.value)}
              placeholder="Integrated science"
              className="focus:outline-none rounded-md py-4 px-3"
            />
            {errors.subjectName && (
              <p className="text-red-500">{errors.subjectName}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold">Teacher</label>
            <select
              className="focus:outline-none rounded-md py-4 px-3"
              value={teacherId || ""}
              onChange={(e) => setTeacherId(e.target.value)}
            >
              <option value="" disabled>
                Select Teacher
              </option>
              {teachers.map((teacher, index) => (
                <option key={index} value={teacher.teacher_id}>
                  {`${teacher.first_name} ${teacher.last_name}`}
                </option>
              ))}
            </select>
            {errors.teacherId && (
              <p className="text-red-500">{errors.teacherId}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold">Description</label>
          <textarea
            className="rounded-md min-h-36 p-3 focus:outline-none"
            onChange={(e) => setSubjectDescription(e.target.value)}
            placeholder="Describe your subject in few words"
          />
          {errors.subjectDescription && (
            <p className="text-red-500">{errors.subjectDescription}</p>
          )}
        </div>
      </form>
    </div>
  );
}

export default NewSubject;
