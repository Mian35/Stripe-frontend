import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import { useParams, useNavigate } from 'react-router-dom';
import { baseUrl } from '../utils/Base';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Loader from '../utils/Loader';
const AddSteps = () => {
  const [data, setData] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
   
  });

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const handleUpload = async (values, { setSubmitting }) => {
    const formData = new FormData();

    selectedFiles.forEach((file, index) => {
      formData.append(`images`, file);
    });

    formData.append('title', values.title);

    try {
      setIsLoading(true);
      const response = await axios.patch(`${baseUrl}/updateImages/${id}`, formData);
      toast.success("Step Added Successfully");
      navigate(`/details/${id}`);
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading files:', error);
      toast.error("Error Adding Step");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1 className='text-center font-bold text-3xl capitalize pt-7  italic underline  mb-10'>Add Steps</h1>
      <div className='items-center  my-5 rounded-lg border border-solid border-gray-300 p-4 text-center w-8/12 mx-auto'>
        <Formik
          initialValues={{ title: '', image: [] }}
          validationSchema={validationSchema}
          onSubmit={handleUpload}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <br />
              <br />
              <Field
                type="text"
                name="title"
                placeholder="Enter Step title"
                required
                className='w-full h-8 border border-solid border-gray-300 p-4'
              />
              <ErrorMessage name="title" component="div" className="error" />
              <div>
                <label htmlFor="" className='ml-8'>Upload Images:</label>
                <input
               
                  type="file"
                  multiple
                  onChange={(event) => {
                    setFieldValue('image', event.currentTarget.files);
                    handleFileChange(event);
                  }}
                  className='h-8 w-3/6 mb-7 ml-4 mt-5'
                />
              </div>
              <ErrorMessage name="image" component="div" className="error" />
              {isLoading ? (
                <Loader />
              ) : (
                <button
                  type="submit"
                  className='text-white w-1/4 bg-sky-500 hover:bg-sky-700 hover:text-slate-300 p-3 rounded-2xl mb-5'
                >
                  Upload
                </button>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default AddSteps;
