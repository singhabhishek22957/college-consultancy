import React, { useState } from "react";

const Test = () => {
  // Step state
  const [currentStep, setCurrentStep] = useState(1);

  // Form data state
  const [formData, setFormData] = useState({
    personalInfo: { name: "", email: "" },
    education: { degree: "", university: "" },
    experience: { company: "", years: "" },
    additionalInfo: { notes: "" },
  });

  // Handle input change
  const handleInputChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  // Move to the next step
  const nextStep = () => setCurrentStep((prev) => prev + 1);

  // Move to the previous step
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  // Submit the form
  const handleSubmit = () => {
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-md">
      {currentStep === 1 && (
        <div>
          <h2 className="text-lg font-bold mb-4">Step 1: Personal Information</h2>
          <input
            type="text"
            placeholder="Name"
            value={formData.personalInfo.name}
            onChange={(e) => handleInputChange("personalInfo", "name", e.target.value)}
            className="block w-full p-2 border rounded mb-4"
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.personalInfo.email}
            onChange={(e) => handleInputChange("personalInfo", "email", e.target.value)}
            className="block w-full p-2 border rounded mb-4"
          />
          <button onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 rounded">
            Next
          </button>
        </div>
      )}

      {currentStep === 2 && (
        <div>
          <h2 className="text-lg font-bold mb-4">Step 2: Education</h2>
          <input
            type="text"
            placeholder="Degree"
            value={formData.education.degree}
            onChange={(e) => handleInputChange("education", "degree", e.target.value)}
            className="block w-full p-2 border rounded mb-4"
          />
          <input
            type="text"
            placeholder="University"
            value={formData.education.university}
            onChange={(e) => handleInputChange("education", "university", e.target.value)}
            className="block w-full p-2 border rounded mb-4"
          />
          <div className="flex justify-between">
            <button onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded">
              Previous
            </button>
            <button onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 rounded">
              Next
            </button>
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div>
          <h2 className="text-lg font-bold mb-4">Step 3: Experience</h2>
          <input
            type="text"
            placeholder="Company"
            value={formData.experience.company}
            onChange={(e) => handleInputChange("experience", "company", e.target.value)}
            className="block w-full p-2 border rounded mb-4"
          />
          <input
            type="number"
            placeholder="Years of Experience"
            value={formData.experience.years}
            onChange={(e) => handleInputChange("experience", "years", e.target.value)}
            className="block w-full p-2 border rounded mb-4"
          />
          <div className="flex justify-between">
            <button onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded">
              Previous
            </button>
            <button onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 rounded">
              Next
            </button>
          </div>
        </div>
      )}

      {currentStep === 4 && (
        <div>
          <h2 className="text-lg font-bold mb-4">Step 4: Additional Information</h2>
          <textarea
            placeholder="Notes"
            value={formData.additionalInfo.notes}
            onChange={(e) => handleInputChange("additionalInfo", "notes", e.target.value)}
            className="block w-full p-2 border rounded mb-4"
          ></textarea>
          <div className="flex justify-between">
            <button onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded">
              Previous
            </button>
            <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded">
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Test;
