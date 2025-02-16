import React, { useEffect, useState } from "react";
import { getAllArchiveUniversities } from "../../Service/UniversityService"; // Assuming a function to fetch data
import LoadingPopUp from "../User/LoadingPopUp";
import { Link } from "react-router-dom";
import DeleteArchiveUniversity from "./DeleteArchiveUniversity";
import RestoredArchiveUniversity from "./RestoreArchiveUniversity";


const ShowUniversities = () => {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [archivedData, setArchivedData] = useState({
    isArchive: false,
    universityId: null,
    universityName: null,
  });
  const [restoredData, setRestoredData] = useState({
    isRestored: false,
    universityId: null,
    universityName: null,

  })

  const [refresh, setRefresh] = useState(false);

  const handleArchive = (university)=>{
    setArchivedData((prev)=>({
        ...prev,
        isArchive: true,
        universityId: university._id,
        universityName: university.name,
      }));
      setRefresh((prev)=>!prev);
      setUniversities((prev) => prev.filter((u) => u._id !== university._id));
      console.log(archivedData);
  }
  const handleRestore = (university)=>{
    setRestoredData((prev)=>({
        ...prev,
        isRestored: true,
        universityId: university._id,
        universityName: university.name,
      }));
      setRefresh((prev)=>!prev);
      console.log(restoredData);
  }

  // Fetch universities data
  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        setLoading(true);
        const response = await getAllArchiveUniversities();
        console.log(response);

        setUniversities(response.data.data.universities);
        // console.log(universities);
        
        setLoading(false);
        // Assuming response.data contains the list of universities
      } catch (error) {
        console.error("Error fetching universities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, [refresh]);

  

  return (
    <div className=" w-full mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6 text-center">Archive University List</h2>

      {/* Table to display all universities */}
      <table className="min-w-full bg-white border text-start text-lg overflow-hidden border-gray-300">
        <thead className=" text-start text-lg ">
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-start border-b">Logo</th>
            <th className="py-2 px-4  text-start border-b">Name</th>
            <th className="py-2 px-4 text-start border-b">Type</th>
            <th className="py-2 px-4 text-start border-b">Established</th>
            <th className="py-2 px-4 text-start border-b">Approved By</th>

            <th className="py-2 px-4 text-start border-b">NAAC Grade</th>
            <th className="py-2 px-4 text-start border-b">Entrance Exam</th>
            <th className="py-2 px-4 text-start border-b">Archive By</th>
            <th className="py-2 px-4  border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {universities.map((university) => (
            <tr key={university._id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b w-[100px] overflow-hidden">
                <div className="relative flex justify-center items-center w-16 h-16 rounded-full overflow-hidden">
                  <img
                    src={university.logoImage}
                    alt="university logo"
                    className="w-full h-full object-cover"
                  />
                </div>
              </td>
              <td className="py-2 font-medium capitalize px-4 border-b">
                {university.name ? university.name : "N/A"}
              </td>
              <td className="py-2 capitalize px-4 border-b">
                {university.type ? university.type : "N/A"}
              </td>
              <td className="py-2 capitalize px-4 border-b">
                {university.established ? university.established : "N/A"}
              </td>
              <td className="py-2 capitalize px-4 border-b">
                {university.approvedBy ? university.approvedBy : "N/A"}
              </td>

              <td className="py-2 uppercase px-4 border-b">
                {university.naacGrade ? university.naacGrade : "N/A"}
              </td>
              <td className="py-2 capitalize px-4 border-b">
                {university.entranceExam ? university.entranceExam : "N/A"}
              </td>
              <td className="py-2 px-4 border-b">
                {university.archivedBy?.name ? university.archivedBy?.name : "N/A"}
                {/* <a
                  href={university.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  {university.officialWebsite
                    ? university.officialWebsite
                    : "N/A"}
                </a> */}
              </td>
              <td className="py-2 px-4 border-b text-start">
                <div id="top " className="flex justify-around  ">
                  <button
                    onClick={() => handleArchive(university)}
                    className=" m-1 w-auto px-4 py-1 text-white hover:bg-red-900 bg-red-500 rounded-md "
                  >
                    Remove
                  </button>
                  <button
                   onClick={() => handleRestore(university)}
                   className=" m-1 w-auto px-4 py-1 text-white hover:bg-blue-900 bg-blue-500 rounded-md ">
                    Restore
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <LoadingPopUp isLoading={loading} />
        <DeleteArchiveUniversity
            isArchive={archivedData.isArchive}
            universityId={archivedData.universityId}
            universityName={archivedData.universityName}
        />
        <RestoredArchiveUniversity
        isRestored={restoredData.isRestored}
        universityId={restoredData.universityId}
        universityName={restoredData.universityName}
        />
        
    </div>
  );
};

export default ShowUniversities;
