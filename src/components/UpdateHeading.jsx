import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { baseUrl } from '../utils/Base';
import {FaUpload} from 'react-icons/fa';
import Loader from '../utils/Loader';
const UpdateHeading = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [selectedImageFile, setSelectedImageFile] = useState(null); // Added state for the selected image
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    note: Yup.string(),
    image: Yup.mixed().test('fileSize', 'File size is too large', (value) => !value || value.size <= 1024000), // 1 MB
  });
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedImageFile(file);
  };
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${baseUrl}/heading/${id}`);
        setData(response.data.data);
        setIsDataLoaded(true);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('description', values.description);
      formData.append('note', values.note);
      // Check if a new image was selected
      if (selectedImageFile) {
        formData.append('image', selectedImageFile);
      }
      // Send a PATCH request to update the heading
      const response = await axios.patch(`${baseUrl}/update/${id}`, formData);
      if (response.status === 200) {
        toast.success('Heading Updated Successfully');
        console.log(response.data);
        navigate('/all');
        // Redirect to a success page or perform any other action
      } else {
        console.error('Update failed');
        // Handle failure, e.g., show an error message
      }
    } catch (error) {
      toast.error('Error Updating Heading');
      console.error('Error updating heading:', error);
    }
    setIsLoading(false);
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <h1 className='text-center font-bold text-3xl capitalize pt-7 italic underline mb-10  mt-20'>
        Update Heading
      </h1>
      {isDataLoaded ? (
        <Formik
          initialValues={{
            title: data.title,
            description: data.description,
            note: data.note,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue, errors, touched }) => (
           <Form>
        <div className='p-4'>
           <div className='mx-auto my-5 rounded-lg border border-solid border-gray-300 m-10 p-8 W-fit text-center sm:mx-4'>
             <div className='mt-5 flex flex-col'>
               <label htmlFor='title'>Title:</label>
               <Field
                 type='text'
                 id='title'
                 name='title'
                 className={`w-full h-8 border border-solid border-gray-300 p-4 ${
                   errors.title && touched.title ? 'border-red-500 inline' : ''
                 }`}
               />
               <div>
                 <ErrorMessage name='title' component='div' className='error' />
               </div>
             </div>
             <div className='mt-5 flex flex-col'>
               <label htmlFor='description'>Description:</label>
               <Field
                 as='textarea'
                 id='description'
                 name='description'
                 className={`w-full h-40 border border-solid border-gray-300 p-4 ${
                   errors.description && touched.description ? 'border-red-500' : ''
                 }`}
               />
               <div>
                 <ErrorMessage name='description' component='div' className='error' />
               </div>
             </div>
             <div className='mt-5 flex flex-col'>
               <label htmlFor='note'>Note:</label>
               <Field
                 type='text'
                 id='note'
                 name='note'
                 className={`w-full h-8 border border-solid border-gray-300 p-4 ${
                   errors.note && touched.note ? 'border-red-500' : ''
                 }`}
               />
               <div>
                 <ErrorMessage name='note' component='div' className='error' />
               </div>
             </div>
             <div className={`mt-5 ${errors.image && touched.image ? 'border-red-500' : ''}`}>
            <div className='mt-5 flex  mx-auto w-fit gap-4'>
            <label htmlFor="image" style={{ cursor: 'pointer', }}>
        <FaUpload size={30} /> {/* Use your custom icon component here */}
        <input
          type="file"
          id="image"
          name="image"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </label>
      </div>
               <ErrorMessage name='image' component='div' className='error' />
               <br />
               <br />
               <div className='w-fit mx-auto  border-4 border-black mb-4 p-4 h-fit'>
                    {selectedImageFile ? ( // Display the selected image if available
                      <img src={URL.createObjectURL(selectedImageFile)} alt='image' className='h-1/2 ' />
                    ) : (
                      <img src={data.image} alt='image' className='h-80' />
                    )}
                  </div>
               {isLoading ? (
                 <Loader />
               ) : (
                 <button
                   type='submit'
                   className='text-white w-1/2 bg-sky-500 hover:bg-sky-700 hover:text-slate-300 p-3 rounded-2xl mb-5'
                 >
                   Upload
                 </button>
               )}
             </div>
           </div>
           </div>
         </Form>
          )}
        </Formik>
      ) : (
        <p>Loading data...</p>
      )}
    </>
  );
};
export default UpdateHeading;