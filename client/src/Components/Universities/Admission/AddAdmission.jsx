import { useState } from "react";

const AdmissionForm = () => {
  const [formData, setFormData] = useState({
    universityId: "",
    year: "",
    universityIntro: "",
    universityKeyPoints: [],
    basicAdmissionCriteria: "",
    entranceMode: "online",
    counsellingMode: "online",
    scholarships: "yes",
  });

  const [keyPoint, setKeyPoint] = useState(""); // To handle input for adding key points
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddKeyPoint = () => {
    if (keyPoint.trim() !== "") {
      setFormData({ ...formData, universityKeyPoints: [...formData.universityKeyPoints, keyPoint] });
      setKeyPoint(""); // Clear input after adding
    }
  };

  const handleRemoveKeyPoint = (index) => {
    const updatedKeyPoints = [...formData.universityKeyPoints];
    updatedKeyPoints.splice(index, 1);
    setFormData({ ...formData, universityKeyPoints: updatedKeyPoints });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    try {
      const response = await fetch("http://localhost:5000/api/admissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage({ type: "success", text: result.message });
        setFormData({
          universityId: "",
          year: "",
          universityIntro: "",
          universityKeyPoints: [],
          basicAdmissionCriteria: "",
          entranceMode: "online",
          counsellingMode: "online",
          scholarships: "yes",
        });
      } else {
        setMessage({ type: "error", text: result.message || "Something went wrong" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to connect to server" });
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Add Admission</h2>
      {message && (
        <div className={`p-2 text-white text-center rounded ${message.type === "error" ? "bg-red-500" : "bg-green-500"}`}>
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="universityId" value={formData.universityId} onChange={handleChange} placeholder="University ID" className="w-full p-2 border rounded" required />
        <input type="text" name="year" value={formData.year} onChange={handleChange} placeholder="Year" className="w-full p-2 border rounded" required />
        <textarea name="universityIntro" value={formData.universityIntro} onChange={handleChange} placeholder="University Introduction" className="w-full p-2 border rounded" required />

        {/* University Key Points (Multiple Inputs) */}
        <div>
          <h3 className="font-semibold">University Key Points</h3>
          <div className="flex space-x-2">
            <input type="text" value={keyPoint} onChange={(e) => setKeyPoint(e.target.value)} placeholder="Add a key point" className="w-full p-2 border rounded" />
            <button type="button" onClick={handleAddKeyPoint} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Add</button>
          </div>
          <ul className="mt-2">
            {formData.universityKeyPoints.map((point, index) => (
              <li key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded mt-1">
                {point}
                <button type="button" onClick={() => handleRemoveKeyPoint(index)} className="text-red-500">✖</button>
              </li>
            ))}
          </ul>
        </div>

        <textarea name="basicAdmissionCriteria" value={formData.basicAdmissionCriteria} onChange={handleChange} placeholder="Basic Admission Criteria" className="w-full p-2 border rounded" />

        <select name="entranceMode" value={formData.entranceMode} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="online">Online</option>
          <option value="offline">Offline</option>
          <option value="online and offline">Both</option>
        </select>

        <select name="counsellingMode" value={formData.counsellingMode} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="online">Online</option>
          <option value="offline">Offline</option>
          <option value="online and offline">Both</option>
        </select>

        <select name="scholarships" value={formData.scholarships} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="not applicable">Not Applicable</option>
        </select>

        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">Submit</button>
      </form>
    </div>
  );
};

export default AdmissionForm;
