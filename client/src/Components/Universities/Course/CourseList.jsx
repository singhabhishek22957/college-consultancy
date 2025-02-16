


import React, { useCallback, useEffect, useState } from "react";
import { searchUniversity } from "../../../Service/UniversityService";
import { deleteCourse, getCourseByUniversityId } from "../../../Service/CourseService";
import MessagePopUp from "../../MessagePopUp";
import { useNavigate } from "react-router-dom";
import ShowSubCoursePop from "./ShowSubCoursePop";
import UniversitySearch from "../UniversitySearch";


const CourseList = () => {
  // search University
  const [universityData, setUniversityData] = useState({
    universityId: "",
    universityName: "",
  });
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState([]);
 

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState({
    success: false,
    message: "",
    badError: false,
  });
  const [showSubCoursePop, setShowSubCoursePop] = useState({
    course:{},
    isOpen: false,
    courseId: '',

  });

  // delete course 
  
  const deleteCourseHandle = async (courseId) => {
    console.log("Deleting course ID:", courseId);
    try {
      setIsLoading(true);
      const response = await deleteCourse(courseId);
      setIsLoading(false);
  
      if (response.status === 200) {
        setSuccess({
          success: true,
          message: response.data.data.message,
          badError: false,
        });
        // Refresh course list
        setCourseData((prev) => prev.filter(course => course._id !== courseId));
      }
    } catch (error) {
      setIsLoading(false);
      setSuccess({
        success: false,
        message: error.response?.data?.message || "An error occurred",
        badError: true,
      });
    }
  };
  

 

  const handleSearchDataFetch = (university) => {
    setUniversityData({
      universityId: university._id,
      universityName: university.name,
    });
  };

  const handleDropdownClick = (e) => {
    e.stopPropagation(); // Prevent blur from closing dropdown
  };

  // Fetch courses when universityId changes
  useEffect(() => {
    if (!universityData.universityId) return;

    const fetchCourse = async () => {
      setIsLoading(true);
      try {
        const response = await getCourseByUniversityId({
          universityId: universityData.universityId,
        });
        setCourseData(response.data.data.course);
        console.log(response.data.data.course);
        console.log(courseData);
        
        
      } catch (error) {
        console.error(error);
        setSuccess({
          success: false,
          message: error.response?.data?.message || "An error occurred",
          badError: true,
        });
        setCourseData([]);
      }
      setIsLoading(false);
    };

    fetchCourse();
  }, [universityData.universityId]); // ✅ Only trigger when `universityId` changes

  // Handle archive & restore actions
  const addSubCourse = (course) => {
    navigate(`/add-sub-course/${course._id}`);
  };
  const editSubCourse = (course) => {
    navigate(`/update-course/${course._id}`);
  };

  const ShowSubCourse = (course) => {
    setShowSubCoursePop({
      course: course,
      isOpen: true,
      courseId: course._id,
    })
    console.log("this is course", courseData);
    
    // Implement restore logic here
  };

  return (
    <div className="w-full h-screen mx-auto p-6 bg-white shadow-md rounded-md">
        <h2 className="text-3xl capitalize font-bold mb-6 text-center">{universityData.universityName} Courses List</h2>


      <UniversitySearch onSelect={handleSearchDataFetch} />

      {/* Course List Table */}
      <table className="min-w-full bg-white border text-start text-lg overflow-hidden border-gray-300 mt-4">
        <thead className="text-start text-lg">
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-start border-b">Name</th>
            <th className="py-2 px-4 text-start border-b">Short Name</th>
            <th className="py-2 px-4 text-start border-b">Fee</th>
            <th className="py-2 px-4 text-start border-b">Description</th>
            <th className="py-2 px-4 text-start border-b">Eligibility</th>
            <th className="py-2 px-4 text-start border-b">Duration</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courseData.map((course) => (
            <tr key={course._id} className="hover:bg-gray-50">
              <td className="py-2 font-medium capitalize px-4 border-b">
                {course.courseName || "N/A"}
              </td>
              <td className="py-2 capitalize px-4 border-b">
                {course.courseShortName || "N/A"}
              </td>
              <td className="py-2 capitalize px-4 border-b">
                {course.courseFee || "N/A"}
              </td>
              <td className="py-2 capitalize px-4 border-b">
                {course.courseDescription || "N/A"}
              </td>
              <td className="py-2 uppercase px-4 border-b">
                {course.eligibility || "N/A"}
              </td>
              <td className="py-2 capitalize px-4 border-b">
                {course.duration || "N/A"}
              </td>
              <td className="py-2 px-4 border-b text-start">
                <div className="flex justify-around">
                  <div>
                  
                  <button
                    onClick={() => deleteCourseHandle(course._id)}
                    className="m-1 px-4 py-1 text-white bg-red-500 rounded-md hover:bg-red-900"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => editSubCourse(course)}
                    className="m-1 px-4 py-1 text-white bg-green-500 rounded-md hover:bg-red-900"
                  >
                    Update Course
                  </button>
                  </div>
                  <div>
                  <button
                    onClick={() => addSubCourse(course)}
                    className="m-1 px-4 py-1 text-white bg-green-500 rounded-md hover:bg-red-900"
                  >
                    Add Sub Course
                  </button>
                  <button
                    onClick={()=>ShowSubCourse(course)}
                    className="m-1 px-4 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-900"
                  >
                    Sub Course
                  </button>
                  </div>
                  
                 
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ShowSubCoursePop
        isOpen={showSubCoursePop.isOpen}
        course= {showSubCoursePop.course}
        courseId={showSubCoursePop.courseId}
        onClose={() => setShowSubCoursePop(false)}
      />
      <MessagePopUp
        isOpen={success.isOpen}
        message={success.message}
        onClose={() => setSuccess({ success: false, message: "", badError: false })}
        badError={success.badError}
      />
    </div>
  );
};

export default CourseList;






















// import React, { useCallback, useEffect, useState } from "react";
// import { searchUniversity } from "../../../Service/UniversityService";
// import { getCourseByUniversityId } from "../../../Service/CourseService";
// import { useNavigate } from "react-router-dom";
// import ShowSubCoursePop from "./ShowSubCoursePop";

// const CourseList = () => {
//   // Get stored university data if available
//   const storedUniversity = JSON.parse(localStorage.getItem("universityData")) || {
//     universityId: "",
//     universityName: "",
//   };
//   const storedCourses = JSON.parse(localStorage.getItem("courseData")) || [];

//   const [universityData, setUniversityData] = useState(storedUniversity);
//   const [courseData, setCourseData] = useState(storedCourses);
//   const [searchItem, setSearchItem] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [isFormShow, setIsFormShow] = useState(!!storedUniversity.universityId);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();
//   const [showSubCoursePop, setShowSubCoursePop] = useState({
//     course: {},
//     isOpen: false,
//     courseId: "",
//   });

//   // Fetch university suggestions
//   const fetchSuggestions = useCallback(async () => {
//     if (!searchItem.trim()) return;

//     try {
//       const response = await searchUniversity({ searchItem });
//       setSuggestions(response.data.data.universities);
//       setShowDropdown(true);
//     } catch (error) {
//       console.error(error);
//     }
//   }, [searchItem]);

//   useEffect(() => {
//     const delayDebounce = setTimeout(fetchSuggestions, 300); // Debounce input
//     return () => clearTimeout(delayDebounce);
//   }, [fetchSuggestions]);

//   const handleSearchDataFetch = (university) => {
//     setShowDropdown(false);
//     setIsFormShow(true);
//     setUniversityData({
//       universityId: university._id,
//       universityName: university.name,
//     });
//     localStorage.setItem("universityData", JSON.stringify({
//       universityId: university._id,
//       universityName: university.name,
//     }));
//   };

//   // Fetch courses when universityId changes
//   useEffect(() => {
//     if (!universityData.universityId) return;

//     const fetchCourse = async () => {
//       setIsLoading(true);
//       try {
//         const response = await getCourseByUniversityId({
//           universityId: universityData.universityId,
//         });
//         setCourseData(response.data.data.course);
//         localStorage.setItem("courseData", JSON.stringify(response.data.data.course));
//       } catch (error) {
//         console.error(error);
//         setCourseData([]);
//       }
//       setIsLoading(false);
//     };

//     fetchCourse();
//   }, [universityData.universityId]);

//   const ShowSubCourse = (course) => {
//     setShowSubCoursePop({
//       course: course,
//       isOpen: true,
//       courseId: course._id,
//     });
//   };

//   return (
//     <div className="w-full h-screen mx-auto p-6 bg-white shadow-md rounded-md">
//       <h2 className="text-3xl capitalize font-bold mb-6 text-center">
//         {universityData.universityName} Courses List
//       </h2>

//       <div className="flex">
//         <div className="relative w-[400px]">
//           <input
//             type="text"
//             placeholder="Search for universities..."
//             value={isFormShow ? universityData.universityName : searchItem}
//             onChange={(e) => setSearchItem(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded-lg"
//           />

//           {showDropdown && suggestions.length > 0 && (
//             <ul className="absolute top-10 mt-1 w-full bg-white border border-gray-300 rounded-lg list-none p-2 shadow-md">
//               {suggestions.map((uni) => (
//                 <li
//                   key={uni._id}
//                   onClick={() => handleSearchDataFetch(uni)}
//                   className="p-2 cursor-pointer font-medium text-lg capitalize hover:bg-gray-100"
//                 >
//                   {uni.name}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>

//       {/* Course List Table */}
//       <table className="min-w-full bg-white border text-start text-lg overflow-hidden border-gray-300 mt-4">
//         <thead className="text-start text-lg">
//           <tr className="bg-gray-100">
//             <th className="py-2 px-4 text-start border-b">Name</th>
//             <th className="py-2 px-4 text-start border-b">Short Name</th>
//             <th className="py-2 px-4 text-start border-b">Fee</th>
//             <th className="py-2 px-4 text-start border-b">Description</th>
//             <th className="py-2 px-4 text-start border-b">Eligibility</th>
//             <th className="py-2 px-4 text-start border-b">Duration</th>
//             <th className="py-2 px-4 border-b">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {courseData.map((course) => (
//             <tr key={course._id} className="hover:bg-gray-50">
//               <td className="py-2 font-medium capitalize px-4 border-b">
//                 {course.courseName || "N/A"}
//               </td>
//               <td className="py-2 capitalize px-4 border-b">
//                 {course.courseShortName || "N/A"}
//               </td>
//               <td className="py-2 capitalize px-4 border-b">
//                 {course.courseFee || "N/A"}
//               </td>
//               <td className="py-2 capitalize px-4 border-b">
//                 {course.courseDescription || "N/A"}
//               </td>
//               <td className="py-2 uppercase px-4 border-b">
//                 {course.eligibility || "N/A"}
//               </td>
//               <td className="py-2 capitalize px-4 border-b">
//                 {course.duration || "N/A"}
//               </td>
//               <td className="py-2 px-4 border-b text-start">
//                 <button
//                   onClick={() => ShowSubCourse(course)}
//                   className="m-1 px-4 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-900"
//                 >
//                   Sub Course
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <ShowSubCoursePop
//         isOpen={showSubCoursePop.isOpen}
//         course={showSubCoursePop.course}
//         courseId={showSubCoursePop.courseId}
//         onClose={() => setShowSubCoursePop(false)}
//       />
//     </div>
//   );
// };

// export default CourseList;

