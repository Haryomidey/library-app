import React from 'react'
import Header from '../Header'
import { FaUser, FaCamera } from 'react-icons/fa'
import { IoIosAdd } from "react-icons/io";

const NewTeacher = () => {
    return (
        <main  className="w-full min-h-screen pb-10 bg-white">
            <Header headerName="New teacher" />

            <div className="relative pt-6 px-12 w-full min-h-full">
                <h1 className='text-2xl font-semibold'>Add teacher</h1>

                <div className='mt-6'>
                    <h2 className='text-xl font-semibold'>Profile Picture</h2>
                    <p>We recommend an image of about 500 x 500 and about 10mb</p>

                    <div className='w-20 h-20 rounded-full grid place-items-center shadow-md bg-[#FFE7CC] mt-8 relative'>
                        <FaUser />

                        <div className='absolute right-0 top-[-8px] h-8 w-8 rounded-full grid place-items-center bg-[#667185] text-white'>
                            <FaCamera className='text-sm' />
                        </div>
                    </div>

                    <div className='mt-8'>
                        <h2 className='text-xl font-semibold mb-4'>Personal Information</h2>

                        <form>
                            <div className='grid gap-2'>
                                <label htmlFor="">Title</label>
                                <select name="" id="" className='w-[fit-content] p-2 border'>
                                    <option value="">Mr</option>
                                    <option value="">Mrs</option>
                                    <option value="">Miss</option>
                                </select>
                            </div>
                            <div className='grid grid-cols-2 gap-8 mt-5'>
                                <div className='grid gap-2'>
                                    <label htmlFor="">First Name</label>
                                    <input
                                        type="text"
                                        className='p-2 w-full border rounded'
                                        placeholder='Enter your first name'
                                    />
                                </div>
                                <div className='grid gap-2'>
                                    <label htmlFor="">Last Name</label>
                                    <input
                                        type="text"
                                        className='p-2 w-full border rounded'
                                        placeholder='Enter your last name'
                                    />
                                </div>
                                <div className='grid gap-2'>
                                    <label htmlFor="">Dob</label>
                                    <input
                                        type="date"
                                        className='p-2 w-full border rounded'
                                    />
                                </div>
                                <div className='grid gap-2'>
                                    <label htmlFor="">Gender</label>
                                    <div className='flex items-center gap-8'>
                                        <p className='flex items-center gap-2'>
                                            <input type="radio" name="gender" id="" />
                                            <span>Male</span>
                                        </p>
                                        <p className='flex items-center gap-2'>
                                            <input type="radio" name="gender" id="" />
                                            <span>Female</span>
                                        </p>
                                    </div>
                                </div>
                                <div className='col-span-2 flex items-center justify-end text-white'>
                                    <button className='flex items-center gap-2 px-5 py-2 rounded bg-[#2B5BFC]'>
                                        <IoIosAdd />
                                        <p>Add</p>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default NewTeacher
