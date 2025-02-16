

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { addSubCourse } from '../../../Service/CourseService';

const AddSubCourse = () => {
  const { courseId } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    shortName: "",
    fees: [
      {
        semester: "",
        fee: "",
      }
    ],
    applicationDate: "",
    duration: "",
    eligibility: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const requiredFields = [
    "name",
    "shortName",
    "applicationDate",
    "duration",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  const handleFeesChange = (index, field, value) => {
    const updatedFees = [...formData.fees];
    updatedFees[index][field] = value;
    setFormData({ ...formData, fees: updatedFees });
  };

  const addFeeField = () => {
    setFormData({
      ...formData,
      fees: [...formData.fees, { semester: "", fee: "" }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    requiredFields.forEach((field) => {
      if (typeof formData[field] === "string" && !formData[field].trim()) {
        newErrors[field] = "This field is required";
      }
    });

    // Validate fees
    formData.fees.forEach((fee, index) => {
      if (!fee.semester.trim() || !fee.fee.trim()) {
        newErrors[`fee${index}`] = "Both semester and fee are required for each entry";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      const response = await addSubCourse({
        ...formData,
        courseId: courseId,
      });

      console.log("response", response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error adding sub-course: ", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Add Sub-Course</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {Object.keys(formData).map((key) => (
          <div key={key} className="col-span-1">
            <label className="block font-medium capitalize">
              {key.replace(/([A-Z])/g, " $1")}
              {requiredFields.includes(key) && (
                <span className="text-lg text-red-500"> *</span>
              )}
              {errors[key] && <p className="text-red-500">{errors[key]}</p>}
            </label>

            {key === "fees" ? (
              <>
                {formData.fees.map((fee, index) => (
                  <div className="flex gap-1" key={index}>
                    <input
                      type="text"
                      name={`semester-${index}`}
                      value={fee.semester}
                      onChange={(e) => handleFeesChange(index, "semester", e.target.value)}
                      className="border w-[50%] m-1 border-gray-300 rounded-md p-2"
                    />
                    <input
                      type="text"
                      name={`fee-${index}`}
                      value={fee.fee}
                      onChange={(e) => handleFeesChange(index, "fee", e.target.value)}
                      className="border w-[50%] m-1 border-gray-300 rounded-md p-2"
                    />
                    {errors[`fee${index}`] && <p className="text-red-500">{errors[`fee${index}`]}</p>}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addFeeField}
                  className="text-blue-500 mt-2"
                >
                  Add Fee
                </button>
              </>
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
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSubCourse;
