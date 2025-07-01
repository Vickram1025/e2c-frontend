import React, { useState } from "react";
import axios from "axios";
import forgetimg from "../img/Forget.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import e2clogo from '../img/e2clogo.png';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await axios.post("http://localhost:8000/registration/forgot-password", {
        email,
      });

      if (res.data?.message) {
        toast.success(res.data.message); 
      } else {
        toast.success("Reset link sent to your email.");
      }

      setEmail("");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Server error. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center md:justify-start md:pl-32 min-h-screen bg-center bg-no-repeat bg-cover p-4"
      style={{
        backgroundImage: `url(${forgetimg})`,
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-[#C5C4C4] bg-opacity-60 p-6 rounded-3xl shadow-md w-full max-w-md"
      >
        <div className="flex justify-center mb-5">
          <img 
            src={e2clogo} 
            alt="E2C Logo" 
            className="h-16 w-44 md:h-20 md:w-[220px]" 
          />
        </div>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-white rounded-md w-full p-3 md:p-2.5 text-black placeholder-gray-500 outline-none border border-orange-500"
        />

        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-3 sm:gap-0">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="font-semibold px-5 py-2 rounded text-white bg-orange-500 hover:bg-orange-600 w-full sm:w-auto"
          >
            To Login
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`font-semibold px-5 py-2 rounded text-white w-full sm:w-auto ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;