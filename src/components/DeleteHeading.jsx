import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { baseUrl } from '../utils/Base';
import Loader from '../utils/Loader';
import config from '../utils/Config';

const DeleteHeading =  () => {
    const {id} = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()
   const deleteData = async () => {
    setIsLoading(true)
    try {
        const response = await axios.delete(`${baseUrl}/blogs/delete/${id}`,config);
        if(response.status === 200){
            toast.success('Heading Deleted Successfully')
            navigate('/all')
        }
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
    }
    finally{
        setIsLoading(false)
    }
   
   }

  return (

    <>
    <h1 className='text-center font-bold my-10 mt-20'> Do You really want to delete {id} </h1>

    { isLoading ? (
        <Loader/>
    ): (
        <div className='text-center'>
        <button className = 'text-white w-1/4 bg-sky-500 hover:bg-sky-700 hover:text-slate-300 p-3 rounded-2xl mx-5 font-bold mb-5 buttons align-center text-center' onClick={deleteData}>YES</button>
        <Link to={'/all'}>
        <button className = 'text-white w-1/4 bg-sky-500 hover:bg-sky-700 hover:text-slate-300 p-3 rounded-2xl font-bold mb-5 buttons align-center text-center' >No</button>
        </Link>
    </div>
    )}
    
    </>
  )
}

export default DeleteHeading