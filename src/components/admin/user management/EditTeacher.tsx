import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Header from '../Header';
import { FaUser, FaCamera, FaSpinner } from 'react-icons/fa';
import { IoIosAdd } from "react-icons/io";
import { useNavigate, useParams } from 'react-router-dom';
import { EditSingleTeacher, GetSingleTeacher } from '../AdminControllers';
import useGetToken from '../../../utils/useGetToken';

const EditTeacher = () => {
  const {token} = useGetToken();
  const { teacherId } = useParams();
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState('Mr');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);

  const router = useNavigate();

  const [errors, setErrors] = useState({
    title: '',
    firstName: '',
    lastName: '',
    gender: '',
    dob: '',
    phone: '',
    email: '',
    password: ''
  });

    useEffect(() => {
      if(token){
        const fetchTeacher = async () => {
          try {
              const result = await GetSingleTeacher(teacherId, token);
              if (result && result.success) {
                  setImage(result.data.user.title || '');
                  setTitle(result.data.teacher.title || '');
                  setFirstName(result.data.teacher.first_name || '');
                  setLastName(result.data.teacher.last_name || '');
                  setGender(result.data.teacher.gender || '');
                  setDob(result.data.teacher.dob || '');
                  setPhone(result.data.user.phone || '');
                  setEmail(result.data.teacher.email || '');
              }
          } catch (error) {
              console.error("Error fetching teacher data:", error);
          } finally {
              setIsDataLoading(false);
          }
      };

      fetchTeacher();
      }
    }, [teacherId, token]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      title: !title ? 'Title is required' : '',
      firstName: !firstName ? 'First Name is required' : '',
      lastName: !lastName ? 'Last Name is required' : '',
      gender: !gender ? 'Gender is required' : '',
      dob: !dob ? 'Date of birth is required' : '',
      phone: !phone ? 'Phone number is required' : '',
      email: !email ? 'Email is required' : '',
      password: !password ? 'Password is required' : '',
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please fill in all required fields.',
      });
      return;
    }

    const formData = new FormData();
    if (image) formData.append('image', image);
    formData.append('title', title);
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('gender', gender);
    formData.append('dob', dob);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('password', password);

    setIsLoading(true);
    try {
      const data = await EditSingleTeacher(formData, teacherId, token);
      setIsLoading(false);

      if (data && data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Teacher updated successfully.',
        });
        router('/admin/user-management/teacher')
      } else {
        const errorMessages = Object.values(data.errors)
        .flat()
        .join('\n');

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessages || 'An error occurred while creating the teacher.',
      });
      }
    } catch (error: any) {
        setIsLoading(false);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message || 'An unexpected error occurred.',
        });
    }
  };

  if(isDataLoading){
    return (
        <div className='h-full w-full absolute top-0 left-0 grid place-items-center bg-[#0000003b] text-white'>
            <div className='flex items-center justify-center flex-col'>
                <FaSpinner className='animate-spin text-3xl'/>
                <p>Loading...</p>
            </div>
        </div>
    )
}

  return (
    <main className="w-full min-h-screen pb-10 bg-white">
      <Header headerName="Edit teacher" />
      <div className="relative pt-6 px-12 w-full min-h-full">
        <h1 className='text-2xl font-semibold'>Edit teacher</h1>
        <div className='mt-6'>
          <h2 className='text-xl font-semibold'>Profile Picture</h2>
          <p>We recommend an image of about 500 x 500 and about 10mb</p>
          <div className='w-20 h-20 rounded-full grid place-items-center shadow-md bg-[#FFE7CC] mt-8 relative'>
            {image ? (
              <img src={URL.createObjectURL(image)} alt="Profile" className="w-full h-full rounded-full object-cover" />
            ) : (
              <FaUser />
            )}
            <input type="file" accept='image/*' className="hidden" id="imageInput" onChange={handleImageChange} />
            <label htmlFor="imageInput" className='absolute right-0 top-[-8px] h-8 w-8 rounded-full grid place-items-center bg-[#667185] text-white cursor-pointer'>
              <FaCamera className='text-sm' />
            </label>
          </div>
          <div className='mt-8'>
            <h2 className='text-xl font-semibold mb-4'>Personal Information</h2>
            <form onSubmit={handleSubmit}>
              <div className='grid gap-2'>
                <label htmlFor="title">Title</label>
                <select name="title" id="title" className='w-[fit-content] p-2 border' value={title} onChange={(e) => setTitle(e.target.value)}>
                  <option value="" disabled>Select title</option>
                  <option value="Mr">Mr</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Miss">Miss</option>
                </select>
                {errors.title && <small className="text-red-600">{errors.title}</small>}
              </div>
              <div className='grid grid-cols-2 gap-8 mt-5'>
                <div className='grid gap-2'>
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    className='p-2 w-full border rounded'
                    placeholder='Enter your first name'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  {errors.firstName && <small className="text-red-600">{errors.firstName}</small>}
                </div>
                <div className='grid gap-2'>
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    className='p-2 w-full border rounded'
                    placeholder='Enter your last name'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  {errors.lastName && <small className="text-red-600">{errors.lastName}</small>}
                </div>
                <div className='grid gap-2'>
                  <label htmlFor="gender">Gender</label>
                  <div className='flex items-center gap-8'>
                    <p className='flex items-center gap-2'>
                      <input type="radio" name="gender" id="male" value="male" checked={gender === 'male'} onChange={(e) => setGender(e.target.value)} />
                      <span>Male</span>
                    </p>
                    <p className='flex items-center gap-2'>
                      <input type="radio" name="gender" id="female" value="female" checked={gender === 'female'} onChange={(e) => setGender(e.target.value)} />
                      <span>Female</span>
                    </p>
                  </div>
                  {errors.gender && <small className="text-red-600">{errors.gender}</small>}
                </div>
                <div className='grid gap-2'>
                  <label htmlFor="dob">Date of birth</label>
                  <input
                    type="date"
                    id="dob"
                    className='p-2 w-full border rounded'
                    placeholder='Enter your date of birth'
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                  />
                  {errors.dob && <small className="text-red-600">{errors.dob}</small>}
                </div>
                <div className='grid gap-2'>
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    id="phone"
                    className='p-2 w-full border rounded'
                    placeholder='Enter your phone number'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  {errors.phone && <small className="text-red-600">{errors.phone}</small>}
                </div>
                <div className='grid gap-2'>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    className='p-2 w-full border rounded'
                    placeholder='Enter your email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && <small className="text-red-600">{errors.email}</small>}
                </div>
                <div className='grid gap-2'>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    className='p-2 w-full border rounded'
                    placeholder='Enter your password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.password && <small className="text-red-600">{errors.password}</small>}
                </div>
                <div className='col-span-2 flex items-center justify-end text-white'>
                  <button type="submit" className='flex items-center gap-2 px-5 py-2 rounded bg-[#2B5BFC]'>
                    {isLoading ? (
                      <div className='animate-spin'>
                        <FaSpinner />
                      </div>
                    ) : (
                      <>
                        <IoIosAdd className='text-2xl' />
                        <p>Update</p>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EditTeacher;
