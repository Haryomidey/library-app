import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { IoIosAdd, IoIosClose } from 'react-icons/io';
import { PostNotification } from '../AdminControllers';

const Communication = () => {
  const [form, setForm] = useState({
    title: '',
    group: '',
    from: '',
    till: '',
    message: ''
  });
  const [errors, setErrors] = useState<any>({});
  const [modalBox, setModalBox] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
  
    const newErrors: any = {};
    if (!form.title) newErrors.title = ["The title field is required."];
    if (!form.group) newErrors.group = ["The group field is required."];
    if (!form.from) newErrors.from = ["The from field is required."];
    if (!form.till) newErrors.till = ["The till field is required."];
    if (!form.message) newErrors.message = ["The message field is required."];
    if (form.from && form.till && new Date(form.from) > new Date(form.till)) {
      newErrors.till = ["The 'Active until' date must be later than the 'Active from' date."];
    }
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('group', form.group);
      formData.append('from', form.from);
      formData.append('till', form.till);
      formData.append('message', form.message);

      const data = await PostNotification(formData);
      if (data.errors) {
        setErrors(data.errors);
      } else {
        console.log('Notification posted:', data);
        setForm({
          title: '',
          group: '',
          from: '',
          till: '',
          message: ''
        });
        setModalBox(false);

        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Notification has been sent successfully!'
        });
      }
    } catch (error: any) {
      console.error('Error posting notification:', error);
      const errorMessage = error.response?.data?.message || 'The given data was invalid.';
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMessage,
        footer: '<a href>Why do I have this issue?</a>'
      });
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="w-full">
      <h2 className='text-2xl font-semibold'>Communication</h2>
      <div className='flex items-center justify-between w-full mt-5'>
        <div className='text-sm'>
          <p>Push Notification Management</p>
          <p className='text-[gray] pr-6'>Schedule & send important messages to your users or review your current push notifications</p>
        </div>
        <div>
          <button
            className='flex items-center gap-2 px-5 py-2 rounded bg-[#2B5BFC] text-white'
            onClick={() => setModalBox(true)}
          >
            <IoIosAdd className='text-2xl' />
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

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className='mt-6'>
              <label htmlFor="title" className='text-sm mb-2'>Title</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className='w-full border p-2 rounded-md'
                placeholder='Monthly Subscription'
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title[0]}</p>}
            </div>
            <div>
              <label htmlFor="userGroup" className='text-sm mb-2'>User group(s)</label>
              <select
                name="group"
                value={form.group}
                onChange={handleChange}
                className='w-full border p-2 rounded-md'
              >
                <option value="" disabled>Select a group</option>
                <option value="teachers">Teachers</option>
                <option value="students">Students</option>
                <option value="all">All</option>
              </select>
              {errors.group && <p className="text-red-500 text-sm">{errors.group[0]}</p>}
            </div>
            <div className='mt-6'>
              <label htmlFor="activeFrom" className='text-sm mb-2'>Active from</label>
              <input
                type="date"
                name="from"
                value={form.from}
                onChange={handleChange}
                className='w-full border p-2 rounded-md'
              />
              {errors.from && <p className="text-red-500 text-sm">{errors.from[0]}</p>}
            </div>
            <div className='mt-6'>
              <label htmlFor="activeUntil" className='text-sm mb-2'>Active until</label>
              <input
                type="date"
                name="till"
                value={form.till}
                onChange={handleChange}
                className='w-full border p-2 rounded-md'
              />
              {errors.till && <p className="text-red-500 text-sm">{errors.till[0]}</p>}
            </div>
            <div className='mt-6'>
              <label htmlFor="message" className='text-sm mb-2'>Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                className='w-full min-h-[120px] border p-2 rounded-md'
                placeholder='Message...'
              ></textarea>
              <small>Put your notification message here</small>
              {errors.message && <p className="text-red-500 text-sm">{errors.message[0]}</p>}
            </div>
            <button className='w-[fit-content] gap-2 px-5 py-2 rounded bg-[#2B5BFC] text-white' type="submit">
              {loading ? (
                <div className="loader"></div>
              ) : (
                <p>Send</p>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Communication;
