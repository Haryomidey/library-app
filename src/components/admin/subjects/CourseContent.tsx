import { useEffect, useState } from "react";
import { FaAngleDown, FaAngleRight, FaEdit, FaTrash } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { DeleteTopic } from "../AdminControllers";
import useGetToken from "../../../utils/useGetToken";
import NewTopic from "./NewTopic";
import GradeList from "./../../../utils/grades.json";
import { gradeInterface } from "./EditSubject";
import { FaAngleUp } from "react-icons/fa6";
interface CourseContentProps {
  term_id: string;
  cover: string;
  title: string;
  id: string;
}

interface Props {
  contents: CourseContentProps[];
  subject_id: any;
  grade: string | undefined;
}

function CourseContent({ contents, subject_id, grade }: Props) {
  const [loading, setLoading] = useState(true);
  const [isNewTopic, setIsNewTopic] = useState(false);
  const router = useNavigate();
  const { token } = useGetToken();
  const [termsToShow, setTermsToShow] = useState<string[]>(["1"]);

  useEffect(() => {
    if (contents?.length > 0 || contents?.length === 0) {
      setLoading(false);
    }
  }, [contents]);

  const handleTopicDelete = (topic_id: any) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const deleteTopic = await DeleteTopic(topic_id, token);
        if (deleteTopic) {
          // subjects.filter((subject) => subject_id !== subject.subject_id);
          Swal.fire({
            title: "Deleted Successfully",
            icon: "success",
            timer: 2000
          });
          router(0);
        } else {
          Swal.fire({
            title: "Oops!",
            icon: "error",
            text: deleteTopic.error,
            timer: 2000
          });
        }
      }
    });
  };

  const handleRouting = (id: string, title: string) => {
    router(`/admin/subjects/${subject_id}/${grade}/${id}`);
  };

  const handleNewTopicRoute = () => {
    setIsNewTopic(true);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (isNewTopic) {
    return <NewTopic />;
  }

  return (
    <div>
      <div className="w-full flex items-center justify-between py-2">
        <h1 className="hidden lg:block text-lg font-semibold">
          Course Content
        </h1>
        <button
          className="flex items-center gap-3 text-[#2B5BFC]"
          onClick={handleNewTopicRoute}
        >
          <IoMdAdd />
          Add new topic
        </button>
      </div>
      <div className="[&>*]:space-y-4 py-6 flex flex-col gap-8">
        <div>
          <div
            className="flex gap-2 [&>*]:self-end"
            onClick={() =>
              setTermsToShow((prev) => {
                if (prev.includes("1")) {
                  return prev.filter((term) => term !== "1");
                } else {
                  return [...prev, "1"];
                }
              })
            }
          >
            <h1 className="font-semibold text-3xl">1st Term</h1>
            {termsToShow.includes("1") && (
              <FaAngleDown className="text-xl cursor-pointer " />
            )}
            {!termsToShow.includes("1") && (
              <FaAngleUp className="text-xl cursor-pointer" />
            )}
          </div>
          <div
            className={`${
              !termsToShow.includes("1") ? "h-0" : "h-fit"
            } overflow-y-hidden grid grid-cols-3 gap-10`}
          >
            {contents?.length > 0 ? (
              contents.map((content, index: number) => {
                return (
                  content.term_id === "1" && (
                    <div
                      className="bg-white h-72 p-2 rounded-lg cursor-pointer"
                      key={index}
                    >
                      {content.cover ? (
                        <img
                          src={content?.cover}
                          onClick={(e) => {
                            e.preventDefault();
                            handleRouting(content.id, content.title);
                          }}
                          alt={content.title}
                          className="object-cover rounded-lg w-full h-1/2"
                        />
                      ) : (
                        <div
                          className="bg-[#58A942] rounded-lg h-1/2"
                          onClick={(e) => {
                            e.preventDefault();
                            handleRouting(content.id, content.title);
                          }}
                        ></div>
                      )}
                      <div className="h-fit p-4 flex flex-col gap-5">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{content.title}</h3>
                          <label className="px-4 py-1 rounded-2xl h-fit bg-[#58A942]/20 text-green-500 ">
                            Active
                          </label>
                        </div>
                        <div className="flex gap-3 self-end">
                          <FaEdit
                            onClick={() => {
                              router(
                                `/admin/subjects/${subject_id}/${grade}/edit/${content.id}`
                              );
                            }}
                            className="self-center text-yellow-500 cursor-pointer"
                          />
                          <FaTrash
                            onClick={(e) => {
                              e.preventDefault();
                              handleTopicDelete(content.id);
                            }}
                            className="text-red-500 cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                  )
                );
              })
            ) : (
              <p className="text-red-500 col-span-3">
                No topic assigned to this subject
              </p>
            )}
          </div>
        </div>

        <div>
          <div
            className="flex gap-2 [&>*]:self-end"
            onClick={() =>
              setTermsToShow((prev) => {
                if (prev.includes("2")) {
                  return prev.filter((term) => term !== "2");
                } else {
                  return [...prev, "2"];
                }
              })
            }
          >
            <h1 className="font-semibold text-3xl">2nd Term</h1>
            {termsToShow.includes("2") && (
              <FaAngleDown className="text-xl cursor-pointer" />
            )}
            {!termsToShow.includes("2") && (
              <FaAngleUp className="text-xl cursor-pointer" />
            )}
          </div>
          <div
            className={`${
              !termsToShow.includes("2") ? "h-0" : "h-fit"
            } overflow-y-hidden grid grid-cols-3 gap-10`}
          >
            {" "}
            {contents?.length > 0 ? (
              contents.map((content, index: number) => {
                return (
                  content.term_id === "2" && (
                    <div
                      className="bg-white h-72 p-2 rounded-lg cursor-pointer"
                      key={index}
                    >
                      {content.cover ? (
                        <img
                          src={content?.cover}
                          onClick={(e) => {
                            e.preventDefault();
                            handleRouting(content.id, content.title);
                          }}
                          alt={content.title}
                          className="object-cover rounded-lg w-full h-1/2"
                        />
                      ) : (
                        <div
                          className="bg-[#58A942] rounded-lg h-1/2"
                          onClick={(e) => {
                            e.preventDefault();
                            handleRouting(content.id, content.title);
                          }}
                        ></div>
                      )}
                      <div className="h-fit p-4 flex flex-col gap-5">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{content.title}</h3>
                          <label className="px-4 py-1 rounded-2xl h-fit bg-[#58A942]/20 text-green-500 ">
                            Active
                          </label>
                        </div>
                        <div className="flex gap-3 self-end">
                          <FaEdit
                            onClick={() => {
                              router(
                                `/admin/subjects/${subject_id}/${grade}/edit/${content.id}`
                              );
                            }}
                            className="self-center text-yellow-500 cursor-pointer"
                          />
                          <FaTrash
                            onClick={(e) => {
                              e.preventDefault();
                              handleTopicDelete(content.id);
                            }}
                            className="text-red-500 cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                  )
                );
              })
            ) : (
              <p className="text-red-500 col-span-3">
                No topic assigned to this subject
              </p>
            )}
          </div>
        </div>

        <div>
          <div
            className="flex gap-2 [&>*]:self-end"
            onClick={() =>
              setTermsToShow((prev) => {
                if (prev.includes("3")) {
                  return prev.filter((term) => term !== "3");
                } else {
                  return [...prev, "3"];
                }
              })
            }
          >
            <h1 className="font-semibold text-3xl">3rd Term</h1>
            {termsToShow.includes("3") && (
              <FaAngleDown className="text-xl cursor-pointer" />
            )}
            {!termsToShow.includes("3") && (
              <FaAngleUp className="text-xl cursor-pointer" />
            )}
          </div>
          <div
            className={`${
              !termsToShow.includes("3") ? "h-0" : "h-fit"
            } overflow-y-hidden grid grid-cols-3 gap-10`}
          >
            {contents?.length > 0 ? (
              contents.map((content, index: number) => {
                return (
                  content.term_id === "3" && (
                    <div
                      className="bg-white h-72 p-2 rounded-lg cursor-pointer"
                      key={index}
                    >
                      {content.cover ? (
                        <img
                          src={content?.cover}
                          onClick={(e) => {
                            e.preventDefault();
                            handleRouting(content.id, content.title);
                          }}
                          alt={content.title}
                          className="object-cover rounded-lg w-full h-1/2"
                        />
                      ) : (
                        <div
                          className="bg-[#58A942] rounded-lg h-1/2"
                          onClick={(e) => {
                            e.preventDefault();
                            handleRouting(content.id, content.title);
                          }}
                        ></div>
                      )}
                      <div className="h-fit p-4 flex flex-col gap-5">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{content.title}</h3>
                          <label className="px-4 py-1 rounded-2xl h-fit bg-[#58A942]/20 text-green-500 ">
                            Active
                          </label>
                        </div>
                        <div className="flex gap-3 self-end">
                          <FaEdit
                            onClick={() => {
                              router(
                                `/admin/subjects/${subject_id}/${grade}/edit/${content.id}`
                              );
                            }}
                            className="self-center text-yellow-500 cursor-pointer"
                          />
                          <FaTrash
                            onClick={(e) => {
                              e.preventDefault();
                              handleTopicDelete(content.id);
                            }}
                            className="text-red-500 cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                  )
                );
              })
            ) : (
              <p className="text-red-500 col-span-3">
                No topic assigned to this subject
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseContent;
