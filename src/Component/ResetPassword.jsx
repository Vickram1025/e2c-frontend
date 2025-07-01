import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { FiEye, FiEyeOff } from "react-icons/fi";
import resetpasswordimg from "../img/Reset.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import e2clogo from '../img/e2clogo.png';

const ResetPassword = () => {
  const { id, token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [expired, setExpired] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const decoded = jwtDecode(token);
      const exp = decoded.exp * 1000;
      const now = Date.now();
      const timeRemaining = exp - now;

      if (timeRemaining <= 0) {
        setExpired(true);
        return;
      }

      setTimeLeft(Math.floor(timeRemaining / 1000));

      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setExpired(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    } catch (err) {
      setExpired(true);
    }
  }, [token]);

  const formatTime = (seconds) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  const handleReset = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:8000/registration/reset-password/${id}/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Password reset successful!");
        setTimeout(() => navigate("/"), 2000);
      } else {
        toast.error(data.error || "Failed to reset password.");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <div
      className="flex items-center justify-center md:justify-start md:pl-32 min-h-screen bg-center bg-cover p-4"
      style={{
        backgroundImage: `url(${resetpasswordimg})`,
      }}
    >
      <form
        onSubmit={handleReset}
        className="bg-[#C5C4C4] bg-opacity-60 p-6 rounded-3xl shadow-md w-full max-w-md"
      >
        <div className="flex justify-center mb-5">
          <img 
            src={e2clogo} 
            alt="E2C Logo" 
            className="h-16 w-44 md:h-20 md:w-[220px]" 
          />
        </div>

        {expired ? (
          <p className="text-red-600 text-center font-semibold mb-4">
            Reset link expired. Please request a new one.
          </p>
        ) : (
          <>
            {timeLeft !== null && (
              <p className="text-sm text-center text-gray-700 mb-4">
                Link expires in: <span className="font-semibold">{formatTime(timeLeft)}</span>
              </p>
            )}

            <div className="relative mb-4">
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="bg-white rounded-md w-full p-3 md:p-2.5 text-black placeholder-gray-500 outline-none border border-orange-500"
                required
              />
              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-700"
                onClick={() => setShowNewPassword((prev) => !prev)}
              >
                {showNewPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
              </div>
            </div>

            <div className="relative mb-6">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-white rounded-md w-full p-3 md:p-2.5 text-black placeholder-gray-500 outline-none border border-orange-500"
                required
              />
              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-700"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
            >
              Update Password
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default ResetPassword;