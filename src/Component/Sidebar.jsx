import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TiHomeOutline } from "react-icons/ti";
import { CiBank } from "react-icons/ci";
import { IoBagRemoveOutline } from "react-icons/io5";
import { IoMdArrowDropdown, IoMdMenu, IoMdClose } from "react-icons/io";
import { TbBus } from "react-icons/tb";
import { VscDebugStop } from "react-icons/vsc";
import { FaRegUser } from "react-icons/fa";
import e2clogo from "../img/e2clogo.png";

function Sidebar() {
  const [openItems, setOpenItems] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sidebarLinkClass =
    "flex items-center gap-3 py-2 px-4 rounded hover:bg-gray-700 focus:bg-gray-600 focus:text-orange-500";

  const subLinkClass =
    "flex w-full py-1 px-6 rounded hover:bg-gray-600 focus:bg-orange-500 focus:text-white";

  const dropdownButtonClass = (isOpen) =>
    `flex items-center justify-between w-full py-2 px-4 rounded hover:bg-gray-700 focus:bg-gray-600 ${
      isOpen ? "text-orange-500 bg-gray-600" : "text-white"
    }`;

  const dropdownIconClass = (isOpen) =>
    `transition-transform duration-300 ${isOpen ? "rotate-0" : "-rotate-90"}`;

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <button
        onClick={toggleMobileMenu}
        className="md:hidden fixed top-4 left-4 z-40 p-2 rounded-md bg-gray-800 text-white"
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <IoMdClose size={24} /> : <IoMdMenu size={24} />}
      </button>

      <div
        className={`fixed top-0 z-30 flex flex-col h-screen bg-gray-800 shadow-md transition-all duration-300 ease-in-out 
          ${mobileMenuOpen ? "w-[40%] left-0" : "w-[40%] -left-full"} 
          md:w-[18%] md:left-0`}
      >
        <div className="p-4 flex items-center justify-center border-b border-gray-700">
          <img src={e2clogo} alt="E2C Logo" className="h-[40px] w-[110px]" />
        </div>

        {/* <nav className="p-2 text-white bg-gray-700 flex-1 "> */} <nav className="p-2 text-white bg-gray-700 flex-1 pt-[10vh] md:pt-0">
          <ul className="space-y-3 text-sm">
            <li>
              <Link to="/home" className={sidebarLinkClass} onClick={closeMobileMenu}>
                <TiHomeOutline /> Home
              </Link>
            </li>

            <li>
              <button
                onClick={() => setOpenItems(!openItems)}
                className={dropdownButtonClass(openItems)}
              >
                <div className="flex items-center gap-3">
                  <IoBagRemoveOutline />
                  Item
                </div>
                <IoMdArrowDropdown className={dropdownIconClass(openItems)} />
              </button>
              {openItems && (
                <ul className="pl-8 mt-1 space-y-1 text-gray-200">
                  <li>
                    <Link to="/Item" className={subLinkClass} onClick={closeMobileMenu}>
                      Items
                    </Link>
                  </li>
                  <li>
                    <Link to="" className={subLinkClass} onClick={closeMobileMenu}>
                      Price Lists
                    </Link>
                  </li>
                  <li>
                    <Link to="" className={subLinkClass} onClick={closeMobileMenu}>
                      Inventory Adjustments
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <Link to="/UserData" className={sidebarLinkClass} onClick={closeMobileMenu}>
                <FaRegUser /> UserData
              </Link>
            </li>

            <li>
              <Link to="/Banking" className={sidebarLinkClass} onClick={closeMobileMenu}>
                <CiBank /> Banking
              </Link>
            </li>

            <li>
              <Link to="" className={sidebarLinkClass} onClick={closeMobileMenu}>
                <IoBagRemoveOutline /> Purchases
              </Link>
            </li>

            <li>
              <Link to="" className={sidebarLinkClass} onClick={closeMobileMenu}>
                <TbBus /> E-Way Bills
              </Link>
            </li>

            <li>
              <Link to="" className={sidebarLinkClass} onClick={closeMobileMenu}>
                <VscDebugStop /> GST Filing
              </Link>
            </li>
          </ul>
        </nav>

        <div className="p-6"></div>
      </div>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={closeMobileMenu}
        />
      )}
    </>
  );
}

export default Sidebar;