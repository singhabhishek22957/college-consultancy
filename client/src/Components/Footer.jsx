import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [course, setCourse] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission here, e.g., saving data to a database
    console.log({ email, mobile, course });
  };

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* News Letter Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4">Subscribe to our Newsletter</h3>
            <p>Get College Notifications, Exam Notifications, and News Updates</p>
            <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email id"
                className="px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter your mobile no"
                className="px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
              <select
                className="px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
              >
                <option value="">Choose your course</option>
                <option value="mba">M.B.A</option>
                <option value="btech">B.Tech/B.E</option>
                <option value="mca">MCA</option>
                <option value="bca">BCA</option>
                <option value="mtech">M.Tech</option>
                <option value="ma">MA</option>
                <option value="ba">BA</option>
              </select>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Footer Links Section */}
          <div>
            <h4 className="font-bold mb-2">Top Colleges</h4>
            <ul className="space-y-1">
              <li><a href="#mba" className="text-gray-400 hover:text-white">M.B.A</a></li>
              <li><a href="#btech" className="text-gray-400 hover:text-white">B.Tech/B.E</a></li>
              <li><a href="#mca" className="text-gray-400 hover:text-white">MCA</a></li>
              <li><a href="#bca" className="text-gray-400 hover:text-white">BCA</a></li>
              <li><a href="#mtech" className="text-gray-400 hover:text-white">M.Tech</a></li>
            </ul>
          </div>

          {/* Universities and Exams Section */}
          <div>
            <h4 className="font-bold mb-2">Top Universities</h4>
            <ul className="space-y-1">
              <li><a href="#engineering" className="text-gray-400 hover:text-white">Engineering</a></li>
              <li><a href="#management" className="text-gray-400 hover:text-white">Management</a></li>
              <li><a href="#medical" className="text-gray-400 hover:text-white">Medical</a></li>
              <li><a href="#law" className="text-gray-400 hover:text-white">Law</a></li>
            </ul>

            <h4 className="font-bold mb-2 mt-4">Top Exams</h4>
            <ul className="space-y-1">
              <li><a href="#cat" className="text-gray-400 hover:text-white">CAT</a></li>
              <li><a href="#gate" className="text-gray-400 hover:text-white">GATE</a></li>
              <li><a href="#jee" className="text-gray-400 hover:text-white">JEE-Main</a></li>
              <li><a href="#neet" className="text-gray-400 hover:text-white">NEET</a></li>
            </ul>


            <h4 className="font-bold mb-2 mt-4">Office Work</h4>
            <ul className="space-y-1">
              <li><Link to="/login" className="text-gray-400 hover:text-white">Login</Link></li>
               </ul>
          </div>

         
        </div>
      </div>
      <div className="mt-8 text-center text-gray-400 text-sm">
        <p>© 2025 Collegedunia Web Pvt. Ltd. All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
