import React, { useState, ChangeEvent, FormEvent } from 'react';
import Swal from 'sweetalert2';
import { FaSpinner } from 'react-icons/fa';
import loginlogo from "../img/loginLogo.png";
import BackgroundImageWrapper from "../components/BackgroundImageWrapper";
import { Link, useNavigate } from "react-router-dom";
import { RegisterAdmins } from '../components/admin/AdminControllers';

interface FormData {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phone: string;
  address: string;
  dob: string;
  password: string;
  password_confirmation: string;
  role: string;
  grade_id: string;
  school_id: string;
  gender: string;
}

interface FormErrors {
  [key: string]: string[];
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    phone: '',
    dob: '',
    address: '',
    password: '',
    password_confirmation: '',
    role: 'admin',
    grade_id: '1',
    school_id: '1',
    gender: 'male'
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [loader, setLoader] = useState(false);
  const router = useNavigate()

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);

    for (let key in formData) {
      if (formData[key as keyof FormData] === '') {
        setLoader(false);
        Swal.fire({
          title: `Please fill in the ${key.replace('_', ' ')} field.`,
          icon: 'error',
          timer: 4000
        });
        return;
      }
    }

    if (formData.password !== formData.password_confirmation) {
      setLoader(false);
      Swal.fire({
        title: 'Passwords do not match.',
        icon: 'error',
        timer: 4000
      });
      return;
    }

    
    const form = new FormData();
    for (let key in formData) {
      form.append(key, formData[key as keyof FormData]);
    }

    try {
      
      const data = await RegisterAdmins(form);
      if (data.errors){
        let errorMessages = '';
        Object.keys(data.errors).forEach(key => {
          errorMessages += `${key}: ${data.errors[key].join(', ')}\n`;
        });

        Swal.fire({
          title: 'Registration Failed',
          icon: 'error',
          html: `<pre>${errorMessages}</pre>`,
          timer: 4000
        });
        setLoader(false);
      }
      else{
        Swal.fire({
          title: 'Registration Successful',
          icon: 'success',
          timer: 4000
        });
        router('/')
      }
    } catch (error: any) {
      console.error('Error during registration:', error.message);
      setLoader(false);
    }
  };

  return (
    <main className="w-full h-screen relative flex items-center justify-center">
      <BackgroundImageWrapper />

      <section className="h-full w-full max-w-full z-10 flex flex-col items-center justify-center pt-5">
        {/* <img src={loginlogo} className="max-w-[130px]" alt='register-logo' /> */}
        <div 
          className="bg-white w-full h-[400px] mt-3 rounded-[75px] p-5 overflow-y-hidden"
          style={{boxShadow: "0px 4px 64px 0px rgba(0, 0, 0, 0.10)"}}
        >
          <form onSubmit={handleSubmit} className="w-full max-h-[96%] overflow-y-scroll register-scrollbar rounded-xl pb-5">
            <h1 className="text-xl font-semibold text-center">Register new user</h1>
            <p className="text-xs text-center mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, illo.</p>
            <div className="mt-3 w-full h-full flex flex-col gap-3">
              <div>
                <label htmlFor="first_name" className="text-sm">First name</label>
                <input 
                  type="text" 
                  className="w-full mt-1 h-[40px] border px-2" placeholder="Enter First name"
                  id='first_name' 
                  onChange={handleChange}
                  value={formData.first_name}
                />
                {formErrors.first_name && formErrors.first_name.map((error, index) => (
                  <p key={index} className="text-xs text-red-600">{error}</p>
                ))}
              </div>
              <div>
                <label htmlFor="last_name" className="text-sm">Last name</label>
                <input 
                  type="text" 
                  className="w-full mt-1 h-[40px] border px-2" placeholder="Enter Last name"
                  id='last_name'
                  onChange={handleChange}
                  value={formData.last_name} 
                />
                {formErrors.last_name && formErrors.last_name.map((error, index) => (
                  <p key={index} className="text-xs text-red-600">{error}</p>
                ))}
              </div>
              <div>
                <label htmlFor="username" className="text-sm">User name</label>
                <input 
                  type="text" 
                  className="w-full mt-1 h-[40px] border px-2" placeholder="Enter User name"
                  id='username'
                  onChange={handleChange}
                  value={formData.username} 
                />
                {formErrors.user_name && formErrors.user_name.map((error, index) => (
                  <p key={index} className="text-xs text-red-600">{error}</p>
                ))}
              </div>
              <div>
                <label htmlFor="email" className="text-sm">Email</label>
                <input 
                  type="email" 
                  className="w-full mt-1 h-[40px] border px-2" placeholder="Enter Email"
                  id='email'
                  onChange={handleChange}
                  value={formData.email} 
                />
                {formErrors.email && formErrors.email.map((error, index) => (
                  <p key={index} className="text-xs text-red-600">{error}</p>
                ))}
              </div>
              <div>
                <label htmlFor="gender" className="text-sm">Role</label>
                <select
                  id="role"
                  className="w-full mt-1 h-[40px] border px-2"
                  onChange={handleChange}
                  value={formData.role}
                >
                  <option value="admin">Admin</option>
                  <option value="teacher">Teacher</option>
                  <option value="student">Student</option>
                </select>
              </div>
              <div>
                <label htmlFor="phone" className="text-sm">Phone</label>
                <input 
                  type="tel" 
                  className="w-full mt-1 h-[40px] border px-2" placeholder="Enter Phone"
                  id='phone'
                  onChange={handleChange}
                  value={formData.phone} 
                />
                {formErrors.phone && formErrors.phone.map((error, index) => (
                  <p key={index} className="text-xs text-red-600">{error}</p>
                ))}
              </div>
              <div>
                <label htmlFor="dob" className="text-sm">Date of Birth</label>
                <input 
                  type="date" 
                  className="w-full mt-1 h-[40px] border px-2" placeholder="Enter Date of Birth"
                  id='dob'
                  onChange={handleChange}
                  value={formData.dob} 
                />
                {formErrors.dob && formErrors.dob.map((error, index) => (
                  <p key={index} className="text-xs text-red-600">{error}</p>
                ))}
              </div>
              <div>
                <label htmlFor="address" className="text-sm">Address</label>
                <input 
                  type="text" 
                  className="w-full mt-1 h-[40px] border px-2" placeholder="Enter Address"
                  id='address'
                  onChange={handleChange}
                  value={formData.address} 
                />
                {formErrors.address && formErrors.address.map((error, index) => (
                  <p key={index} className="text-xs text-red-600">{error}</p>
                ))}
              </div>
              <div>
                <label htmlFor="gender" className="text-sm">Gender</label>
                <select
                  id="gender"
                  className="w-full mt-1 h-[40px] border px-2"
                  onChange={handleChange}
                  value={formData.gender}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="password" className="text-sm">Password</label>
                <div className="mt-1 h-[40px]">
                  <input 
                    type="password" 
                    className="w-full h-full border px-2" placeholder="Enter Password"
                    id='password'
                    onChange={handleChange}
                    value={formData.password} 
                  />
                  {formErrors.password && formErrors.password.map((error, index) => (
                    <p key={index} className="text-xs text-red-600">{error}</p>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="password_confirmation" className="text-sm">Confirm Password</label>
                <div className="mt-1 h-[40px]">
                  <input 
                    type="password" 
                    className="w-full h-full border px-2" placeholder="Enter Confirm Password"
                    id='password_confirmation'
                    onChange={handleChange}
                    value={formData.password_confirmation} 
                  />
                  {formErrors.password_confirmation && formErrors.password_confirmation.map((error, index) => (
                    <p key={index} className="text-xs text-red-600">{error}</p>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full flex items-center justify-center mt-3">
              <button className="bg-[#2196F3] text-white w-[70%] h-[35px] rounded-[35px] flex items-center justify-center">
                {loader ? <FaSpinner className="animate-spin" /> : "Register"}
              </button>
            </div>
            <div className="w-full flex items-center justify-center mt-4">
              <p className="text-xs text-center">
                Already have an account? <Link to="/login" className="text-[#2196F3]">Login</Link>
              </p>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Register;
