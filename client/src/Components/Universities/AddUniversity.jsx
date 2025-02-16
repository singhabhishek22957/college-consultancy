import React, { useEffect, useState } from "react";
import { adminLogin } from "../../Service/AdminService";
import { registerUniversity } from "../../Service/UniversityService";
import LoadingPopUp from "../User/LoadingPopUp";
import MessagePopUp from "../MessagePopUp";

const AddUniversity = () => {
  const [formData, setFormData] = useState({
    name: "",
    logoImage: null,
    coverImage: null,
    type: "private",
    established: "",
    approvedBy: "",
    setBy: "",
    entranceExam: "",
    naacGrade: "",
    reviews: "",
    courseOffered: "",
    applicationMode: "online",
    admissionCriteria: "",
    topRecruiters: "",
    facilities: "",
    campusArea: "",
    officialWebsite: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState({
    success: false,
    message: "",
    badError: true,
  });

  const requiredFields = [
    "name",
    "established",
    "type",
    "logoImage",
    "applicationMode",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // clear error message when user starts typing

    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    // check for required fields

    let newErrors = {};
    requiredFields.forEach((field) => {
      if (typeof formData[field] === "string" && !formData[field].trim()) {
        newErrors[field] = "This field is required";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // send data to server

    try {
      setLoading(true);
      const response = await registerUniversity({
        ...formData,
        logoImage: formData.logoImage,
        coverImage: formData.coverImage,
      });

      console.log("response", response);
        setSuccess((prev) => ({
            ...prev,
            success: true,
            message: response.data.data.message,
            badError: false,
            }));

      setLoading(false);
    } catch (error) {
      // if(error.response.data.data.success === false){
      setSuccess((prev) => ({
        ...prev,
        success: true,
        message: error.response.data.data.message,
      }));

      if (error.response.data.data.statusCode === 400) {
        setSuccess((prev) => ({
          ...prev,
          badError: true,
        }));
      }

      setLoading(false);

      console.log("Error to add university: ", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Add University</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {Object.keys(formData).map((key) => (
          <div key={key} className=" col-span-1">
            <label className=" block font-medium capitalize ">
              {key.replace(/([A-Z])/g, " $1")}
              {requiredFields.includes(key) && (
                <span className=" text-lg text-red-500"> *</span>
              )}
              {errors[key] && <p className="text-red-500">{errors[key]}</p>}
            </label>
            {key === "type" || key === "applicationMode" ? (
              <select
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 w-full"
              >
                {key === "type" && (
                  <>
                    <option value="private">private</option>
                    <option value="government">government</option>
                  </>
                )}
                {key === "applicationMode" && (
                  <>
                    <option value="online">online</option>
                    <option value="offline">offline</option>
                    <option value="online and offline">
                      online and offline
                    </option>
                  </>
                )}
              </select>
            ) : key === "logoImage" || key === "coverImage" ? (
              <input
                type="file"
                accept="image/*"
                name={key}
                onChange={handleFileChange}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            ) : (
              <input
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            )}
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
      <LoadingPopUp isLoading={loading} />
      <MessagePopUp
        isOpen={success.success}
        message={success.message}
        badError={success.badError}
        onClose={() => setSuccess({ success: false, message: "" })}
      />
    </div>
  );
};

export default AddUniversity;
