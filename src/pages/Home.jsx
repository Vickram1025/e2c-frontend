import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/', { replace: true }); // redirect if not logged in
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
    <div className="bg-green-600 min-h-screen text-center flex justify-center items-center w-full md:ml-64 p-4">
      <p className="text-white text-xl">Welcome to Home Page</p>
    </div>
  );
};

export default Home;
