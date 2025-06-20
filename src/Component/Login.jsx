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
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user", JSON.stringify(data.user));
        setFormData({ email: "", password: "" });
        alert("successfully login ")
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
     
      <div className="max-w-md text-black drop-shadow-md absolute left-16 ">
        <p className="text-2xl font-medium mb-2">WE HELP YOU</p>
        <h1 className="text-[80px] font-semibold text-orange-500 ">
          TO CHOOSE <br />
          EVERYTHING <br />
          YOU NEED
        </h1>
        <p className="text-2xl font-medium mb-2">IN A EASY WAY</p>
      </div>

     
      <div className="bg-[#C5C4C4] bg-opacity-30 p-6 rounded-3xl shadow-md w-[450px] absolute right-[170px]">
        <form onSubmit={handleLogin} className="">
          <h2 className="text-3xl font-bold mb-8 text-center text-[#565656]">
            LOG IN
          </h2>

         
          <div className="flex items-center mb-6 relative">
            <label className="w-32 text-[#565656] text-base font-medium">E-mail:</label>
            <input
              type="email"
              value={formData.email}
              name="email"
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              className=" w-[250px] flex-1 border-b-2 border-[#58585A] bg-transparent  pl-6 text-gray-900 text-sm focus:outline-none focus:border-orange-500 absolute bottom-2 left-24"
              required
            />
          </div>

        
          <div className="flex items-center mb-8 relative">
            <label className="w-32 text-[#565656] text-base font-medium">Password:</label>
            <input
              type="password"
              value={formData.password}
              name="password"
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              className=" w-[250px]  flex-1 border-b-2 border-[#58585A] bg-transparent  pl-6 text-gray-900 text-sm focus:outline-none focus:border-orange-500 absolute bottom-2 left-24"
              required
            />
          </div>

         
          <div className="flex items-center justify-evenly">
            <button
              type="submit"
              className="text-white text-base  hover:text-[#F5821F] tracking-widest"
            >
              Sign in
            </button>
             
            <button
              type="button"
              className="text-white text-base  hover:text-[#F5821F] tracking-widest"
              onClick={() =>navigate("/forgot-password")}
             
            >
              Forget
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
