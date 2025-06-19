// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { TiHomeOutline } from "react-icons/ti";
// import { CiBank } from "react-icons/ci";
// import { IoBagRemoveOutline } from "react-icons/io5";
// import { IoMdArrowDropdown } from "react-icons/io";
// import { LuTimer } from "react-icons/lu";
// import { TbBus } from "react-icons/tb";
// import { VscDebugStop } from "react-icons/vsc";
// import { FaUser } from "react-icons/fa";

// function Sidebar() {
//   const [openItems, setOpenItems] = useState(false);
//   const [openSale, setOpenSale] = useState(false);
//   const [openTracking, setOpenTracking] = useState(false);

//   const Hover =
//     "flex w-[90px] p-1 m-2 pl-8 pr-24 rounded hover:bg-slate-700 focus:bg-green-700 focus:text-white";

//   return (
//     <div className="w-64 h-[560px] bg-slate-800 shadow-md flex flex-col fixed">
//       <div className="p-4 text-white text-xl font-bold">Book</div>

//       <nav className="p-2 text-white bg-slate-700 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-slate-900">
//         <ul className="space-y-2">
//           <li>
//             <Link
//               to="/"
//               className="flex items-center gap-3 py-2 px-3 rounded hover:bg-slate-800 focus:bg-slate-900 focus:text-green-500"
//             >
//               <TiHomeOutline /> Home
//             </Link>
//           </li>

//           {/* Items Collapsible */}
//           <li>
//             <button
//               onClick={() => setOpenItems(!openItems)}
//               className={`flex items-center justify-between w-full gap-3 p-2 mb-2 rounded hover:bg-slate-800 focus:bg-slate-900 ${
//                 openItems ? "text-green-700 bg-slate-900" : "text-white"
//               }`}
//             >
//               <div className="flex items-center gap-3">
//                 <IoBagRemoveOutline
//                   className={`${openItems ? "text-green-700" : ""}`}
//                 />
//                 Items
//               </div>
//               <IoMdArrowDropdown
//                 className={`transition-transform duration-300 ${
//                   openItems ? "rotate-0" : "-rotate-90"
//                 }`}
//               />
//             </button>

//             {openItems && (
//               <ul className="pl-6 space-y-2 gap-2 text-sm text-gray-200">
//                 <li>
//                   <Link to="/Item" className={Hover}>
//                     Items
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/price-lists" className={Hover}>
//                     Price Lists
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/inventory-adjustments" className={Hover}>
//                     Inventory Adjustments
//                   </Link>
//                 </li>
//               </ul>
//             )}
//           </li>

//           <li>
//             <Link to="/User" className={Hover}>
//             <FaUser className="text-white"/>
//               User
//             </Link>
//           </li>

//           <li>
//             <Link
//               to="/banking"
//               className="flex items-center gap-3 py-2 px-3 rounded hover:bg-slate-800 focus:bg-slate-900 focus:text-green-500"
//             >
//               <CiBank /> Banking
//             </Link>
//           </li>

//           {/* Sales Collapsible (empty for now) */}
//           <li>
//             <button
//               onClick={() => setOpenSale(!openSale)}
//               className="flex items-center justify-between w-full gap-3 p-2 mb-2 rounded hover:bg-slate-800 focus:bg-slate-900 focus:text-green-500"
//             >
//               <div className="flex items-center gap-3">
//                 <IoBagRemoveOutline /> Sales
//               </div>
//               <IoMdArrowDropdown
//                 className={`transition-transform duration-300 ${
//                   openSale ? "rotate-0" : "-rotate-90"
//                 }`}
//               />
//             </button>
//             {openSale && (
//               <ul className="pl-4 space-y-1 text-sm text-gray-200">
//                 {/* Add Sales sublinks here later if needed */}
//               </ul>
//             )}
//           </li>

//           <li>
//             <Link
//               to="/purchases"
//               className="flex items-center gap-3 py-2 px-3 rounded hover:bg-slate-800 focus:bg-slate-900 focus:text-green-500"
//             >
//               <IoBagRemoveOutline /> Purchases
//             </Link>
//           </li>

//           {/* Time Tracking Collapsible */}
//           <li>
//             <button
//               onClick={() => setOpenTracking(!openTracking)}
//               className="flex items-center justify-between w-full gap-3 p-2 mb-2 rounded hover:bg-slate-800 focus:bg-slate-900 focus:text-green-500"
//             >
//               <div className="flex items-center gap-3">
//                 <LuTimer /> Time Tracking
//               </div>
//               <IoMdArrowDropdown
//                 className={`transition-transform duration-300 ${
//                   openTracking ? "rotate-0" : "-rotate-90"
//                 }`}
//               />
//             </button>
//             {openTracking && (
//               <ul className="pl-4 space-y-1 text-sm text-gray-200">
//                 {/* Add Time Tracking sublinks here later if needed */}
//               </ul>
//             )}
//           </li>

//           <li>
//             <Link
//               to="/eway-bills"
//               className="flex items-center gap-3 py-2 px-3 rounded hover:bg-slate-800 focus:bg-slate-900 focus:text-green-500"
//             >
//               <TbBus /> E-Way Bills
//             </Link>
//           </li>

//           <li>
//             <Link
//               to="/gst-filing"
//               className="flex items-center gap-3 py-2 px-3 rounded hover:bg-slate-800 focus:bg-slate-900 focus:text-green-500"
//             >
//               <VscDebugStop /> GST Filing
//             </Link>
//           </li>
//         </ul>
//       </nav>

