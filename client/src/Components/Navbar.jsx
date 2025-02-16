import React, { useEffect, useRef, useState } from "react";
import { adminLogin, getUsers, logoutUser } from "../Service/AdminService";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "./Context/AdminContext";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null); // Ref for the dropdown menu
  const {user, fetchUser} = useUser();

  const menuItems= [
    {name:"Admin Panel", link:"/admin"},
    {name:"Profile", link:"/profile"},
    {name:"Settings", link:"/settings"},
    {name:"Logout", link:"/logout"}

  ];

  // ✅ Close Dropdown on Click Outside or Inside
  const handleClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      // Clicked outside
      setDropdownOpen(false);
    } 
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);



  // ✅ Fetch User Avatar
  // useEffect(() => {
  //   fetchUser();
   
  //   console.log("avatar url",user.avatarUrl);
    
    
  // },[]);

  // ✅ Handle Logout
  const handleLogout = async () => {
    try {
      await logoutUser();
      // await fetchUser();
      
      window.location.reload();
      navigate("/");
      
      console.log("Logout successful"); 
      setDropdownOpen(false);
    } catch (error) {
      console.log("Error during logout:", error);
    }
  };

  return (
    <nav className="bg-gray-800  text-white p-4 shadow-md">
      <div className="container  mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="text-2xl font-bold cursor-pointer">
          <Link to="/">Logo</Link>
        </div>

        {/* Center Navigation Links */}
        <ul className="hidden md:flex space-x-6">
          {menuItems.map((item)=>(
            <li key={item.name}>
              <Link onClick={()=> setDropdownOpen(false)} to={item.link} className="hover:text-gray-300">{item.name}</Link>
            </li>
          ))}
          
        </ul>

        {/* Profile Section */}
        {user?.avatarUrl && (
          <div className="flex items-center gap-2">
            <div>
              <h4>{user.fullName}</h4>
            </div>
   <div className="relative" ref={dropdownRef}>
            <img
              src={user.avatarUrl}
              alt="Profile"
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg py-2 z-50">
                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200">Profile</Link>
                <Link to="/admin" className="block px-4 py-2 hover:bg-gray-200">Admin Panel</Link>
                <Link to="/settings" className="block px-4 py-2 hover:bg-gray-200">Settings</Link>
                <hr />
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 hover:bg-gray-200 w-full text-left"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
          </div>
       
        )}
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden mt-4">
        <ul className="space-y-2">
          <li><Link to="/" className="block hover:text-gray-300">Home</Link></li>
          <li><Link to="/about" className="block hover:text-gray-300">About</Link></li>
          <li><Link to="/services" className="block hover:text-gray-300">Services</Link></li>
          <li><Link to="/contact" className="block hover:text-gray-300">Contact</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
