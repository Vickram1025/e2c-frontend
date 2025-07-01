import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRoutes from './AppRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppRoutes />
    <ToastContainer
  position="top-right"
  autoClose={1000}
  hideProgressBar={false}
  newestOnTop={true}
  closeOnClick
  pauseOnHover
  draggable
  theme="light"
/>

   
  </React.StrictMode>
);

