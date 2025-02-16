import React, { useEffect, useState } from "react";
import {  searchUniversity, updateUniversity } from "../../Service/UniversityService";
import LoadingPopUp from "../User/LoadingPopUp";
import MessagePopUp from "../MessagePopUp";

const UpdateUniversity = () => {
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



  // search item 
  const [searchItem, setSearchItem] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isFormShow, setIsFormShow] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        console.log('searchItem', searchItem);
        if (!searchItem.trim()) return; // Prevent API call if empty
        
        const response = await searchUniversity({
          ...searchItem,
          searchItem: searchItem,
        });

        console.log("this is error ", response);
        setSuggestions(response.data.data.universities);
        setShowDropdown(true);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchSuggestions();
    }, 300); // Wait 300ms before sending request

    return () => clearTimeout(delayDebounce); // Cleanup timeout
  }, [searchItem]);
// end search item 

// handle fetch searchItem 

const handleSearchDataFetch= (uni)=>{
  setShowDropdown(false);
  setIsFormShow(true);
  setFormData({
    ...formData,
    universityId: uni._id,
    name: uni.name,
    logoImage: uni.logoImage,
    coverImage: uni.coverImage,
    type: uni.type,
    established: uni.established,
    approvedBy: uni.approvedBy,
    setBy: uni.setBy,
    entranceExam: uni.entranceExam,
    naacGrade: uni.naacGrade,
    reviews: uni.reviews,
    courseOffered: uni.courseOffered,
    applicationMode: uni.applicationMode,
    admissionCriteria: uni.admissionCriteria,
    topRecruiters: uni.topRecruiters,
    facilities: uni.facilities,
    campusArea: uni.campusArea,
    officialWebsite: uni.officialWebsite,
  });


}

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
      const response = await updateUniversity({
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

          console.log("response1", response);
          

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
    <div className="max-w-4xl h-screen mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Add University</h2>
      <div className=" flex">
      <div className="relative  w-[400px]">
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
              onClick={() => handleSearchDataFetch(uni)}
              className="p-2 cursor-pointer font-medium text-lg capitalize hover:bg-gray-100"
            >
              {uni.name} - {uni._id} - {uni.established} - {uni.type}
            </li>
          ))}
        </ul>
      )}
    </div>
    <button className=" p-2 px-3 ml-3 border  border-black-300 rounded-lg" >Fetch</button>

      </div>

     

      <form onSubmit={handleSubmit} className={`grid grid-cols-2 gap-4 ${isFormShow?"":"hidden"}`}>
        {Object.keys(formData).map((key) => (
          <div key={key} className={` col-span-1 ${key ==="universityId"?"hidden":""}`}>
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

export default UpdateUniversity;
