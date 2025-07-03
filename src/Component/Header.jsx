import React from "react";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const username = loggedInUser?.userName || "Guest";
  const logo = loggedInUser?.image || " ";

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/", { replace: true });
    window.location.reload();
  };

  return (
    <header className="fixed top-0 left-[15%] w-[100%] md:left-[18%] md:w-[82%] h-[70px] bg-white shadow-md flex items-center justify-end gap-7 z-40 px-4">
      {/* Mobile View */}
      <div className="flex items-center gap-3 md:hidden ">
        <img
          src={
            logo.startsWith("http")
              ? logo
              : `http://localhost:8000/uploads/${logo}`
          }
          alt="User Logo"
          className="h-8 w-8 sm:h-9 sm:w-9 rounded-full object-cover border border-gray-200"
        />
        <span className="text-orange-500 font-medium text-sm sm:text-base">
          {username}
        </span>
      </div>

      {/* Desktop View */}
      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-3">
          <img
            src={
              logo.startsWith("http")
                ? logo
                : `http://localhost:8000/uploads/${logo}`
            }
            alt="User Logo"
            className="h-9 w-9 rounded-full object-cover border border-gray-200"
          />
          <span className="text-orange-500 font-medium text-sm sm:text-base">
            {username}
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-red-400 hover:text-red-600 focus:text-red-600 text-sm sm:text-base transition-colors duration-200 pl-3 pr-5 sm:pr-32"
        >
          <FiLogOut size={16} />
          Logout
        </button>
      </div>
    </header>

    
  );
};

export default Header;








