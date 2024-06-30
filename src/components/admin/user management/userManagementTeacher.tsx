import { useNavigate } from "react-router-dom";
import Header from "../Header";

// Icons import
import { IoMdAdd, IoIosSearch } from "react-icons/io";
import { IoFilter } from "react-icons/io5";
import { LuUploadCloud } from "react-icons/lu";
import ManagementTableTeacher from "./ManagementTableTeacher";
import { useEffect, useState } from "react";
import { GetAllTeachers } from "../AdminControllers";

function UserManagementTeacher() {
  const [teachers, setTeachers] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const router = useNavigate();

  const fetchAllTeachers = async () => {
    try {
      const response = await GetAllTeachers();
      setTeachers(response);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchAllTeachers();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredTeachers = teachers?.filter(
    (teacher: any) =>
      teacher?.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher?.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher?.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full h-screen bg-white">
      <Header headerName="User Management" />
      <div className="relative pt-6 px-12 w-full h-full">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <p>Teachers</p>
            <span className="text-[#175CD3] bg-[#EFF8FF] text-sm rounded-2xl px-3 py-1">
              {filteredTeachers?.length} users
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button className="border flex [&>*]:self-center gap-2 rounded-md py-2 px-5">
              <LuUploadCloud />
              Import
            </button>
            <button
              className="bg-blue-500 flex [&>*]:self-center gap-2 text-white rounded-md py-2 px-8"
              onClick={() => router("/admin/user-management/new-teacher")}
            >
              <IoMdAdd />
              Add teacher
            </button>
          </div>
        </div>

        <div className="w-full flex items-center justify-between mt-8">
          <div className="flex items-center border rounded-lg h-[40px] px-3">
            <p className="cursor-pointer flex items-center pr-3 border-r h-full">
              View all
            </p>
            <p className="cursor-pointer flex items-center px-3 border-r h-full">
              H.O.D
            </p>
            <p className="cursor-pointer pl-3">Class teacher</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-2 border rounded-md h-[40px]">
              <IoIosSearch />
              <input
                type="text"
                className="h-full bg-transparent"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <div className="flex items-center gap-2 px-2 border rounded-md h-[40px]">
              <button className="flex [&>*]:self-center gap-2 py-2 px-5">
                <IoFilter />
                Filters
              </button>
            </div>
          </div>
        </div>

        {searchQuery ? (
          filteredTeachers?.length > 0 ? (
            <ManagementTableTeacher data={filteredTeachers} />
          ) : (
            <p className="mt-8 text-xl text-center text-gray-500">
              Your search does not match any teacher
            </p>
          )
        ) : (
          <ManagementTableTeacher data={teachers} />
        )}
      </div>
    </div>
  );
}

export default UserManagementTeacher;
