
import React, { useEffect, useState, useCallback } from "react";
import { searchUniversity } from "../../../Service/UniversityService";
import { addCourse } from "../../../Service/CourseService";
import LoadingPopUp from "../../User/LoadingPopUp";
import MessagePopUp from "../../MessagePopUp";
import UniversitySearch from "../UniversitySearch";

const AddCourse = () => {
  const [formData, setFormData] = useState({
    universityId: "",
    universityName: "",
    courseName: "",
    courseShortName: "",
    courseFee: "",
    eligibility: "",
    brochureLink: "",
    duration: null,
    courseDescription: "",
  });
  const [errors, setErrors] = useState({});

  // search item
  
  const [isFormShow, setIsFormShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState({
    success: false,
    message: "",
    badError: false,
  });

 
  

  // Handle university selection
  const handleSearchDataFetch = (uni) => {
    
    setFormData({
      ...formData,
      universityId: uni._id,
      universityName: uni.name,
    });
    setIsFormShow(true);
  };

  const requiredFields = [
    "courseName",
    "courseShortName",
    "courseFee",
    "eligibility",
    "duration",
    "courseDescription",
  ];

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    requiredFields.forEach((field) => {
      if (typeof formData[field] === "string" && !formData[field].trim()) {
        newErrors[field] = "This field is required";
      }
      if (
        field === "duration" &&
        (isNaN(formData[field]) || formData[field] === "")
      ) {
        newErrors[field] = "Duration must be a valid number";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setIsLoading(true);
      const response = await addCourse(formData);
      setSuccess((prev) => ({
        ...prev,
        success: true,
        message: response.data.data.message,
        badError: false,
      }))

      setIsLoading(false);
      console.log("response", response);
      // Handle success, maybe show a success message
    } catch (error) {
      console.log(error);
      // Handle error, maybe show an error message

      if(error.response.data.data.statusCode === 400){
        setSuccess((prev) => ({
          ...prev,
          success: false,
          message: error.response.data.data.message,
          badError: true,
        }))
      }
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Prevent dropdown from closing when clicking inside
  const handleDropdownClick = (e) => {
    e.stopPropagation(); // Prevent blur from closing dropdown
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Add Course</h2>
     

      <UniversitySearch onSelect={handleSearchDataFetch} />

      <form
        onSubmit={handleSubmit}
        className={`grid grid-cols-2 gap-4 ${isFormShow ? "" : "hidden"}`}
      >
        {Object.keys(formData).map((key) => (
          <div
            key={key}
            className={`col-span-1 ${key === "universityId" ? "hidden" : ""}`}
          >
            {key === "universityName" ? (
              <h2 className="block text-2xl font-medium capitalize">
                {formData[key]}
              </h2>
            ) : (
              <label className="block font-medium capitalize">
                {key.replace(/([A-Z])/g, " $1")}
                {requiredFields.includes(key) && (
                  <span className="text-lg text-red-500"> *</span>
                )}
                {errors[key] && <p className="text-red-500">{errors[key]}</p>}
              </label>
            )}

            {/* {key === "courseDescription" ? (
              <textarea
                id={`input-${key}`} // Add unique id
                className="border border-gray-300 rounded-md p-2 w-full"
                value={formData[key]}
                onChange={handleChange}
                rows="4"
                cols="50"
              />
            ) : ( */}
              <input
                id={`input-${key}`} // Add unique id
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className={`border border-gray-300 rounded-md p-2 w-full ${
                  key === "universityName" ? "hidden" : ""
                }`}
              />
            {/* )} */}
          </div>
        ))}

        <div className="col-span-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
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

export default AddCourse;
