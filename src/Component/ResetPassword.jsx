import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { FiEye, FiEyeOff } from "react-icons/fi";
import resetpasswordimg from "../img/Reset.png";

const ResetPassword = () => {
  const { id, token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
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
      setError("Passwords do not match.");
      setMessage("");
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
        setMessage(data.message);
        setError("");
        setTimeout(() => navigate("/"), 2000);
      } else {
        setError(data.error || "Failed to reset password.");
        setMessage("");
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
      setMessage("");
    }
  };

  return (
    <div
      className="flex items-center justify-start pl-32 min-h-screen bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${resetpasswordimg})`,
        backgroundSize: "cover",
      }}
    >
      <form
        onSubmit={handleReset}
        className="bg-[#C5C4C4] bg-opacity-60 p-6 rounded-3xl shadow-md w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-4 text-center text-[#565656]">Reset Your Password</h2>

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

            {/* New Password */}
            <div className="relative mb-4">
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                required
              />
              <div
                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-700"
                onClick={() => setShowNewPassword((prev) => !prev)}
              >
                {showNewPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </div>
            </div>

            {/* Confirm Password */}
            <div className="relative mb-6">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                required
              />
              <div
                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-700"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold p-2 rounded transition duration-200"
            >
              Update Password
            </button>
          </>
        )}

        {message && <p className="text-green-600 mt-4 text-center text-sm">{message}</p>}
        {error && <p className="text-red-600 mt-4 text-center text-sm">{error}</p>}
      </form>
    </div>
  );
};

export default ResetPassword;
