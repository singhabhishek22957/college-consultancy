import React, { useState } from "react";
import LoadingPopUp from "../../User/LoadingPopUp";
import MessagePopUp from "../../MessagePopUp";
import { deleteAdmission, getAdmission } from "../../../Service/AdmissionService";
import UniversitySearch from "../UniversitySearch";
import { set } from "mongoose";
import { useNavigate } from "react-router-dom";

const GetAdmission = () => {
  const [formData, setFormData] = useState({
    universityId: "",
    year: "",
  });

  const navigate = useNavigate();
  const [admissionIsEmpty, setAdmissionIsEmpty] = useState(false);
  const [admissions, setAdmissions] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState({
    success: false,
    message: "",
    badError: true,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };
  const handleUniversitySearch = (university) => {
    setFormData({ ...formData, universityId: university._id });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!formData.universityId.trim())
      newErrors.universityId = "University ID is required";
    if (!formData.year.trim()) newErrors.year = "Year is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      const response = await getAdmission(formData);
      console.log("response", response);

      setAdmissions(response.data.data.admission);
      if(admissions.length === 0) setAdmissionIsEmpty(true);

      setSuccess({
        success: true,
        message: "Admission data fetched successfully",
        badError: false,
      });
    } catch (error) {
      setSuccess({
        success: true,
        message: error.response?.data?.message || "Error fetching data",
        badError: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteData = async(universityId, year) =>{

    const response = await deleteAdmission({
      universityId: universityId,
      year: year,
    });

    setSuccess({
      success: true,
      message: response.data.data.message,
      badError: false,
    });
    setAdmissions((prev) => prev.filter((admission) => admission.year !== year));
    console.log("deleted successfully: ",response);
    
  }

  const  handleUpdateData = (universityId, year)=>{

    navigate(`/university/update-admission/${universityId}/${year}`);

  }

  return (
    <div className="w-full mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Fetch University Admission</h2>
      <form
        onSubmit={handleSubmit}
        className="grid justify-center  grid-cols-1 gap-4"
      >
        <div>
          <label className="block font-medium">University Name *</label>
          <UniversitySearch
            onSelect={handleUniversitySearch}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
          {errors.universityId && (
            <p className="text-red-500">{errors.universityId}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Year *</label>
          <input
            type="text"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-auto"
          />
          {errors.year && <p className="text-red-500">{errors.year}</p>}
        </div>

        <button
          type="submit"
          className="bg-blue-500 w-1/12 text-white px-4 py-2 rounded"
        >
          Fetch Admission
        </button>
      </form>
      {admissions.length > 0 ? (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold text-center mb-6">
              Admission Details
            </h1>
            {/* grid md:grid-cols-2 lg:grid-cols-3 gap-6 */}
            <div className="">
              {admissions.map((admission) => (
                <div
                  key={admission._id}
                  className="bg-white shadow-lg rounded-lg p-5 border border-gray-200"
                >
                  <h2 className="text-lg font-semibold">
                    University Admission {admission.year}
                  </h2>
                  <p className="text-sm text-gray-600 mb-3">
                    Written by: {admission.writtenBy.name}
                  </p>
                  <p>
                    <strong>University Intro:</strong>{" "}
                    {admission.universityIntro}
                  </p>
                  <p>
                    <strong>Basic Criteria:</strong>{" "}
                    {admission.basicAdmissionCriteria}
                  </p>
                  <p>
                    <strong>Entrance Mode:</strong> {admission.entranceMode}
                  </p>
                  <p>
                    <strong>Counselling Mode:</strong>{" "}
                    {admission.counsellingMode}
                  </p>
                  <div>
                    <strong>Key Points:</strong>
                    <ul className="list-disc list-inside text-gray-700">
                      {admission.universityKeyPoints.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    Created at: {new Date(admission.createdAt).toLocaleString()}
                  </p>
                  <div div className="flex justify-between w-2/12">
                  <button
                    className="mt-4 bg-red-500 font-bold text-white px-4 py-2 rounded"
                    onClick={() => handleDeleteData(admission.universityId, admission.year)}
                  >
                    Delete
                  </button>
                  <button
                    className="mt-4 bg-green-500 font-bold text-white px-4 py-2 rounded"
                    onClick={() => handleUpdateData(admission.universityId, admission.year)}
                  >
                    Edit
                  </button>

                  </div>
                  
                </div>
                
              ))}
            </div>
          </div>
        </div>
      ) : (

        <h1 className="text-2xl font-bold text-center text-red-700"> {admissionIsEmpty && "No admission  data found"} </h1>
      )}
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

export default GetAdmission;

