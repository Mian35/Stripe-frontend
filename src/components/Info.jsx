import {React , useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { baseUrl } from '../utils/Base';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {FaUpload} from 'react-icons/fa';
import Loader from '../utils/Loader';

const Info = () => {
    const [isLoading, setIsLoading] = useState(false);
    const validationSchema = Yup.object().shape({
        firstname: Yup.string().required("firstname is required"),
        lastname: Yup.string().required("lastname is required"),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        password: Yup.string() .min(8, 'Password must be at least 8 characters long') .required('Password is required'),
        address: Yup.string().required("Model Name is required"),
       
      });
      const navigate = useNavigate()
      const handleSubmit = async (values, { setSubmitting }) => {
        
    
   

        try {
          setIsLoading(true)
        
           
          
          
        } catch (error) {
          toast.error("User Already Exist")
          console.log('Error uploading files:', error);
        }
       setIsLoading(false)
      };
  return (
    <div className='min-h-screen flex items-center justify-center'>
    <Formik
      initialValues={{ firstname: '', lastname: '',email: '', password: '', address: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors, touched,setFieldValue }) => (
        <Form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/2 mx-auto'>
          
          <div className='mb-4'>
            <label htmlFor='email' className='block text-gray-700 text-sm font-bold mb-2'>
              Email:
            </label>
            <Field
              type='text'
              id='email'
              name='email'
              className={`w-full border border-solid border-gray-300 p-2 ${
                errors.email && touched.email ? 'border-red-500' : ''
              }`}
            />
            <ErrorMessage name='email' component='div' className='text-red-500 text-xs italic' />
          </div>
          <div className='mb-6'>
            <label htmlFor='password' className='block text-gray-700 text-sm font-bold mb-2'>
              confidence:
            </label>
            <Field
              type='text'
              id='none'
              name='none'
              className={`w-full border border-solid border-gray-300 p-2 ${
                errors.password && touched.password ? 'border-red-500' : ''
              }`}
            />
            <ErrorMessage name='password' component='div' className='text-red-500 text-xs italic' />

          </div>
          <div className='mb-4'>
            <label  className='block text-gray-700 text-sm font-bold mb-2'>
              Model Name:
            </label>
            <Field
              type='address'
              id='address'
              name='address'
              className={`w-full border border-solid border-gray-300 p-2 ${
                errors.address && touched.address ? 'border-red-500' : ''
              }`}
            />
            <ErrorMessage name='address' component='div' className='text-red-500 text-xs italic' />
          </div>
          
              <div>
              
               {/* <div className='text-center'>
                <Link to={'/plans'}>
                 <button className='bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded focus-outline-none focus-shadow-outline '>
                  Select Your Plan
                  </button>                
                </Link>
               </div> */}
                <br />
                <br />
                
              </div>
          
        </Form>
      )}
    </Formik>
  </div>
  )
}

export default Info