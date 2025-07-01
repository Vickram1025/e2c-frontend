import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import landingimg from "../img/landingbg.jpeg";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 
import e2clogo from '../img/e2clogo.png'

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false); 

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/registration/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        setFormData({ email: "", password: "" });

        toast.success("Successfully logged in!");

        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else {
        toast.error(data.message || "Login failed");
        setFormData({ email: "", password: "" });
      }
    } catch (error) {
      console.error("Login error:", error);
      setFormData({ email: "", password: "" });
      toast.error("Server error. Please try again later.");
    }
  };

  return (
    <div
      className="flex flex-col lg:flex-row items-center justify-center lg:justify-between min-h-screen p-4 md:p-10 bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url(${landingimg})`,
        backgroundSize: "cover",
      }}
    >
     
      <div className="text-white text-center lg:text-left drop-shadow-md mb-8 lg:mb-0 lg:absolute lg:left-16 lg:top-1/2 lg:-translate-y-1/2">
        <p className="text-lg md:text-xl lg:text-2xl font-medium mb-1 md:mb-2">WE HELP YOU</p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-semibold text-orange-500 leading-tight">
          TO CHOOSE <br />
          EVERYTHING <br />
          YOU NEED
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl font-medium mt-1 md:mt-2">IN AN EASY WAY</p>
      </div>

     
      <div className="bg-[#C5C4C4] bg-opacity-60 p-6 rounded-3xl shadow-md w-full max-w-sm md:max-w-md lg:w-[450px] lg:absolute lg:right-[290px] lg:top-1/2 lg:-translate-y-1/2">
        <form onSubmit={handleLogin}>
         
          <div className="flex justify-center mb-5">
             <img src={e2clogo} alt="E2C Logo" className="h-16 md:h-20 w-[180px] md:w-[220px]" />
          </div>

          <div className="flex items-center mb-6 relative">
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-white rounded-md w-full p-2.5 text-black placeholder-gray-500 outline-none border border-orange-500"
              required
            />
          </div>

          <div className="flex items-center mb-8 relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="bg-white rounded-md w-full p-2.5 text-black placeholder-gray-500 outline-none border border-orange-500"
              required
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
            >
              {showPassword ? <FaEye size={22} />  : <FaEyeSlash size={22} /> }
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10">
            <button
              type="submit"
              className="focus:outline-none text-white bg-orange-500 hover:bg-orange-600 font-medium rounded-lg text-sm px-5 py-2.5 w-full sm:w-auto"
            >
              Sign in
            </button>

            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="focus:outline-none text-white bg-orange-500 hover:bg-orange-600 font-medium rounded-lg text-sm px-5 py-2.5 w-full sm:w-auto"
            >
              Forgot
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;