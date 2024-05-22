import { useEffect, useState} from 'react';
import { Navigate, redirect,Outlet } from 'react-router-dom';
import Login from '../components/Login';
import { toast } from 'react-toastify';
import config from './Config';
import { baseUrl } from './Base';
import axios from 'axios';


const ProtectedRoute = () => {
  const [data, setData] = useState({})
  useEffect(() => {
    const fetchUser = async () => {
      try {
        
  
        // Make the request with the configured headers
        const response = await axios.get(`${baseUrl}/auth/me`, config);
  
  
        setData(response.data.data);
        console.log(response.data.data.plan)
        
        
  
        
      } catch (error) {
        // Handle errors, such as invalid token or network issues
        console.error(error);
        toast.error(error.response.data.message)
      }
    };
  
    fetchUser();
  }, []);
  console.log("protected")
  
  // Check if the user has a valid token
  const token = localStorage.getItem('token');
  
  if (!token) {
    // If no token, redirect to the login page
   toast.info("You are not logged Inn")
   
   return <Navigate to="/" />;
  }
  console.log("problem is here")
return <Outlet/>
  // If there is a token, render the protected route
  
};

export default ProtectedRoute;
