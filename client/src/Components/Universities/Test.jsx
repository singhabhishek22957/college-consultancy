import { useState } from "react";
import UniversitySearch from "./UniversitySearch";

const Test = () => {
  const [universityData, setUniversityData] = useState({
    universityId: "",
    universityName: "",
  });

  const handleUniversitySelect = (university) => {
    setUniversityData({
      universityId: university._id,
      universityName: university.name,
    });
  };

  return (
    <div>
      <h2>Select University</h2>
      <UniversitySearch onSelect={handleUniversitySelect} />

      {universityData.universityId && (
        <div className="mt-4">
          <h3>Selected University:</h3>
          <p>Name: {universityData.universityName}</p>
          <p>ID: {universityData.universityId}</p>
        </div>
      )}
    </div>
  );
};

export default Test;
