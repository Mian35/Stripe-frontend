import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { baseUrl } from '../utils/Base';
import { MdArrowBack } from 'react-icons/md';
import Loader from '../utils/Loader';
const Details = () => {
  const [data, setData] = useState({});
  const [step, setStep] = useState({});
  const { id,page } = useParams();
  const [loading, setLoading] = useState(false);
  const [stepLoadingStates, setStepLoadingStates] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${baseUrl}/blogs/one/${id}`);
        setData(response.data.data);
        setStep(response.data.data.createdBy)
        console.log(response.data.data)
        
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }finally{
        setLoading(false)
      }
    };
    fetchData();
  }, [id]);
 
  if(loading){
    return <Loader/>
  }
  return (
    <div className="w-full mx-auto p-4">
      <div className="w-full mx-auto text-center">
      <div className='flex space-between'>
  <div className='pt-7'>
    <Link to={`/`}>
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-12'>
        <MdArrowBack /> {/* Use the MdArrowBack icon */}
      </button>
    </Link>
  </div>
  <div className='text-center mx-auto'>
    <h1 className="font-bold text-3xl capitalize pt-7 italic underline mb-10 mt-20">Details</h1>
  </div>
</div>
        <div className='mx-4 my-5 rounded-lg border border-solid border-gray-300 p-4 text-center'>
  <div className='h-fit bg-gray-400 py-10'>
    <img src={data.image} alt="Blog Image" className='h-40 m-auto rounded-lg' />
    <h1 className='font-bold text-2xl mt-4 sm:text-3xl lg:text-4xl xl:text-5xl'>{data.name}</h1>
  </div>
</div>
<div className='mx-4 my-5 rounded-lg border border-solid border-gray-300 p-4 text-center'>
  <h2 className='text-xl font-bold sm:text-2xl lg:text-3xl xl:text-4xl'>About:</h2>
  <p className='text-cnter mt-2 sm:text-lg lg:text-xl xl:text-2xl'>{data.about}</p>
</div>
<div className='mx-4 my-5 rounded-lg border border-solid border-gray-300 p-4 text-center'>
  <h2 className='text-xl font-bold sm:text-2xl lg:text-3xl xl:text-4xl'>Blog:</h2>
  <p className='text-center mt-2 sm:text-lg lg:text-xl xl:text-2xl'>{data.blog}</p>

</div>
       
      </div>
      <div className='flex'>
      <p className='text-2xl font-bold mb-5 ml-20 text-red-500'>Written By:</p>
      <p className='mt-1 text-xl ml-3'>{step.firstname}  {step.lastname}</p>
      </div>
    </div>
  );
};
export default Details;