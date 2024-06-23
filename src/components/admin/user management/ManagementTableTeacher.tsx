import React, { useEffect, useState } from 'react';
import { IoArrowDownSharp } from "react-icons/io5";
import { GoQuestion } from "react-icons/go";
import { HiOutlineTrash } from "react-icons/hi";
import { MdOutlineEdit } from "react-icons/md";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";

interface User {
    first_name: string;
    last_name: string;
    dob: string;
    gender: string | null;
    role: string;
    email: string;
}

interface UserTableProps {
    data: User[];
}

const ManagementTableTeacher: React.FC<UserTableProps> = ({ data }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const rowsPerPage = 5;

    useEffect(() => {
        const fetchData = async () => {
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        };

        fetchData();
    }, [data]);

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = data?.slice(indexOfFirstRow, indexOfLastRow);

    const totalPages = Math.ceil(data?.length / rowsPerPage);

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
        let pages = [];

        if (totalPages <= 6) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                pages = [1, 2, 3, 4, '...', totalPages];
            } else if (currentPage >= totalPages - 2) {
                pages = [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
            } else {
                pages = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
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

    return (
        <div className="w-full mt-8 pb-5">
            <table className="w-full">
                <thead className="table-head">
                    <tr>
                        <th>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" />
                                <p>Name</p>
                            </div>
                        </th>
                        <th>
                            <p className="flex items-center gap-1">Status <IoArrowDownSharp /></p>
                        </th>
                        <th>
                            <p className="flex items-center gap-1">Role <GoQuestion /></p>
                        </th>
                        <th>Email address</th>
                        <th>Date of Birth</th>
                        <th>Gender</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className="table-body td">
                    {currentRows?.map((user, index) => (
                        <tr key={index}>
                            <td>
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" />
                                    <p>{user?.first_name} {user?.last_name}</p>
                                </div>
                            </td>
                            <td>
                                <div className="w-[fit-content] flex items-center gap-1 bg-[#ECFDF3] px-2 py-1 rounded-lg">
                                    <p className="bg-[#12B76A] h-2 w-2 rounded-full"></p>
                                    <p className="text-[#027A48]">active</p>
                                </div>
                            </td>
                            <td>{user?.role}</td>
                            <td>{user?.email}</td>
                            <td>{user?.dob}</td>
                            <td>{user?.gender ? user.gender : 'nill'}</td>
                            <td>
                                <div className="flex items-center gap-2">
                                    <p><HiOutlineTrash /></p>
                                    <p><MdOutlineEdit /></p>
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
                    {isLoading ? <span>Processing...</span> : renderPageNumbers()}
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
