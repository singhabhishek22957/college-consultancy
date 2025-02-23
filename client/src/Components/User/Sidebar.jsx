


import React, { useRef,useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faBars, faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  
  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const menuItems = [
    { name: "University", color: "blue", items: ["Add University", "Show Universities", "Update University"] },
    { name: "Admin", color: "green", items: ["Add Admin", "Edit Admin", "Show Admin"] },
    { name: "Course", color: "yellow", items: ["Add Course" , "Course List"] },
    { name: "Student", color: "red", items: ["Add Student", "Edit Student", "Student List"] },
    { name: "Admission", color: "pink", items: ["Add Admission",  "Show Admission","Add Admission-Course","Update Admission-Course","Show Admission-Course"] },
    { name: "Others", color: "gray", items: ["Archive University", "Edit Student", "Student List"] },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };


  
  

  return (
    <>
      {/* Sidebar Toggle Button */}
      <div onClick={()=> (setIsOpen(true))} className="relative group ">
        <button
          onClick={toggleSidebar}
          className={`fixed top-4 left-4 z-50 p-2 text-white rounded-md ${isOpen ? "hidden" : ""}`}
        >
          <FontAwesomeIcon className="text-4xl" icon={faBars} />
        </button>
        <div className="absolute left-1 bg-slate-400 p-1 text-black rounded-md opacity-0 group-hover:opacity-100 transition-all">
          Menu
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-80 h-full z-50 bg-gray-800 text-white transform transition-all duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between p-4">
          <h2 className="text-4xl font-semibold">
            <span className="font-bold">Dash</span>board
          </h2>
          <button onClick={toggleSidebar}>
            <FontAwesomeIcon className="text-2xl" icon={faXmark} />
          </button>
        </div>

        <ul>
          {menuItems.map(({ name, items }) => (
            <li key={name}>
              <button
                onClick={() => toggleDropdown(name)}
                className="flex justify-between w-full py-4 px-6 hover:bg-gray-700 focus:outline-none"
                aria-expanded={openDropdown === name}
              >
                <span>{name}</span>
                <FontAwesomeIcon icon={openDropdown === name ? faAngleUp : faAngleDown} />
              </button>

              {/* Dropdown Items */}
              {openDropdown === name && (
                <div className="ml-6 mt-1 space-y-1 bg-gray-700 rounded-md">
                  {items.map((item) => (
                    <Link
                      key={item}
                      onClick={() => setIsOpen(false)}
                      to={`/${item.toLowerCase().replace(" ", "-")}`}
                      className="block text-white hover:bg-gray-600 px-4 py-2 rounded"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
