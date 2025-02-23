import React, { useEffect, useState } from "react";
import LoadingPopUp from "../../User/LoadingPopUp";
import MessagePopUp from "../../MessagePopUp";
import {
  deleteAdmission,
  deleteAdmissionCourse,
  getAdmission,
  getAdmissionCourse,
} from "../../../Service/AdmissionService";
import { useNavigate, useParams } from "react-router-dom";
import { getCourseListByUniversityId } from "../../../Service/CourseService";

const ShowAdmissionCourse = () => {
  const { universityId, year } = useParams();

  const [universityData, setUniversityData] = useState({});

  const [courseList, setCourseList] = useState([]);

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

  useEffect(() => {
    const fetchAdmission = async () => {
      try {
        setLoading(true);
        const response = await getAdmissionCourse({
          universityId: universityId,
          year: year,
        });
        if (response.data.data.admission.length > 0) {
          const courseLists = await getCourseListByUniversityId({
            universityId: universityId,
          });
          const courseLista = courseLists.data.data.course;
          console.log("course lista", courseLista);

          setCourseList(courseLista);
          console.log("course list", courseList);
        }
        console.log("response", response);
        const admissionData = response.data.data.admission;

        setAdmissions(admissionData);
        console.log("admission data", admissions);

        const universityData = response.data.data.university;
        setUniversityData(universityData);
        console.log("uni data", response.data.data.university);

        console.log("university", universityData);
        console.log("admissions", admissions);
        console.log("admission response ", response.data.data.admission);
        console.log("admissions  length", response.data.data.admission.length);
        if (admissions.length === 0) setAdmissionIsEmpty(true);

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

    fetchAdmission();
  }, [universityId, year]);

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
  };

  const handleDeleteData = async (universityId, year, courseId) => {
    const response = await deleteAdmissionCourse({
      universityId: universityId,
      year: year,
      courseId: courseId,
    });

    setSuccess({
      success: true,
      message: response.data.data.message,
      badError: false,
    });
    setAdmissions((prev) =>
      prev.filter((admission) => admission.courseId !== courseId)
    );
    console.log("deleted successfully: ", response);
  };

  const handleUpdateData = (universityId, year, courseId) => {
    navigate(`/update-admission-course/${universityId}/${year}/${courseId}`);
  };

  const FindCourseName = (courseId) => {
    const course = courseList.find((course) => course._id === courseId);
    return course.courseShortName;
  };

  return (
    <div className="w-full mx-auto p-6 bg-white shadow-md rounded-md">
      {1 > 0 ? (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold text-center mb-6">
              Admission Course Details
            </h1>
            {/* grid md:grid-cols-2 lg:grid-cols-3 gap-6 */}
            <div className="">
              {admissions.map((admission) => (
                <div
                  key={admission._id}
                  className="bg-white shadow-lg rounded-lg p-5 border border-gray-200"
                >
                  <h2 className="text-lg capitalize font-semibold">
                    {universityData.name} {FindCourseName(admission.courseId)}{" "}
                    Admission {year}
                  </h2>
                  <p className="text-sm text-gray-600 mb-3">
                    {/* Written by: {admission.writtenBy.name} */}
                  </p>
                  <p>
                    <strong>Course Admission:</strong> {admission.heading}
                  </p>

                  {/* Admission Process */}
                  <div>
                    <strong>Admission Process:</strong>
                    <ul className="list-disc list-inside text-gray-700">
                      <li>
                        <h2>{admission.admissionProcess.heading}</h2>
                      </li>
                      <ul>
                        <h2>Admission Process Description</h2>
                        {admission.admissionProcess.description.map(
                          (point, index) => (
                            <li key={index}>{point}</li>
                          )
                        )}
                      </ul>
                      <ul>
                        <h2>Admission Process Key Points</h2>
                        {admission.admissionProcess.subHeading.map(
                          (point, index) => (
                            <li key={index}>{point}</li>
                          )
                        )}
                      </ul>
                    </ul>
                  </div>

                  {/* selection Criteria */}
                  <div>
                    <strong>Admission Criteria:</strong>
                    <ul className="list-disc list-inside text-gray-700">
                      <li>
                        <h2>{admission.selectionCriteria.heading}</h2>
                      </li>
                      <ul>
                        <h2>Admission Process Description</h2>
                        {admission.selectionCriteria.description.map(
                          (point, index) => (
                            <li key={index}>{point}</li>
                          )
                        )}
                      </ul>
                      <ul>
                        <h2>Admission Process Key Points</h2>
                        {admission.selectionCriteria.subHeading.map(
                          (point, index) => (
                            <li key={index}>{point}</li>
                          )
                        )}
                      </ul>
                    </ul>
                  </div>

                  {/*  Admission fees */}
                  {/* <h2 className="text-lg font-semibold mt-4">Admission Fees</h2> */}

                  <p>
                    <strong>Admission Fee:</strong>{" "}
                    {admission.admissionFee.heading}
                  </p>
                  <p>
                    <strong>Fee Type:</strong> {admission.admissionFee.feeType}
                  </p>
                  <p>
                    <strong> Fee Amount:</strong>{" "}
                    {admission.admissionFee.feeAmount}
                  </p>
                  <p>
                    <strong> Eligibility:</strong> {admission.eligibility}
                  </p>
                  {/* <p className="text-xs text-gray-400 mt-2">
                    Created at: {new Date(admission.createdAt).toLocaleString()}
                  </p> */}
                  <div div className="flex justify-between w-2/12">
                    <button
                      className="mt-4 bg-red-500 font-bold text-white px-4 py-2 rounded"
                      onClick={() =>
                        handleDeleteData(universityId, year, admission.courseId)
                      }
                    >
                      Delete
                    </button>
                    <button
                      className="mt-4 bg-green-500 font-bold text-white px-4 py-2 rounded"
                      onClick={() =>
                        handleUpdateData(
                          universityId,
                          year,
                          admission.courseId
                        )
                      }
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
        <h1 className="text-2xl font-bold text-center text-red-700">
          {" "}
          {admissionIsEmpty && "No admission  data found"}{" "}
        </h1>
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

export default ShowAdmissionCourse;
