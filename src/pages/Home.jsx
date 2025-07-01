import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/', { replace: true }); 
    }

    const handleBack = () => {
      if (!localStorage.getItem('token')) {
        navigate('/', { replace: true });
      }
    };

    window.addEventListener('popstate', handleBack);

    return () => window.removeEventListener('popstate', handleBack);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center w-full px-4 sm:px-6 md:pl-64 md:pt-16">
     
      <div className="text-center">
        <p className="text-gray-800 text-lg sm:text-xl md:text-2xl font-semibold">
          Welcome to Home Page
        </p>
      </div>
    </div>
  );
};

export default Home;