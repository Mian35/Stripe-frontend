import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { baseUrl } from '../utils/Base';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Loader from '../utils/Loader';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Add state for password visibility
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setIsLoading(true);

      const response = await axios.post(`${baseUrl}/auth/login`, values, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        toast.success("User Logged in Successfully");
        console.log(response.data.data.user)
        localStorage.setItem('token', response.data.token);
        navigate('/plans');
        if(response.data === null){
        setTimeout(()=>{
    
          location.reload()
          },2000)
        }
        
        
      } else {
        console.error('Login failed');
      }
      if(await response.data.data.user.plan === 'none'){
        navigate('/plans');
      }else{

        navigate('/add')
        }
    } catch (error) {
      toast.error("Invalid Credentials");
      console.error('Error logging in:', error);
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='bg-gradient-to-r from-gray-500 via-gray-300 to-black min-h-screen items-center justify-center'>

      <div className='w-screen items-center mx-auto text-center justify-center pt-10'>
      <img className='mx-auto w-[127px] h-[156px]' src="../public/logo.png" alt="" />
      </div>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className='rounded-xl w-80 px-8 pt-6 pb-8 mt-5 mx-auto'>
            <div className='mb-4'>
              <label htmlFor='email' className='block text-white text-sm font-bold mb-2'>
                Email:
              </label>
              <Field
                type='text'
                id='email'
                name='email'
                className={`w-full  rounded-xl border border-solid border-gray-300 p-2 ${
                  errors.email && touched.email ? 'border-red-500' : ''
                }`}
              />
              <ErrorMessage name='email' component='div' className='text-black text-xs italic' />
            </div>
            <div className='mb-6'>
              <label htmlFor='password' className='block text-white text-sm font-bold mb-2'>
                Password:
              </label>
              <div className="relative">
                <Field
                  type={showPassword ? 'text' : 'password'}
                  id='password'
                  name='password'
                  className={`w-full  rounded-xl border border-solid border-gray-300 p-2 ${
                    errors.password && touched.password ? 'border-red-500' : ''
                  }`}
                />
                <span
                  className="absolute top-0 right-0 p-2 cursor-pointer text-slate-500"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <VisibilityOffIcon/> : <VisibilityIcon/>}
                </span>
              </div>
              <ErrorMessage name='password' component='div' className='text-black text-xs italic' />
            </div>
            {isLoading ? (
              <Loader />
            ) : (
              <div>
                <button
                  type='submit'
                  className='w-[150px] h-[43px] bg-white rounded-xl ml-12 text-black hover:text-slate-300 p-3  mb-5 font-bold'
                  disabled={isSubmitting}
                >
                  Sign In
                </button>
              </div>
            )}
            <p className='text-center mt-4 text-white'>
              New User? Please <Link to='/register' className='font-bold'>Register</Link> to continue.
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
