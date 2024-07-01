import React, { useState } from 'react'
import { IoIosAdd, IoIosClose } from 'react-icons/io'

const Communication = () => {

    const [modalBox, setModalBox] = useState(false);

    return (
        <div className="w-full">
            <h2 className='text-2xl font-semibold'>Communication</h2>
            <div className='flex items-center justify-between w-full mt-5'>
                <div className='text-sm'>
                    <p>Push Notification Management</p>
                    <p className='text-[gray]'>Schedule & send important messages to your users or review your current push notification</p>
                </div>
                <div>
                    <button className='flex items-center gap-2 px-5 py-2 rounded bg-[#2B5BFC] text-white' onClick={() => setModalBox(true)}>
                        <IoIosAdd className='text-2xl'/>
                        <p>Add new notification</p>
                    </button>
                </div>
            </div>


            <div className={`fixed w-full top-8 left-0 right-0 bottom-0 h-screen bg-[#00000057] grid place-items-center ${!modalBox ? 'invisible' : 'visible'}`}>
                <div className={`bg-white w-[90%] max-w-[1000px] h-[85%] rounded-lg p-5 overflow-y-scroll ${modalBox ? 'ml-0' : 'ml-[-200%]'} transition-[margin] ease duration-300`}>
                    <div className='w-full flex items-center justify-between'>
                        <h2 className='text-lg font-semibold'>Add new notification</h2>
                        <IoIosClose className='text-2xl cursor-pointer' onClick={() => setModalBox(false)} />
                    </div>

                    <form className="flex flex-col gap-4">
                        <div className='mt-6'>
                            <label htmlFor="" className='text-sm mb-2'>Title</label>
                            <input 
                                type="text" 
                                className='w-full border p-2 rounded-md'
                                placeholder='Monthly Subscription'
                            />
                        </div>
                        <div>
                            <label htmlFor="" className='text-sm mb-2'>User group(s)</label>
                            <select
                                className='w-full border p-2 rounded-md'
                            >
                                <option value="teachers">Teachers</option>
                                <option value="students">Students</option>
                            </select>
                        </div>
                        <div className='mt-6'>
                            <label htmlFor="" className='text-sm mb-2'>Active from</label>
                            <input 
                                type="date" 
                                className='w-full border p-2 rounded-md'
                            />
                        </div>
                        <div className='mt-6'>
                            <label htmlFor="" className='text-sm mb-2'>Active until</label>
                            <input 
                                type="date" 
                                className='w-full border p-2 rounded-md'
                            />
                        </div>
                        <div className='mt-6'>
                            <label htmlFor="" className='text-sm mb-2'>Active until</label>
                            <textarea
                                className='w-full min-h-[120px] border p-2 rounded-md'
                                placeholder='Message...'
                            ></textarea>
                            <small>Put your notification message here</small>
                        </div>
                        <button className='w-[fit-content] gap-2 px-5 py-2 rounded bg-[#2B5BFC] text-white'>
                            <p>Save</p>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Communication
