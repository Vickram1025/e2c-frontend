import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import landingimg from "../img/landingbg.jpeg";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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
        // Store login data
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("token", data.token); // Assuming backend returns a JWT token
        localStorage.setItem("user", JSON.stringify(data.user));

        setFormData({ email: "", password: "" });
        alert("Successfully logged in");
        navigate("/home");
      } else {
        alert(data.message || "Login failed");
        setFormData({ email: "", password: "" });
      }
    } catch (error) {
      console.error("Login error:", error);
      setFormData({ email: "", password: "" });
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div
      className="flex items-center justify-between min-h-screen px-10 bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url(${landingimg})`,
        backgroundSize: "cover",
      }}
    >
      <div className="max-w-md text-black drop-shadow-md absolute left-16">
        <p className="text-2xl font-medium mb-2">WE HELP YOU</p>
        <h1 className="text-[80px] font-semibold text-orange-500">
          TO CHOOSE <br />
          EVERYTHING <br />
          YOU NEED
        </h1>
        <p className="text-2xl font-medium mb-2">IN AN EASY WAY</p>
      </div>

      <div className="bg-[#C5C4C4] bg-opacity-60 p-6 rounded-3xl shadow-md w-[450px] absolute right-[170px]">
        <form onSubmit={handleLogin}>
          <h2 className="text-3xl font-bold mb-8 text-center text-[#565656]">
            LOG IN
          </h2>

          <div className="flex items-center mb-6 relative">
            <label className="w-32 text-[#565656] text-base font-medium">E-mail:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
              required
            />
          </div>

          <div className="flex items-center mb-8 relative">
            <label className="w-32 text-[#565656] text-base font-medium">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
              required
            />
          </div>

          <div className="flex items-center justify-end gap-10 mr-10 ">
            <button
              type="submit"
              className="focus:outline-none text-white bg-orange-500 hover:bg-orange-600   font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
            >
              Sign in
            </button>

            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="focus:outline-none text-white bg-orange-500 hover:bg-orange-600   font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
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
