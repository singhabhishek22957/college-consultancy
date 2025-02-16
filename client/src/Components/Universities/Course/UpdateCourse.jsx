


// import React, { useEffect, useState, useCallback } from "react";
// import { searchUniversity } from "../../../Service/UniversityService";
// import { addCourse, getCourseByCourseId, getCourseByUniversityId } from "../../../Service/CourseService";
// import LoadingPopUp from "../../User/LoadingPopUp";
// import MessagePopUp from "../../MessagePopUp";
// import { useParams } from "react-router-dom";

// const UpdateCourse = () => {
//   const  {courseId} = useParams();
//   console.log("this is course id", courseId);
  
//   const [formData, setFormData] = useState({
//     courseName: "",
//     courseShortName: "",
//     courseFee: "",
//     eligibility: "",
//     brochureLink: "",
//     duration: "",
//     courseDescription: "",
//   });
//   const [errors, setErrors] = useState({});

  
 
//   const [isLoading, setIsLoading] = useState(false);
//   const [success, setSuccess] = useState({ success: false, message: "", badError: false });

 
    


//   useEffect(() => {
//     const fetchCourse = async () => {
//       if (!formData.universityId) return;

//       try {
//         const response = await getCourseByCourseId(courseId);
//         console.log("Course", response);
        
//         setFormData((prev) => ({
//           ...prev,
//           ...response.data.data.course,
//         }));
//       } catch (error) {
//         console.error("Error fetching course:", error);
//       }
//     };

//     fetchCourse();
//   });


//   const validateForm = () => {
//     const newErrors = {};
//     Object.keys(formData).forEach((key) => {
//       if (typeof formData[key] === "string" && !formData[key].trim() && key !== "brochureLink") {
//         newErrors[key] = "This field is required";
//       }
//       if (key === "duration" && (isNaN(formData[key]) || formData[key] === "")) {
//         newErrors[key] = "Duration must be a valid number";
//       }
//     });
//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const newErrors = validateForm();
//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     try {
//       setIsLoading(true);
//       const response = await addCourse(formData);
//       setSuccess({ success: true, message: response?.data?.data?.message, badError: false });
//     } catch (error) {
//       setSuccess({ success: false, message: error?.response?.data?.data?.message || "An error occurred", badError: true });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: name === "duration" ? (isNaN(value) || value.trim() === "" ? "" : Number(value)) : value,
//     }));
//   };

//   return (
//     <div className="max-w-4xl h-screen mx-auto p-6 bg-white shadow-md rounded-md">
//       <h2 className="text-2xl font-bold mb-4">Add Course</h2>
      
      

//       <form onSubmit={handleSubmit} className={`grid grid-cols-2 gap-4 `}>
//         {Object.keys(formData).map((key) => (
//           <div key={key} className={`col-span-1 ${key === "universityId" ? "hidden" : ""}`}>
//             {key === "universityName" ? (
//               <h2 className="block text-2xl font-medium capitalize">{formData[key]}</h2>
//             ) : (
//               <label className="block font-medium capitalize">
//                 {key.replace(/([A-Z])/g, " $1")} <span className="text-lg text-red-500">{key !== "brochureLink" ? " *" : ""}</span>
//                 {errors[key] && <p className="text-red-500">{errors[key]}</p>}
//               </label>
//             )}
//             <input
//               type="text"
//               name={key}
//               value={formData[key]}
//               onChange={handleChange}
//               className={`border border-gray-300 rounded-md p-2 w-full ${key === "universityName" ? "hidden" : ""}`}
//             />
//           </div>
//         ))}
//         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded col-span-2">Submit</button>
//       </form>
//       <LoadingPopUp isLoading={isLoading} />
//       <MessagePopUp isOpen={success.success} message={success.message} badError={success.badError} onClose={() => setSuccess({ success: false, message: "" })} />
//     </div>
//   );
// };

// export default UpdateCourse;


import React, { useEffect, useState } from "react";
import { getCourseByCourseId, updateCourse } from "../../../Service/CourseService";
import LoadingPopUp from "../../User/LoadingPopUp";
import MessagePopUp from "../../MessagePopUp";
import { useParams } from "react-router-dom";

const UpdateCourse = () => {
  const { courseId } = useParams();
  console.log("Course ID:", courseId);

  const [formData, setFormData] = useState({
    courseName: "",
    courseShortName: "",
    courseFee: "",
    eligibility: "",
    brochureLink: "",
    duration: "",
    courseDescription: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState({ success: false, message: "", badError: false });

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await getCourseByCourseId({
          courseId
        });
        console.log("Fetched Course:", response);
        const courseData = response.data.data.course;
        setFormData((prev) => ({
          ...prev,
          courseName:courseData.courseName,
          courseShortName: courseData.courseShortName,
          courseFee: courseData.courseFee,
          duration: courseData.duration,
          eligibility: courseData.eligibility,
          courseDescription: courseData.courseDescription,
          brochureLink:courseData.brochureLink,
        }));
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    if (courseId) fetchCourse();
  }, [courseId]);

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (typeof formData[key] === "string" && !formData[key].trim() && key !== "brochureLink") {
        newErrors[key] = "This field is required";
      }
      if (key === "duration" && isNaN(Number(formData[key]))) {
        newErrors[key] = "Duration must be a valid number";
      }
    });
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setIsLoading(true);
      const updateData = {
        courseId,
        formData
      }
      console.log("this data goes for update: ",updateData);
      
      const response = await updateCourse(updateData)
      console.log("update course data : ", response.data.data.course);
      
      setSuccess({ success: true, message: response?.data?.data?.message, badError: false });
    } catch (error) {
      setSuccess({ success: false, message: error?.response?.data?.data?.message || "An error occurred", badError: true });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "duration" ? (isNaN(value) || value.trim() === "" ? "" : Number(value)) : value,
    }));
  };

  return (
    <div className="max-w-4xl h-screen mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Update Course</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {Object.keys(formData).map((key) => (
          <div key={key} className={`col-span-1 ${key === "universityId" ? "hidden" : ""}`}>
            {key === "universityName" ? (
              <h2 className="block text-2xl font-medium capitalize">{formData[key]}</h2>
            ) : (
              <label className="block font-medium capitalize">
                {key.replace(/([A-Z])/g, " $1")}{" "}
                <span className="text-lg text-red-500">{key !== "brochureLink" ? " *" : ""}</span>
                {errors[key] && <p className="text-red-500">{errors[key]}</p>}
              </label>
            )}
            <input
              type="text"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className={`border border-gray-300 rounded-md p-2 w-full ${key === "universityName" ? "hidden" : ""}`}
            />
          </div>
        ))}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded col-span-2">Update</button>
      </form>
      
      <LoadingPopUp isLoading={isLoading} />
      <MessagePopUp 
        isOpen={success.success} 
        message={success.message} 
        badError={success.badError} 
        onClose={() => setSuccess({ success: false, message: "" })} 
      />
    </div>
  );
};

export default UpdateCourse;
