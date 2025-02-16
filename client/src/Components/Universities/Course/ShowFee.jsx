import React, { useEffect, useState } from "react";

const ShowFee = ({ isOpen, subCourse, onClose }) => {
  if (!isOpen) return null;

  const [fees, setFees] = useState([]);

  useEffect(() => {
    if (!subCourse || !subCourse.fees || subCourse.fees.length === 0) {
      console.warn("⚠️ No valid fee data received!");
      setFees([]); // Reset if no valid data
      return;
    }

    setFees(subCourse.fees); // Assuming fees is already an array of fee objects
    console.log("✅ Extracted Fees:", subCourse.fees);
  }, [subCourse]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-15 backdrop-blur-md z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-4xl relative">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          ✖
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">Fee Details</h2>

        {fees.length === 0 ? (
          <p className="text-red-500 text-center">No fee details available.</p>
        ) : (
          <table className="w-full border text-lg text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">Semester</th>
                <th className="py-2 px-4 border-b">Fee</th>
                {/* <th className="py-2 px-4 border-b">Action</th> */}
              </tr>
            </thead>
            <tbody>
              {fees.map((fee, index) => (
                <tr key={fee._id || index} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{fee.semester || "N/A"}</td>
                  <td className="py-2 px-4 border-b">{fee.fee || "N/A"}</td>
                  {/* <td className="py-2 px-4 border-b">
                    <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
                      Edit
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ShowFee;
