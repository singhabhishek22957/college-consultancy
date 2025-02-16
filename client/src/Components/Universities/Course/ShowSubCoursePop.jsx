// import React, { useEffect, useState } from "react";
// import ShowFee from "./ShowFee";
// import { useNavigate } from "react-router-dom";

// const ShowSubCoursePop = ({ isOpen, course, courseId,onClose }) => {
//   if (!isOpen) return null;

//   console.log("course id Hello: ",course);
//   console.log("course sub course id Hello: ",course.subCourse);
  

//   // const [courseId, setCourseId] = useState(null);

//   const [subCourses, setSubCourses] = useState([]);
//   const [showFeePop, setShowFeePop] = useState({
//     isOpen: false,
//     subCourse: {},
//   });
//   const navigate = useNavigate();

//   const handleShowFeePop = (subCourse) => {
//     setShowFeePop({ isOpen: true, 
//      subCourse: subCourse
//      });
//   };

  


//   useEffect(() => {
//     // setCourseId(course._id);
//     console.log("course", courseId);
    
//     if (!Array.isArray(course.subCourse) || course.subCourse.length === 0) {
//       console.warn("⚠️ No valid courses received!");
//       setSubCourses([]); // Reset if no valid data
//       return;
//     }

//     // Extract subCourse (correcting the key name)
//     const extractedSubCourses = course.subCourse.flatMap((c) => c.subCourse || []);
//     setSubCourses(extractedSubCourses);

//     console.log("✅ Extracted SubCourses:", extractedSubCourses);
//   }, [course.subCourse]);

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-15 backdrop-blur-md z-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-11/12  relative">
//         {/* Close Button */}
//         <button
//           className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
//           onClick={onClose}
//         >
//           ✖
//         </button>

//         <h2 className="text-xl font-bold mb-4 text-center">Sub Courses List</h2>

//         {subCourses.length === 0 ? (
//           <p className="text-red-500 text-center">No sub-courses available.</p>
//         ) : (
//           <table className="w-full border text-lg text-left">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="py-2 px-4 border-b">Name</th>
//                 <th className="py-2 px-4 border-b">Short Name</th>
//                 <th className="py-2 px-4 border-b">Description</th>
//                 <th className="py-2 px-4 border-b">Eligibility</th>
//                 <th className="py-2 px-4 border-b">Duration</th>
//                 <th className="py-2 px-4 border-b">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {subCourses.map((subCourse, index) => (
//                 <tr key={subCourse._id || index} className="hover:bg-gray-50">
//                   <td className="py-2 px-4 border-b">{subCourse.name || "N/A"}</td>
//                   <td className="py-2 px-4 border-b">{subCourse.shortName || "N/A"}</td>
//                   <td className="py-2 px-4 border-b">{subCourse.description || "N/A"}</td>
//                   <td className="py-2 px-4 border-b">{subCourse.eligibility || "N/A"}</td>
//                   <td className="py-2 px-4 border-b">{subCourse.duration || "N/A"}</td>
//                   <td className="py-2 px-4 border-b flex gap-2">
//                     <button
//                     onClick={() => navigate(`/edit-subCourse/${courseId}`)}
//                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
//                       Edit
//                     </button>
//                     <button 
//                      onClick={() => handleShowFeePop(subCourse)}
//                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">
//                       Show Fee
//                     </button>
//                     <button 
//                      onClick={() => handleShowFeePop(subCourse)}
//                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//       <ShowFee
//         isOpen={showFeePop.isOpen}
//         subCourse={showFeePop.subCourse}
//         onClose={onClose}
//       />
//     </div>
//   );
// };

// export default ShowSubCoursePop;


import React, { useEffect, useState } from "react";
import ShowFee from "./ShowFee";
import { useNavigate } from "react-router-dom";

const ShowSubCoursePop = ({ isOpen, course, onClose }) => {
  if (!isOpen) return null;

  const [subCourses, setSubCourses] = useState([]);
  const [showFeePop, setShowFeePop] = useState({
    isOpen: false,
    subCourse: {},
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!course || !Array.isArray(course.subCourse)) {
      console.warn("⚠️ No valid sub-courses received!");
      setSubCourses([]);
      return;
    }
    setSubCourses(course.subCourse);
  }, [course]);

  const handleShowFeePop = (subCourse) => {
    setShowFeePop({
      isOpen: true,
      subCourse,
    });
  };

  const handleDeleteSubCourse = (subCourseId) => {
    console.log(`Deleting sub-course with ID: ${subCourseId}`);
    // Implement delete logic here
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-15 backdrop-blur-md z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 relative">
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          ✖
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">Sub Courses List</h2>

        {subCourses.length === 0 ? (
          <p className="text-red-500 text-center">No sub-courses available.</p>
        ) : (
          <table className="w-full border text-lg text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Short Name</th>
                <th className="py-2 px-4 border-b">Description</th>
                <th className="py-2 px-4 border-b">Eligibility</th>
                <th className="py-2 px-4 border-b">Duration</th>
                <th className="py-2 px-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {subCourses.map((subCourse) => (
                <tr key={subCourse._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{subCourse.name || "N/A"}</td>
                  <td className="py-2 px-4 border-b">{subCourse.shortName || "N/A"}</td>
                  <td className="py-2 px-4 border-b">{subCourse.description || "N/A"}</td>
                  <td className="py-2 px-4 border-b">{subCourse.eligibility || "N/A"}</td>
                  <td className="py-2 px-4 border-b">{subCourse.duration || "N/A"}</td>
                  {/* <td className="py-2 px-4 border-b">{subCourse._id || "N/A"}</td> */}
                  <td className="py-2 px-4 border-b flex gap-2">
                    <button
                      onClick={() => navigate(`/edit-subCourse/${course._id}/${subCourse._id}`)}
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleShowFeePop(subCourse)}
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                    >
                      Show Fee
                    </button>
                    <button
                      onClick={() => handleDeleteSubCourse(subCourse._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <ShowFee isOpen={showFeePop.isOpen} subCourse={showFeePop.subCourse} onClose={onClose} />
    </div>
  );
};

export default ShowSubCoursePop;
