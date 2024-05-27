import React, { useState, useEffect } from 'react';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { HiOutlineUpload } from 'react-icons/hi';
import Loader from '../utils/Loader';
import { baseUrl } from '../utils/Base';
import config from "../utils/Config";

const AddHeading = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const [rectangle, setRectangle] = useState(false);

  const validationSchema = Yup.object().shape({
    video: Yup.mixed().required('Video is required'),
    model: Yup.string().required("Model Name is required"),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    confidence: Yup.string().required('confidence is required'),
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${baseUrl}/auth/me`, config);
        setData(response.data.data);
      } catch (error) {
        console.error(error);
        toast.error(error.response.data.message);
      }
    };

    fetchUser();
  }, []);

  const handleCheckboxChange = () => {
    setRectangle(!rectangle);
  };

  const apiClient = axios.create({
    baseURL: 'http://3.15.206.170',
    timeout: '3600000',
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData();
    formData.append('video', values.video);
    formData.append('draw', rectangle);
    formData.append('email', values.email);
    formData.append('model', values.model);
    formData.append('confidence', values.confidence);

    try {
      setIsLoading(true);
      const response = await apiClient.post('/api/run_detections', formData, {
        responseType: 'arraybuffer', // Set the response type to arraybuffer to handle binary data
      });

      if (response.status === 200) {
        console.log(response.data, '///////');
        await axios.patch(`${baseUrl}/user/update/${data._id}`);
        toast.success('Video Processed Successfully');

        // Create a Blob from the response data
        const blob = new Blob([response.data], { type: 'video/mp4' });

        // Create a download link
        const downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(blob);
        downloadLink.download = 'downloaded-video.mp4';

        // Append the link to the body and click it to trigger the download
        document.body.appendChild(downloadLink);
        downloadLink.click();

        // Clean up
        document.body.removeChild(downloadLink);
        setTimeout(function () {
          location.reload();
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log('Error uploading files:', error);
    }

    setIsLoading(false);
  };

  return (
    <>
      <div className='bg-gradient-to-r from-gray-500 via-gray-300 to-black w-full  flex flex-col justify-center items-center'>
        <img src="../public/logo.png" cl alt="Logo" className="mb-4 mt-5" />
        <h3 className='font-bold text-md text-white text-center'><span className='text-md text-slate-100 ml-2'>Plan</span>  {data.plan}</h3>
        <h3 className='font-bold text-md text-white text-center'><span className='text-md text-slate-100 ml-2'>tokens</span> {data.tokens}</h3>
      </div>

      <div className='bg-gradient-to-r from-gray-500 via-gray-300 to-black min-h-screen flex justify-center'>
        <div className='w-full max-w-4xl'>
          <div className='w-full p-4 mx-auto'>
            <Formik
              initialValues={{ video: null, email: '', confidence: '', model: '' }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, setFieldValue, errors, touched }) => (
                <Form>
                  <div className='mx-auto my-5 rounded-lg border border-solid border-gray-300 p-4 w-full text-center sm:mx-4'>
                    <div className='mb-4'>
                      <label htmlFor='email' className='block text-white text-sm font-bold mb-2'>
                        Email:
                      </label>
                      <Field
                        type='text'
                        id='email'
                        name='email'
                        className={`w-full border border-solid border-gray-300 rounded-xl p-2 ${errors.email && touched.email ? 'border-red-500' : ''}`}
                      />
                      <ErrorMessage name='email' component='div' className='text-black text-xs italic' />
                    </div>
                    <div className='mb-4'>
                      <label className='block text-white text-sm font-bold mb-2'>
                        Model Name:
                      </label>
                      <Field
                        type='text'
                        id='model'
                        name='model'
                        className={`w-full border border-solid border-gray-300 rounded-xl p-2 ${errors.model && touched.model ? 'border-red-500' : ''}`}
                      />
                      <ErrorMessage name='model' component='div' className='text-black text-xs italic' />
                    </div>
                    <div className='mb-6'>
                      <label htmlFor='confidence' className='block text-white text-sm font-bold mb-2'>
                        Confidence:
                      </label>
                      <Field
                        type='text'
                        id='confidence'
                        name='confidence'
                        className={`w-full border border-solid border-gray-300 rounded-xl p-2 ${errors.confidence && touched.confidence ? 'border-red-500' : ''}`}
                      />
                      <ErrorMessage name='confidence' component='div' className='text-black text-xs italic' />
                    </div>
                    <label htmlFor='video' className='block text-white text-sm font-bold mb-2'>
                      Video:
                    </label>
                    <div className={`mt-5 ${errors.video && touched.video ? 'border-red-500' : ''}`}>
                      <div className='mt-5 flex mx-auto w-fit gap-4'>
                        <label htmlFor='video' style={{ cursor: 'pointer' }}>
                          <HiOutlineUpload className='text-white' size={50} />
                          <input
                            type='file'
                            id='video'
                            name='video'
                            style={{ display: 'none' }}
                            onChange={(event) => {
                              setFieldValue('video', event.currentTarget.files[0]);
                            }}
                          />
                        </label>
                      </div>
                      <ErrorMessage name='video' component='div' className='error' />
                      <br />
                      <div className='flex text-center w-80 mx-auto'>
                        <p className='font-bold text-sm text-center text-white'>Draw Rectangle:</p>
                        <input 
                          type='checkbox'
                          checked={rectangle}
                          onChange={handleCheckboxChange}
                          style={{ width: '30px', height: '20px', marginLeft: '20px' }}
                        />
                      </div>
                      <br />
                      <br />

                      {isLoading ? (
                        <Loader />
                      ) : (
                        <button
                          type='submit'
                          className='text-white w-1/2 bg-slate-600 hover:text-slate-300 p-3 mb-5 font-bold'
                        >
                          Start Processing
                        </button>
                      )}
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddHeading;
