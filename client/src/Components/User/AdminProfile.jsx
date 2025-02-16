import React from "react";

const AdminProfile = () => {
  const admin = {
    name: "John Doe",
    email: "admin@example.com",
    role: "Super Admin",
    joined: "Jan 15, 2023",
    profilePic: "https://via.placeholder.com/150",
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center space-x-6">
          <img
            src={admin.profilePic}
            alt="Admin Profile"
            className="w-24 h-24 rounded-full border-4 border-blue-500"
          />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">{admin.name}</h2>
            <p className="text-gray-600">{admin.email}</p>
            <p className="text-gray-500 text-sm">Role: {admin.role}</p>
            <p className="text-gray-500 text-sm">Joined: {admin.joined}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Edit Profile
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
