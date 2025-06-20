import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import resetpasswordimg from "../img/Reset.png";

const ResetPassword = () => {
  const { id, token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
      }}>
      <form
        onSubmit={handleReset}
        className="bg-[#C5C4C4] bg-opacity-60 p-6 rounded-3xl shadow-md w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-[#565656]">Reset Your Password</h2>
       
        <input
          id="newPassword"
          type="password"
          placeholder=" New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full border-b-2 border-[#58585A] bg-transparent pl-2 text-gray-900 text-sm focus:outline-none focus:border-orange-500 mb-4 pb-2"
          required
        />
        
        <input
          id="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border-b-2 border-[#58585A] bg-transparent pl-2 text-gray-900 text-sm focus:outline-none focus:border-orange-500 mb-6 pb-2"
          required
        />
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold p-2 rounded transition duration-200"
        >
          Update Password
        </button>
        {message && <p className="text-green-600 mt-4 text-center text-sm">{message}</p>}
        {error && <p className="text-red-600 mt-4 text-center text-sm">{error}</p>}
      </form>
    </div>
  );
};

export default ResetPassword;