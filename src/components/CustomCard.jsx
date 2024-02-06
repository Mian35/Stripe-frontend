// CustomCard.jsx

import React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const CustomCard = ({ title, description, buttonText, price, onClick }) => (
  <React.Fragment>
    <CardContent>
      <Typography variant="h2" component="div">
        {price}
      </Typography>
      <Typography variant="h5" component="div">
        {title}
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {description}
      </Typography>
      <Typography variant="body2">{/* Your custom content here */}</Typography>
    </CardContent>
    <div className='text-center'>
       
      <button
        size="medium"
        className='text-white w-1/2 bg-black  hover:text-slate-300 p-3  mb-5 font-bold'
        onClick={onClick}
      >
        {buttonText}
      </button>
      
    </div>
  </React.Fragment>
);

export default CustomCard;
