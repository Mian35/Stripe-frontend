import React from 'react';
import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './utils/ProtectedRoute'; // Import your ProtectedRoute component
import AddHeading from './components/AddHeading';
import AllHeadings from './components/AllHeadings';
import Details from './components/Details';
import DeleteHeading from './components/DeleteHeading';
import UpdateHeading from './components/UpdateHeading';
import UpdateSteps from './components/UpdateSteps';
import Sidenav from './components/Sidenav';
import Register from './components/Register';
import Login from './components/Login';
import AddSteps from './components/AddSteps';
import Error from './utils/Error';
import Password from './utils/Password';
import OutlinedCard from './components/Plans';



function App() {
  return (
    <BrowserRouter>
    
    <Routes>
      <Route path="/" element={<Login />} errorElement={<Error/>}/>
      <Route path="/register" element={<Register />} />
      <Route path='/password' element ={<Password/>}/>
      
      <Route path="/" element={<ProtectedRoute />}>
      <Route path="all" element={<AllHeadings />} />
          <Route path="add" element={<AddHeading />} />
          <Route path="plans" element={<OutlinedCard />} />
          <Route path="steps/:id" element={<AddSteps />} />
          <Route path="details/:id" element={<Details />} />
          <Route path="delete/:id" element={<DeleteHeading />} />
          <Route path="update/:id" element={<UpdateHeading />} />
          <Route path="update/steps/:id/:stepId" element={<UpdateSteps />} />

          
        
      </Route>
    </Routes>
  </BrowserRouter>
  
  );
}

export default App;
