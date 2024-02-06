import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import { baseUrl } from '../utils/Base';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Loader from '../utils/Loader';

const UpdateSteps = () => {
  const [data, setData] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [images, setImage] = useState([]);

  const { id, stepId } = useParams();
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${baseUrl}/heading/${id}/${stepId}`);
        setData(response.data);
        setImage(response.data.images);
        setIsDataLoaded(true);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id, stepId]);

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
      const response = await axios.patch(`${baseUrl}/update/${id}/${stepId}`, formData);
      toast.success('Step Added Successfully');
      navigate(`/details/${id}`);
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading files:', error);
      toast.error('Error Adding Step');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <h1 className="text-center font-bold text-3xl capitalize pt-7 italic underline mb-10  mt-20">Update Step</h1>
      {isDataLoaded ? (
        <div className="items-center mx-10 my-5 rounded-lg border border-solid border-gray-300 p-4 text-center">
          <Formik
            initialValues={{ title: data.title || '', image: [] }}
            validationSchema={validationSchema}
            onSubmit={handleUpload}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form>
                <br />
                <br />
                <Field
        name='title'
        type='text'
        placeholder='Enter Step title'
        required
        className='w-full h-40 border border-solid border-gray-300 p-4'
        as='textarea'
      />
                <ErrorMessage name="title" component="div" className="error" />
                <div>
                  <label htmlFor="" className="ml-8">Upload Images:</label>
                  <input
                    type="file"
                    multiple
                    onChange={(event) => {
                      setFieldValue('image', event.currentTarget.files);
                      handleFileChange(event);
                    }}
                    className="h-8 w-3/6 mb-7 ml-4"
                  />
                </div>
                <ErrorMessage name="image" component="div" className="error" />
                {isLoading ? (
                  <Loader />
                ) : (
                  <button
                    type="submit"
                    className="text-white w-1/4 bg-sky-500 hover:bg-sky-700 hover:text-slate-300 p-3 rounded-2xl mb-5"
                  >
                    Upload
                  </button>
                )}
              </Form>
            )}
          </Formik>
          <div className='grid grid-cols-3 gap-5'>
            {images.map((item) => (
              <img className='h-100 w-80 rounded-lg mx-auto  lg:w-100 border-4 border-black p-2' key={item} src={item} alt="" />
            ))}
          </div>
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </>
  );
};

export default UpdateSteps;