//       <Link>
//       <div className="mb-5 text-white text-xl font-bold flex justify-center items-center hover:bg-slate-900">
//         &lt;
//       </div>
      
//       </Link>
//     </div>
//   );
// }

// export default Sidebar;


















import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TiHomeOutline } from "react-icons/ti";
import { CiBank } from "react-icons/ci";
import { IoBagRemoveOutline } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import { LuTimer } from "react-icons/lu";
import { TbBus } from "react-icons/tb";
import { VscDebugStop } from "react-icons/vsc";



function Sidebar() {
  const [openItems, setOpenItems] = useState(false);
  const [openSale, setOpenSale] = useState(false);
  const [openTracking, setOpenTracking] = useState(false);

  const Hover =" flex w-[90px] p-1 m-2 pl-8 pr-24 rounded hover:bg-slate-700 focus:bg-green-700 focus:text-white  ";

  return (
    <div className="w-64 h-[560px] bg-slate-800 shadow-md flex flex-col fixed">
      <div className="p-4 text-white text-xl font-bold">Book</div>

     
  <nav className="p-2 text-white bg-slate-700 overflow-y-auto flex-1 scrollbar-thin  scrollbar-thumb-green-500 scrollbar-track-slate-900">

        <ul className="space-y-2">
          <li>
            <Link
              to="/"
              className="flex items-center gap-3 py-2 px-3 rounded hover:bg-slate-800 focus:bg-slate-900 focus:text-green-500"
            >
              <TiHomeOutline className=" focus:text-green-700" /> Home
            </Link>
          </li>

          <li>
  <button
    onClick={() => setOpenItems(!openItems)}
    className={`flex items-center justify-between w-full gap-3 p-2 mb-2 rounded hover:bg-slate-800 focus:bg-slate-900 focus:text-green-500 ${openItems ?"text-green-700 bg-slate-900":"text-white"}`}
  >
    <div className="flex items-center gap-3">
      <IoBagRemoveOutline className={` ${openItems ?"text-green-700 ":""}`} />
      Items
    </div>
    <IoMdArrowDropdown
      className={`transition-transform duration-300 ${ openItems ? "rotate-0 "  : "-rotate-90"}`}
    />
  </button>

  {openItems && (
    <ul className="pl-6 space-y-2 gap-2 text-sm text-gray-200">
      <li>
        <Link to="/Item" className={Hover}>
          Items
        </Link>
      </li>
      <li>
        <Link to="/price-lists" className={Hover}>
          Price Lists
        </Link>
      </li>
      <li>
        <Link
          to="/inventory-adjustments"
          className={Hover}
        >
          Inventory Adjustments
        </Link>
      </li>
    </ul>
  )}
</li>
    <li>
      <Link to="/User "
      className={Hover}
      >
      
      User
      </Link>
    </li>


          <li>
            <Link
              to="/banking"
              className="flex items-center gap-3 py-2 px-3 rounded hover:bg-slate-800 focus:bg-slate-900 focus:text-green-500"
            >
              <CiBank className=" focus:text-green-700 " /> Banking
            </Link>
          </li>

          <li>
            <button
              onClick={() => setOpenSale(!openSale)}
              className="flex items-center justify-between w-full gap-3 p-2 mb-2 rounded hover:bg-slate-800 focus:bg-slate-900 focus:text-green-500"
            >
              <div className="flex items-center gap-3">
                <IoBagRemoveOutline className="focus:text-green-700" />
                Sales
              </div>
              <IoMdArrowDropdown
                className={`transition-transform duration-300 ${
                  openSale ?  "rotate-0" : "-rotate-90"
                }`}
              />
            </button>

            {openSale && (
              <ul className="pl-4 space-y-1 text-sm text-gray-200">
               
              </ul>
            )}
          </li>

          <li>
            <Link
              to="/purchases"
              className="flex items-center gap-3 py-2 px-3 rounded hover:bg-slate-800 focus:bg-slate-900 focus:text-green-500"
            >
              <IoBagRemoveOutline className="focus:text-green-700" /> Purchases
            </Link>
          </li>

          <li>
            <button
              onClick={() => setOpenTracking(!openTracking)}
            className="flex items-center justify-between w-full gap-3 p-2 mb-2 rounded hover:bg-slate-800 focus:bg-slate-900 focus:text-green-500"
            >
                 <div className="flex items-center gap-3">
              <LuTimer className="focus:text-green"/>
                Time Tracking
              </div>



                
             
              <IoMdArrowDropdown
                className={`transition-transform duration-300 ${
                  openTracking ?  "rotate-0" : "-rotate-90"
                }`}
              />
            </button>

            {openTracking && (
              <ul className="pl-4 space-y-1 text-sm text-gray-200">
            
              </ul>
            )}
          </li>

          <li>
            <Link
              to="/eway-bills"
              className="flex items-center gap-3 py-2 px-3 rounded hover:bg-slate-800 focus:bg-slate-900 focus:text-green-500"
            >
                <TbBus />
              E-Way Bills
            </Link>
          </li>

          <li>
            <Link
              to="/gst-filing"
              className="flex items-center gap-3 py-2 px-3 rounded hover:bg-slate-800 focus:bg-slate-900 focus:text-green-500"
            >
                <VscDebugStop />
              GST Filing
            </Link>
          </li>
        </ul>
      </nav>

     
      <div className="p-1 pb-8 text-white text-xl font-bold flex justify-center items-center hover:bg-slate-900 ">
        &lt; 
      </div>
    </div>
  );
}

export default Sidebar;
