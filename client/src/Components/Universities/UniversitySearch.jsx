import React, { useState, useEffect, useCallback } from "react";
import { searchUniversity } from "../../Service/UniversityService";

const UniversitySearch = ({ onSelect }) => {
  const [searchItem, setSearchItem] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isFetch, setIsFetch] = useState(false);

  // Fetch university suggestions
  const fetchSuggestions = useCallback(async () => {
    if (!searchItem.trim()) return;
    
    try {
      const response = await searchUniversity({ searchItem }); // API Call
      setSuggestions(response.data.data.universities);
      setShowDropdown(true);
    } catch (error) {
      console.error(error);
    }
  }, [searchItem]);

  useEffect(() => {
    if(isFetch) return;
    const delayDebounce = setTimeout(fetchSuggestions, 300); // Debounce
    return () => clearTimeout(delayDebounce);
  }, [fetchSuggestions]);

  const handleSelection = (university) => {
    setShowDropdown(false);
    setSearchItem(university.name); 
    setIsFetch(true);
    onSelect(university); // Pass selected university to parent
  };

  return (
    <div className="relative w-[400px]">
      <input
        type="text"
        placeholder="Search for universities..."
        value={searchItem}
        onChange={(e) => setSearchItem(e.target.value)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
        className="w-full p-2 border border-gray-300 rounded-lg"
      />

      {showDropdown && suggestions.length > 0 && (
        <ul className="absolute top-10 mt-1 w-full bg-white border border-gray-300 rounded-lg list-none p-2 shadow-md">
          {suggestions.map((uni) => (
            <li
              key={uni._id}
              onClick={() => handleSelection(uni)}
              className="p-2 cursor-pointer font-medium text-lg capitalize hover:bg-gray-100"
            >
              {uni.name} - {uni._id} - {uni.established} - {uni.type}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UniversitySearch;
