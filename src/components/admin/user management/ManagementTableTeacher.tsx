import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { IoArrowDownSharp } from "react-icons/io5";
import { GoQuestion } from "react-icons/go";
import { HiOutlineTrash } from "react-icons/hi";
import { MdOutlineEdit } from "react-icons/md";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import { FaSpinner } from 'react-icons/fa';

import MaleAvatar from '../../../icons/male_avatar.svg';
import FemaleAvatar from '../../../icons/female_avatar.svg';
import { DeleteTeacher } from '../AdminControllers';
import { useNavigate } from 'react-router-dom';
import useGetToken from '../../../utils/useGetToken';

interface User {
  image: string;
  first_name: string;
  last_name: string;
  dob: string;
  gender: "male" | "female";
  grade: string;
  role: string;
  email: string;
  password: string;
  user_id: any;
}

interface UserTableProps {
  data: User[];
  fetchAllTeachers: () => void
}

const ManagementTableTeacher: React.FC<UserTableProps> = ({ data, fetchAllTeachers }) => {
  const {token} = useGetToken();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const rowsPerPage = 5;

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [data]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderPageNumbers = () => {
    if (isLoading) {
      return <span>Loading...</span>;
    }

    if (!data || data.length === 0) {
      return <span>No data available</span>;
    }

    const totalPages = Math.ceil(data.length / rowsPerPage);
    let pages = [];

    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages = [1, 2, 3, 4, '...', totalPages - 2, totalPages - 1, totalPages];
      } else if (currentPage >= totalPages - 2) {
        pages = [1, 2, 3, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
      } else {
        pages = [1, 2, 3, '...', currentPage, totalPages - 2, totalPages - 1, totalPages];
      }
    }

    return pages.map((page, index) => {
      if (page === '...') {
        return <span key={index} className="px-3 py-1">...</span>;
      } else {
        return (
          <button
            key={index}
            className={`px-3 py-1 ${currentPage === page ? 'bg-[#EFF8FF] border rounded-md' : ''}`}
            onClick={() => setCurrentPage(page as number)}
          >
            {page}
          </button>
        );
      }
    });
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data?.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(data?.length / rowsPerPage);

  const handleDelete = async (teacherId: any) => {
    setIsDeleting(true);
    const result = await DeleteTeacher(teacherId, token);
    console.log(result);
    setIsDeleting(false);
    if (result.success) {
      Swal.fire('Deleted!', 'Teacher has been deleted.', 'success');
      fetchAllTeachers()
    } else {
      Swal.fire('Error!', 'Failed to delete teacher.', 'error');
    }
  };

  const confirmDelete = (teacherId: any) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(teacherId);
        fetchAllTeachers()
      }
    });
  };

  const router = useNavigate();

  const handleRoute = (id: any) => {
    router(`/admin/user-management/edit-teacher/${id}`)
}

  return (
    <div className="w-full mt-8 pb-5 overflow-x-scroll min-w-full">
      {isDeleting && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <FaSpinner className="animate-spin text-white text-4xl" />
        </div>
      )}
      <table className="w-full">
        <thead className="table-head">
          <tr>
            <th>
              <div className="flex items-center gap-2">
                <input type="checkbox" />
                <p>Image</p>
              </div>
            </th>
            <th>Name</th>
            <th>
              <p className="flex items-center gap-1">Status <IoArrowDownSharp /></p>
            </th>
            <th></th>
            <th>Email address</th>
            <th className='whitespace-nowrap'>Date of Birth</th>
            <th>Gender</th>
            {/* <th>Password</th> */}
            <th></th>
          </tr>
        </thead>
        <tbody className="table-body td">
          {currentRows?.map((user, index) => (
            <tr key={index}>
              <td>
                <div className="flex items-center gap-2">
                  <input type="checkbox" />
                  <p className='w-[40px] h-[40px]'>
                    {user?.gender === 'male' ?
                      <img
                        src={user?.image === null || user?.image === '' ? MaleAvatar : user?.image}
                        alt=''
                        className='w-full h-full rounded-full overflow-hidden'
                      />
                      :
                      <img
                        src={user?.image === null || user?.image === '' ? FemaleAvatar : user?.image}
                        alt=''
                        className='w-full h-full rounded-full overflow-hidden'
                      />
                    }
                  </p>
                </div>
              </td>
              <td>
                <p>{user?.first_name} {user?.last_name}</p>
              </td>
              <td>
                <div className="w-[fit-content] flex items-center gap-1 bg-[#ECFDF3] px-2 py-1 rounded-lg">
                  <p className="bg-[#12B76A] h-2 w-2 rounded-full"></p>
                  <p className="text-[#027A48]">active</p>
                </div>
              </td>
              <td>{user?.grade}</td>
              <td>{user?.email}</td>
              <td>{user?.dob}</td>
              <td>{user?.gender}</td>
              {/* <td>{user?.password ? user.password : 'none'}</td> */}
              <td>
                <div className="flex items-center gap-2">
                  <p className='text-[#F44336] cursor-pointer' onClick={() => confirmDelete(user.user_id)}><HiOutlineTrash /></p>
                <p className='text-[#4CAF50] cursor-pointer' onClick={() => handleRoute(user.user_id)}><MdOutlineEdit /></p>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full mt-6 flex items-center justify-between">
        <button
          className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors ease duration-500 ${currentPage === 1 ? '' : 'hover:bg-[#d4d4d4]'}`}
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          <IoMdArrowBack /> Previous
        </button>
        <div>
          {renderPageNumbers()}
        </div>
        <button
          className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors ease duration-500 ${currentPage === totalPages ? '' : 'hover:bg-[#d4d4d4]'}`}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next <IoMdArrowForward />
        </button>
      </div>
    </div>
  );
};

export default ManagementTableTeacher;
