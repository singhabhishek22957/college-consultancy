import React, { useEffect, useState } from "react";
import MessagePopUp from "../../MessagePopUp";
import LoadingPopUp from "../../User/LoadingPopUp";
import UniversitySearch from "../UniversitySearch";
import { addAdmission, getAdmission, updateAdmission } from "../../../Service/AdmissionService";
import { useParams } from "react-router-dom";
const UpdateAdmission = () => {
  const { universityId, year } = useParams();
  const [universityName, setUniversityName] = useState("");
  const [isFormShow, setIsFormShow] = useState(false);
  const [formData, setFormData] = useState({
    universityId: "",
    year: "",
    universityIntro: "",
    universityKeyPoints: [""], // Array of strings
    basicAdmissionCriteria: "",
    entranceMode: "online",
    counsellingMode: "online",
    scholarships: "yes",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState({
    success: false,
    message: "",
    badError: true,
  });

  const requiredFields = ["universityId", "year", "universityIntro"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  useEffect(() => {
    const fetchAdmission = async () => {
      const response = await getAdmission({
        universityId: universityId,
        year: year,
      });

      setFormData(response.data.data.admission[0]);
      setUniversityName(response.data.data.university.name);
      console.log("admission", response);
      setIsFormShow(true);
    //   setFormData({
    //     ...formData,
    //     universityId: uni._id,
    //     year: uni.year,
    //   });
    };

    fetchAdmission();
  }, []);

  // handle search item
  //   const handleSearchDataFetch = (uni) => {
  //     // setUniversityData({
  //     //     ...universityData,
  //     //     universityId: uni.universityId,
  //     //     universityName: uni.universityName
  //     // })

  //     console.log("univeristy", uni);

  //     setFormData({
  //       ...formData,
  //       universityId: uni._id,
  //     });

  //     setIsFormShow(true);
  //   };

  const handleKeyPointsChange = (index, value) => {
    const updatedKeyPoints = [...formData.universityKeyPoints];
    updatedKeyPoints[index] = value;
    setFormData({ ...formData, universityKeyPoints: updatedKeyPoints });
  };

  const addKeyPoint = () => {
    setFormData({
      ...formData,
      universityKeyPoints: [...formData.universityKeyPoints, ""],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Hello form data : ", formData);

    let newErrors = {};
    requiredFields.forEach((field) => {
      if (
        !formData[field] &&
        (typeof formData[field] !== "string" || !formData[field].trim())
      ) {
        newErrors[field] = "This field is required";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      // Send formData to API (ensure to implement registerUniversity)
      const response = await updateAdmission({
        ...formData,
      });
      console.log("response", response);

      setSuccess({
        success: true,
        message: response.data.data.message,
        badError: false,
      });
      setLoading(false);
    } catch (error) {
      setSuccess({
        success: true,
        message: error.response?.data?.data?.message || "An error occurred.",
        badError: error.response?.data?.data?.statusCode === 400,
      });
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold capitalize mb-4">Edit <span className="text-blue-800">{universityName}</span> Admission Details</h2>

      {/* search university */}
      {/* <UniversitySearch onSelect={handleSearchDataFetch}/> */}
      <form
        onSubmit={handleSubmit}
        className={`grid grid-cols-2 gap-4 ${isFormShow ? "" : "hidden"}`}
      >
        {/* University ID */}
        {/* <div className="col-span-1">
          <label className="block font-medium">University ID *</label>
          <input type="text" name="universityId" value={formData.universityId} onChange={handleChange} className="border border-gray-300 rounded-md p-2 w-full" />
          {errors.universityId && <p className="text-red-500">{errors.universityId}</p>}
        </div> */}

        {/* Year */}
        <div className="col-span-1">
          <label className="block font-medium">Year *</label>
          <input
            type="text"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
          {errors.year && <p className="text-red-500">{errors.year}</p>}
        </div>

        {/* University Introduction */}
        <div className="col-span-2">
          <label className="block font-medium">University Introduction *</label>
          <textarea
            name="universityIntro"
            value={formData.universityIntro}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full h-28"
          ></textarea>
          {errors.universityIntro && (
            <p className="text-red-500">{errors.universityIntro}</p>
          )}
        </div>

        {/* University Key Points */}
        <div className="col-span-2">
          <label className="block font-medium">University Key Points</label>
          {formData.universityKeyPoints.map((point, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <textarea
                name="universityIntro"
                value={point}
                onChange={(e) => handleKeyPointsChange(index, e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full h-15"
              ></textarea>
            </div>
          ))}
          <button
            type="button"
            onClick={addKeyPoint}
            className="text-blue-500 text-sm"
          >
            + Add More
          </button>
        </div>

        {/* Basic Admission Criteria */}
        <div className="col-span-2">
          <label className="block font-medium">Basic Admission Criteria</label>
          <input
            type="text"
            name="basicAdmissionCriteria"
            value={formData.basicAdmissionCriteria}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>

        {/* Entrance Mode */}
        <div className="col-span-1">
          <label className="block font-medium">Entrance Mode</label>
          <select
            name="entranceMode"
            value={formData.entranceMode}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full"
          >
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>
        </div>

        {/* Counselling Mode */}
        <div className="col-span-1">
          <label className="block font-medium">Counselling Mode</label>
          <select
            name="counsellingMode"
            value={formData.counsellingMode}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full"
          >
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>
        </div>

        {/* Scholarships */}
        <div className="col-span-1">
          <label className="block font-medium">Scholarships</label>
          <select
            name="scholarships"
            value={formData.scholarships}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full"
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {/* Submit Button */}
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

export default UpdateAdmission;
