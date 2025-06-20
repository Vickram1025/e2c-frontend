import React, { useState } from "react";
import forgetimg from "../img/Forget.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/registration/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Reset link sent to your email.");
        setEmail("");
      } else {
        alert(data.message || "Error sending reset link.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error. Please try again later.");
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
        <label className="block mb-2 text-[#565656] font-medium">
          Enter your registered email
        </label>
        <input
          type="email"
          className="w-full border-b-2 border-[#58585A] bg-transparent pl-2 text-gray-900 text-sm focus:outline-none focus:border-orange-500 mb-4" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          
          required
        />
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold p-2 rounded transition duration-200"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;