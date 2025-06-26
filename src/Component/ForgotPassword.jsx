import React, { useState } from "react";
import axios from "axios";
import forgetimg from "../img/Forget.png";
import { useNavigate } from "react-router-dom";

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
        alert(res.data.message);
      } else {
        alert("Reset link sent to your email.");
      }

      setEmail("");
    } catch (error) {
      alert(
        error.response?.data?.message || "Server error. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="flex items-center justify-start pl-32 min-h-screen bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${forgetimg})`,
        backgroundSize: "cover",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-[#C5C4C4] bg-opacity-60 p-6 rounded-3xl shadow-md w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-[#565656]">
          Forgot Password
        </h2>

        

        <input
          type="email"
          placeholder="Enter your email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="flex justify-between items-center mt-6">

            <button
            type="button"
            onClick={() => navigate("/")}
            className="font-semibold px-5 py-2 rounded text-white bg-orange-500 hover:bg-orange-600"
          >
            Back to Login
          </button>


          <button
            type="submit"
            disabled={isSubmitting}
            className={`font-semibold px-5 py-2 rounded text-white ${
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
