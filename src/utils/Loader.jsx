import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loader() {
  return (
    <Box
    sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '20vh', // Center vertically
      }}
    >
       <CircularProgress sx={{ color: 'black' }} size={100} thickness={2}  />
    </Box>
  );
}