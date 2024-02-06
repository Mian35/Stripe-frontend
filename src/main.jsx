import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ToastContainer } from 'react-toastify'
import ProtectedRoute from './utils/ProtectedRoute.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
  
    <ToastContainer  autoClose={3000} position='top-center'/>
    
    <App />
    
  </>
)
