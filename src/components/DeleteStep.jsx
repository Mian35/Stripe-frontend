import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { baseUrl } from '../utils/Base';
import { Link, useParams } from 'react-router-dom';

const DeleteStep = () => {
    const [data, setData] = useState({});
    const [image, setImage] = useState([]);
    const [step, setStep] = useState('')
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseUrl}/heading/${id}`);
                setData(response.data.data);
                console.log(response.data.data.steps, '//////');
                setImage(response.data.data.steps);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
             <h1 className='text-center font-bold text-3xl capitalize pt-7  italic underline  mb-10 mt-20'>Details</h1>
            <div className='my-6 w-screen h-full align-center text-center'>
                <div className='rounded-lg p-4 w-screen h-auto m-auto' key={data.id}>
                    <div className='h-40 bg-gray-400'>
                        <img src={data.image} alt="Heading Image" className='h-40 m-auto' />
                    </div>
                    <h1 className='font-bold'>{data.title}</h1>
                    <br />
                    {/* <textarea className='w-80 h-80 border border-solid border-gray-300 p-4'>{data.description}</textarea> */}
                    <div style={{width:"75vw", height:"20vh",margin:"auto"}}>
                    <p>{data.description}</p>
                    </div>
                    
                    <div style={{display:"flex", width:"75vw", height:"100px",margin:"auto"}}>
                        <b>Note: </b><span>   </span><p>{data.note}</p>
                    </div>

                    {/* Conditionally render steps if the 'steps' array exists */}
                   
                    {data.steps && data.steps.length > 0 && (
  <>
    <h1 style={{fontWeight:"bold",fontSize:"30px",}}>{data.steps.length} Steps Found</h1>
    <br />
    {data.steps.map(({ title, images,id }, index) => {
      return (
        <div key={index}>
          <h1 style={{fontWeight:"bold",fontSize:"25px", marginLeft:"-800px"}}>{title}</h1>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px", width: "70vw", height: "50vh" }}>
            {images.map((image, imageIndex) => (
                <>
              <div className='w-40 h-80 border-2 border-gray-700 rounded-xl m-auto' key={imageIndex}>
                <img style={{ height: "250px", margin: "auto", padding: "auto", marginTop: "30px" }} src={image} alt="Image" />
              </div>
              <Link to={id}>
              <button>Delete Step</button>
              </Link>
              </>
            ))}
          </div>
        </div>
      );
    })}
  </>
)}


                    {/* Display "No Steps Found" if the 'steps' array doesn't exist or is empty */}
                    {!data.steps && <h1 style={{fontWeight:"bold", fontSize:"30px",width:"500px",textAlign:"center"}}>No Steps Found</h1>}
                    <br />
                    <Link to={`/steps/${id}`}>
                    <button className='bg-blue-800 w-40 h-10 text-white font-bold text-center'>Add Steps</button>
                    </Link>
                </div>
            </div>
        </div>
        
    );
}

export default DeleteStep