import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams,useNavigate } from 'react-router-dom';
import { baseUrl } from '../utils/Base';
import { toast } from 'react-toastify';
import Loader from '../utils/Loader';

const AllHeadings = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 4;
  const { id, page } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const token = localStorage.getItem('token'); // Replace with your actual function to get the token
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(`${baseUrl}/blogs/current`,config);
        setData(response.data.data);
        console.log(response.data.data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setIsLoading(false)
    };
    fetchData();

    // Set the currentPage to the page parameter, or default to 1
    setCurrentPage(page ? parseInt(page) : 1);
  }, [page]);

 

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const visibleData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
if(isLoading){
  return <Loader/>
}
  return (
    <>
      <div className='h-screen w-fit sm:h-fit mx-auto'>
        <h1 className='text-center font-bold text-3xl capitalize pt-7  italic underline  mb-10 mt-20'>DASHBOARD</h1>
       
        <div className='my-auto mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 w-fit'>
          {visibleData.length === 0 ? (
           <div className='text-center font-bold text-3xl mx-auto my-auto'>
           No Headings to Display
         </div>
          ) : (
            <>
             
              {visibleData.map((item) => (
                <div className='rounded-lg border-2 border-black mx-10' key={item.id}>
                  <div className='h-fit bg-gray-400 p-4'>
                    <img src={item.image} alt="Heading Image" className='h-40 mx-auto' />
                  </div>
                  <div className='bg-black'>
                    <div className='text-center text-white pt-2 text-2xl'>
                      <h1 className='font-bold'>{item.name}</h1>
                    </div>
                    <div className='text-center'>
                      <Link to={`/details/${item._id}`}>
                        <button className='mx-5 my-5 bg-blue-700 text-white font-bold w-40 h-10'> View Details</button>
                      </Link>
                      <Link to={`/delete/${item._id}`}>
                        <button className='mx-5 my-5 bg-blue-700 text-white font-bold w-40 h-10'> Delete</button>
                      </Link>
                      <Link to={`/update/${item._id}`}>
                        <button className='mx-5 my-5 bg-blue-700 text-white font-bold w-40 h-10'> Update</button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        <div className='text-center'>
          {totalPages > 1 && (
            <div>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`mx-1 bg-blue-500 hover:bg-blue-700 text-white text-center font-bold py-2 px-4 rounded w-14 mb-5 ${currentPage === index + 1 ? 'bg-blue-700' : ''}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
         
        </div>
      </div>
    </>
  );
};

export default AllHeadings;
