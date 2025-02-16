import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../Components/Navbar.jsx';
import AdminLogin from '../Components/AdminLogin.jsx';
import Footer from '../Components/Footer.jsx';
import Sidebar from '../Components/User/Sidebar.jsx';
import { useUser } from '../Components/Context/AdminContext.jsx';

const Layout = () => {
    const location = useLocation();
    const sidebarShow = ['/admin'].includes(location.pathname);
    const { user } = useUser();
    return (
        <main className="relative min-h-screen">
        {/* Navbar */}
        <Navbar />
  
        {/* Conditionally render Sidebar based on the route */}
        {user?.avatarUrl && <Sidebar />}
  
        {/* Main content area with some padding to avoid overlap with the navbar and sidebar */}
        <div className={`transition-all ${sidebarShow ? 'ml-64' : ''} pt-20`}>
          <Outlet />
        </div>
  
        {/* Footer */}
        <Footer />
      </main>
    );
}

export default Layout;
