import React, { useState } from 'react';  // Ensure React is imported correctly
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { baseUrl } from '../utils/Base';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../utils/Loader';

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required'),
    address: Yup.string().required("Address is required"),
  });

  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData();

    formData.append('firstname', values.firstname);
    formData.append('lastname', values.lastname);
    formData.append('email', values.email);
    formData.append('password', values.password);
    formData.append('address', values.address);

    try {
      setIsLoading(true);
      const response = await axios.post(`${baseUrl}/auth/register`, formData);
      console.log(response);
      if (response.status === 201) {
        toast.success("User Registered Successfully");
        console.log(response.data);
        navigate(`/`);
      } 
    } catch (error) {
      toast.error("User Already Exists");
      console.log('Error uploading files:', error);
    }
    setIsLoading(false);
    setSubmitting(false);
  };

  return (
    <>
   
    <div className='bg-gradient-to-r from-gray-500 via-gray-300 to-black  min-h-screen  items-center justify-center'>
    <img src="../public/logo.png" alt="" className='mx-auto pt-5' />
      <Formik
        initialValues={{ firstname: '', lastname: '', email: '', password: '', address: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className='  rounded px-8 pt-6 pb-8 mb-4 w-1/2 mx-auto'>
            <div className='mb-4'>
              <label className='block text-white text-sm font-bold mb-2'>
                First Name:
              </label>
              <Field
                type='text'
                id='firstname'
                name='firstname'
                className={`w-full border border-solid border-gray-300 p-2 rounded-xl ${
                  errors.firstname && touched.firstname ? 'border-red-500' : ''
                }`}
              />
              <ErrorMessage name='firstname' component='div' className='text-black text-xs italic' />
            </div>
            <div className='mb-4'>
              <label className='block text-white text-sm font-bold mb-2'>
                Last Name:
              </label>
              <Field
                type='text'
                id='lastname'
                name='lastname'
                className={`w-full border border-solid border-gray-300 p-2 rounded-xl ${
                  errors.lastname && touched.lastname ? 'border-red-500' : ''
                }`}
              />
              <ErrorMessage name='lastname' component='div' className='text-black text-xs italic' />
            </div>
            <div className='mb-4'>
              <label htmlFor='email' className='block text-white text-sm font-bold mb-2'>
                Email:
              </label>
              <Field
                type='text'
                id='email'
                name='email'
                className={`w-full border border-solid border-gray-300 p-2 rounded-xl ${
                  errors.email && touched.email ? 'border-red-500' : ''
                }`}
              />
              <ErrorMessage name='email' component='div' className='text-black text-xs italic' />
            </div>
            <div className='mb-6'>
              <label htmlFor='password' className='block text-white text-sm font-bold mb-2'>
                Password:
              </label>
              <Field
                type='password'
                id='password'
                name='password'
                className={`w-full border border-solid border-gray-300 p-2 rounded-xl ${
                  errors.password && touched.password ? 'border-red-500' : ''
                }`}
              />
              <ErrorMessage name='password' component='div' className='text-black text-xs italic' />
            </div>
            <div className='mb-4'>
              <label className='block text-white text-sm font-bold mb-2'>
                Address:
              </label>
              <Field
                type='text'
                id='address'
                name='address'
                className={`w-full border border-solid border-gray-300 p-2 rounded-xl  rounded-xl${
                  errors.address && touched.address ? 'border-red-500' : ''
                }`}
              />
              <ErrorMessage name='address' component='div' className='text-black text-xs italic' />
            </div>
            <div className='text-center'>
              {isLoading ? (
                <Loader />
              ) : (
                <button
                  type='submit'
                  className='w-1/2 bg-white text-black rounded-xl hover:text-slate-300 p-3 mb-5 font-bold'
                  disabled={isSubmitting}
                >
                  Register
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
    </>
  );
};

export default Register;
