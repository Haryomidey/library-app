import React from 'react'
import Header from '../Header'
import { FaUser, FaCamera } from 'react-icons/fa'

const NewTeacher = () => {
    return (
        <main  className="w-full h-screen ">
            <Header headerName="New teacher" />

            <div className="relative pt-6 px-12 w-full h-full bg-white">
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
                        <h2>Personal Information</h2>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default NewTeacher
