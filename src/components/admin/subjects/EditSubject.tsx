import React, { useEffect, useRef, useState } from "react";
import NewSubjectHeader from "./NewSubjectHeader";
import { BiCloudUpload } from "react-icons/bi";
import { GetSubject, EditSubject, GetAllTeachers } from "../AdminControllers";
import useGetToken from "../../../utils/useGetToken";
import { useParams } from "react-router-dom";
import Loading from "../../Loading";

export interface gradeInterface {
  grade_id: string;
  grade_name: number;
}
function EditSubjectComp({
  contentUpdate,
  gradeUpdate
}: {
  contentUpdate: (form: string) => void;
  gradeUpdate: (grade: gradeInterface[] | null) => void;
}) {
  const { id } = useParams();
  const { token } = useGetToken();
  const [grades, setGrades] = useState<gradeInterface[] | null>(null);
  const [loader, setLoader] = useState(false);
  const [subjectDescription, setSubjectDescription] = useState("");
  const [pageLoader, setPageLoader] = useState(true);
  const [department, setDepartment] = useState("");
  const [cover, setCover] = useState<string>("");
  const [subjectName, setSubjectName] = useState("");
  const [teacherId, setTeacherId] = useState<number>(0);
  const coverPhoto = useRef<any>();
  const [selectedCoverPhoto, setSelectedCoverPhoto] = useState<File | null>(
    null
  );
  const [teachers, setTeachers] = useState<
    { teacher_id: string; first_name: string; last_name: string }[]
  >([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubjectEdit = async (e: any) => {
    e.preventDefault();
    if (!validateInputs()) {
      return;
    }

    setLoader(true);
    try {
      const formData = new FormData();
      formData.append("school_id", "1");
      formData.append("teacher_id", teacherId.toString());
      // grade.forEach((g) => formData.append("grade_ids[]", g.toString()));
      formData.append("subject_name", subjectName);
      formData.append("subject_description", subjectDescription);
      formData.append("department", department);
      if (selectedCoverPhoto) {
        formData.append("cover", selectedCoverPhoto);
      }
      const data = await EditSubject(formData, id, token);
      console.log(data);
      if (data) {
        contentUpdate("topic");
        gradeUpdate(grades);
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
    if (grades?.length === 0)
      newErrors.grades = "At least one grade must be selected.";
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
      setSelectedCoverPhoto(file);
    }
  };

  useEffect(() => {
    if (!id) return;
    const fetchSubject = async () => {
      try {
        const data = await GetSubject(parseInt(id), token);
        if (data) {
          console.log(data);
          setSubjectName(data[0].subject_name);
          setDepartment(data[0].department);
          setGrades(data[0].grades);
          setSubjectDescription(data[0].subject_description);
          setTeacherId(data[0].teacher_id);
          setCover(data[0].cover);
        }
      } catch (error) {
        console.error("Error fetching subject: ", error);
        setPageLoader(false);
      }
    };
    const fetchTeachers = async () => {
      try {
        const data = await GetAllTeachers(token);
        if (data) {
          setTeachers(data);
        }
        setPageLoader(false);
      } catch (error) {
        console.error("Error fetching teachers: ", error);
        setPageLoader(false);
      }
    };
    fetchSubject();
    fetchTeachers();
  }, [token, id]);
  if (pageLoader) {
    return <Loading />;
  }
  return (
    <div>
      <NewSubjectHeader
        headerName="Edit Subject"
        handleSubmit={handleSubjectEdit}
        actionButtonName="Update"
        loader={loader}
      />

      <form className="flex flex-col gap-6 px-10 py-5">
        <div className="space-y-3">
          <label className="font-semibold">Add a Cover Photo</label>
          {!selectedCoverPhoto && !cover ? (
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
              src={
                !selectedCoverPhoto
                  ? cover
                  : URL.createObjectURL(selectedCoverPhoto)
              }
              onClick={() => {
                coverPhoto.current.click();
              }}
              className="h-48 w-full object-cover cursor-pointer"
              alt=""
            />
          )}
          <input
            type="file"
            ref={coverPhoto}
            onChange={handleSelectionDisplay}
            className="hidden"
          />
          {errors.coverPhoto && (
            <p className="text-red-500">{errors.coverPhoto}</p>
          )}
        </div>

        <div className="space-y-3">
          <label className="font-semibold">Class Grade</label>
          <div className="flex flex-wrap gap-3">
            {["JSS1", "JSS2", "JSS 3", "SS1", "SS2", "SS3"].map(
              (grade: string, index: number) => (
                <div key={index}>
                  <input
                    type="checkbox"
                    checked={grades?.some(
                      (selectedGrade) => selectedGrade.grade_id === grade
                    )}
                    name="grade"
                    onChange={(e) => {
                      const value = {
                        grade_id: e.target.value,
                        grade_name: index + 1
                      };
                      setGrades((prevGrade) => {
                        if (!prevGrade) return [value];
                        if (prevGrade.includes(value)) {
                          return prevGrade.filter((item) => item !== value);
                        } else {
                          return [...prevGrade, value];
                        }
                      });
                    }}
                  />
                  <label>{grade}</label>
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
                  checked={department === dept}
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
              value={subjectName}
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
              value={teacherId}
              onChange={(e) => setTeacherId(parseInt(e.target.value))}
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
            value={subjectDescription}
            className="rounded-md min-h-36 p-3 focus:outline-none"
            onChange={(e) => setSubjectDescription(e.target.value)}
          />
          {errors.subjectDescription && (
            <p className="text-red-500">{errors.subjectDescription}</p>
          )}
        </div>
      </form>
    </div>
  );
}

export default EditSubjectComp;
