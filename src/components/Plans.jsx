import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CustomCard from './CustomCard'; // Update the import path
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../utils/Base';
import config from '../utils/Config';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function OutlinedCard() {
  const [data, setData] = useState({})
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Make the request with the configured headers
        const response = await axios.get(`${baseUrl}/auth/me`, config);
        setData(response.data.data);
        console.log(response.data.data._id);
      } catch (error) {
        // Handle errors, such as invalid token or network issues
        console.error(error);
        toast.error(error.response.data.message);
      }
    };

    fetchUser();
  }, []);
  
  const navigate = useNavigate();
  
  const handlePremiumPlanClick = async () => {
    try {
      const response = await axios.patch(`${baseUrl}/user/update-user/${data._id}`);
      console.log(response, '//////////////////');
      if (response.status === 200) {
        setTimeout(() => {
          navigate('/add');
        }, 3000);
        toast.info("Premium Plan Selected");
      }
    } catch (error) {
      console.log(error);
    }
    console.log('Premium Plan clicked!');
  };

  const handleStandardPlanClick = async () => {
    try {
      const response = await axios.patch(`${baseUrl}/user/update-standard/${data._id}`);
      console.log(response, '//////////////////');
      if (response.status === 200) {
        setTimeout(() => {
          navigate('/add');
        }, 3000);
        toast.info("Standard Plan Selected");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='bg-gradient-to-r from-gray-500 via-gray-300 to-black min-h-screen flex flex-col md:flex-row justify-center items-center rounded-xl text-center font-bold p-4'>
      <Box sx={{ width: { xs: '100%', md: '25vw' }, mb: { xs: 4, md: 0 }, mx: 'auto', mt: '100px' }}>
        <Card sx={{ width: '100%', height: '50vh', border: '2px solid gray', borderRadius:"50px"}}>
          <CustomCard
            price="$20"
            title="Standard Plan"
            description="Get access to 20 upload tokens"
            buttonText="Purchase Plan"
            onClick={handleStandardPlanClick}
          />
        </Card>
      </Box>

      <Box sx={{ width: { xs: '100%', md: '25vw' }, mx: 'auto', mt: '100px' }}>
        <Card sx={{ width: '100%', height: '50vh', border: '2px solid gray', borderRadius:"50px"  }}>
          <CustomCard
            price="$50"
            title="Premium Plan"
            description="Get access to 50 upload tokens"
            buttonText="Purchase Plan"
            onClick={handlePremiumPlanClick}
          />
        </Card>
      </Box>
    </div>
  );
}
