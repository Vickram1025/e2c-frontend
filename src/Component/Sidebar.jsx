import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TiHomeOutline } from "react-icons/ti";
import { CiBank } from "react-icons/ci";
import { IoBagRemoveOutline } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import { LuTimer } from "react-icons/lu";
import { TbBus } from "react-icons/tb";
import { VscDebugStop } from "react-icons/vsc";
import { FaRegUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

function Sidebar() {
  const [openItems, setOpenItems] = useState(false);
  const [openSale, setOpenSale] = useState(false);
  const [openTracking, setOpenTracking] = useState(false);

  const navigate = useNavigate();

  // Get username and image from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.userName || "Guest";
  const logo = user?.image || "";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
    window.location.reload(); // optional reset
  };

  const subLinkClass =
    "flex w-full py-1 px-6 rounded hover:bg-slate-700 focus:bg-green-700 focus:text-white";

  return (
    <div className="hidden md:flex md:flex-col w-64 h-[560px] bg-slate-800 shadow-md fixed z-50">
      {/* Header with Username and Logo */}
      <div className="p-4 flex flex-col gap-2">
        <div className="text-white text-xl font-bold flex justify-center items-center">
          Book
        </div>
        <div className="flex items-center justify-between text-sm text-gray-300">
          <div className="flex items-center gap-2">
            {logo && (
              <img
                src={`http://localhost:8000/uploads/${logo}`}
                alt="User Logo"
                className="h-8 w-8 rounded-full object-cover"
              />
            )}
            <span className="text-orange-500">Welcome,<br />{username}</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 text-red-400 hover:text-red-600"
          >
            <FiLogOut size={16} />
            Logout
          </button>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <nav className="p-2 text-white bg-slate-700 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-slate-900">
        <ul className="space-y-3 text-sm">
          <li>
            <Link
              to="/home"
              className="flex items-center gap-3 py-2 px-4 rounded hover:bg-slate-800 focus:bg-slate-900 focus:text-green-500"
            >
              <TiHomeOutline /> Home
            </Link>
          </li>

          {/* Items Dropdown */}
          <li>
            <button
              onClick={() => setOpenItems(!openItems)}
              className={`flex items-center justify-between w-full py-2 px-4 rounded hover:bg-slate-800 focus:bg-slate-900 ${
                openItems ? "text-green-500 bg-slate-900" : "text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <IoBagRemoveOutline />
                Items
              </div>
              <IoMdArrowDropdown
                className={`transition-transform duration-300 ${
                  openItems ? "rotate-0" : "-rotate-90"
                }`}
              />
            </button>
            {openItems && (
              <ul className="pl-2 mt-1 space-y-1 text-gray-200">
                <li>
                  <Link to="/Item" className={subLinkClass}>
                    Items
                  </Link>
                </li>
                <li>
                  <Link to="/price-lists" className={subLinkClass}>
                    Price Lists
                  </Link>
                </li>
                <li>
                  <Link to="/inventory-adjustments" className={subLinkClass}>
                    Inventory Adjustments
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li>
            <Link
              to="/User"
              className="flex items-center gap-3 py-2 px-4 rounded hover:bg-slate-800 focus:bg-slate-900 focus:text-green-500"
            >
              <FaRegUser /> User
            </Link>
          </li>

          <li>
            <Link
              to="/Banking"
              className="flex items-center gap-3 py-2 px-4 rounded hover:bg-slate-800 focus:bg-slate-900 focus:text-green-500"
            >
              <CiBank /> Banking
            </Link>
          </li>

          {/* Sales Dropdown */}
          <li>
            <button
              onClick={() => setOpenSale(!openSale)}
              className={`flex items-center justify-between w-full py-2 px-4 rounded hover:bg-slate-800 focus:bg-slate-900 ${
                openSale ? "text-green-500 bg-slate-900" : "text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <IoBagRemoveOutline />
                Sales
              </div>
              <IoMdArrowDropdown
                className={`transition-transform duration-300 ${
                  openSale ? "rotate-0" : "-rotate-90"
                }`}
              />
            </button>
            {openSale && (
              <ul className="pl-2 mt-1 space-y-1 text-gray-200">
                {/* Add your sales links here if needed */}
              </ul>
            )}
          </li>

          <li>
            <Link
              to="/purchases"
              className="flex items-center gap-3 py-2 px-4 rounded hover:bg-slate-800 focus:bg-slate-900 focus:text-green-500"
            >
              <IoBagRemoveOutline /> Purchases
            </Link>
          </li>

          {/* Time Tracking Dropdown */}
          <li>
            <button
              onClick={() => setOpenTracking(!openTracking)}
              className={`flex items-center justify-between w-full py-2 px-4 rounded hover:bg-slate-800 focus:bg-slate-900 ${
                openTracking ? "text-green-500 bg-slate-900" : "text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <LuTimer /> Time Tracking
              </div>
              <IoMdArrowDropdown
                className={`transition-transform duration-300 ${
                  openTracking ? "rotate-0" : "-rotate-90"
                }`}
              />
            </button>
            {openTracking && (
              <ul className="pl-2 mt-1 space-y-1 text-gray-200">
                {/* Add time tracking links here if needed */}
              </ul>
            )}
          </li>

          <li>
            <Link
              to="/eway-bills"
              className="flex items-center gap-3 py-2 px-4 rounded hover:bg-slate-800 focus:bg-slate-900 focus:text-green-500"
            >
              <TbBus /> E-Way Bills
            </Link>
          </li>

          <li>
            <Link
              to="/gst-filing"
              className="flex items-center gap-3 py-2 px-4 rounded hover:bg-slate-800 focus:bg-slate-900 focus:text-green-500"
            >
              <VscDebugStop /> GST Filing
            </Link>
          </li>
        </ul>
      </nav>

      {/* Optional Collapse Button (if needed in future) */}
      <div className="p-2 text-white text-xl font-bold flex justify-center items-center hover:bg-slate-900">
        &lt;
      </div>
    </div>
  );
}

export default Sidebar;
