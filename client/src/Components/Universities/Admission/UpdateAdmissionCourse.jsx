import React, { useEffect, useState } from "react";
import UniversitySearch from "../UniversitySearch";
import SearchCourse from "../Course/SearchCourse";
import {
  addAdmissionCourse,
  fetchUpdateAdmissionCourse,
  getAdmissionYear,
  updateAdmissionCourse,
} from "../../../Service/AdmissionService";
import { getCourseByUniversityId } from "../../../Service/CourseService";
import LoadingPopUp from "../../User/LoadingPopUp";
import MessagePopUp from "../../MessagePopUp";
import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";

const UpdateAdmissionCourse = () => {
  const { universityId, year, courseId } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState({
    success: false,
    message: "",
    badError: false,
  });

  const navigate = useNavigate();

  const [courseAdmissionData, setCourseAdmissionData] = useState({
    flag: true,
    courseId: courseId,
    year: year,
    universityId: universityId,
    heading: "",
    eligibility: "",
    admissionProcess: {
      heading: "",
      description: [""],
      subHeading: [""],
    },
    admissionFee: {
      heading: "",
      feeType: "",
      feeAmount: "",
    },
    selectionCriteria: {
      heading: "",
      description: [""],
      subHeading: [""],
    },
  });

  // end of university fetch

  const handleChange = (e) => {
    setCourseAdmissionData({
      ...courseAdmissionData,
      [e.target.name]: e.target.value,
    });
  };

  // handle admission process Sub heading change
  const handleAdmissionProcessSubHeadingChange = (index, value) => {
    const updatedSubHeading = [
      ...courseAdmissionData.admissionProcess.subHeading,
    ];
    updatedSubHeading[index] = value;
    setCourseAdmissionData({
      ...courseAdmissionData,
      admissionProcess: {
        ...courseAdmissionData.admissionProcess,
        subHeading: updatedSubHeading,
      },
    });
  };

  // add admission process sub heading
  const addAdmissionProcessSubHeading = () => {
    setCourseAdmissionData({
      ...courseAdmissionData,
      admissionProcess: {
        ...courseAdmissionData.admissionProcess,
        subHeading: [...courseAdmissionData.admissionProcess.subHeading, ""],
      },
    });
  };

  // handle admission process description change
  const handleAdmissionProcessDescriptionChange = (index, value) => {
    const updatedDescription = [
      ...courseAdmissionData.admissionProcess.description,
    ];
    updatedDescription[index] = value;
    setCourseAdmissionData({
      ...courseAdmissionData,
      admissionProcess: {
        ...courseAdmissionData.admissionProcess,
        description: updatedDescription,
      },
    });
  };

  // add admission process description
  const addAdmissionProcessDescription = () => {
    setCourseAdmissionData({
      ...courseAdmissionData,
      admissionProcess: {
        ...courseAdmissionData.admissionProcess,
        description: [...courseAdmissionData.admissionProcess.description, ""],
      },
    });
  };

  // handle selection criteria Sub heading change
  const handleSelectionCriteriaSubHeadingChange = (index, value) => {
    const updatedSubHeading = [
      ...courseAdmissionData.selectionCriteria.subHeading,
    ];
    updatedSubHeading[index] = value;
    setCourseAdmissionData({
      ...courseAdmissionData,
      selectionCriteria: {
        ...courseAdmissionData.selectionCriteria,
        subHeading: updatedSubHeading,
      },
    });
  };

  // add selection criteria sub heading
  const addSelectionCriteriaSubHeading = () => {
    setCourseAdmissionData({
      ...courseAdmissionData,
      selectionCriteria: {
        ...courseAdmissionData.selectionCriteria,
        subHeading: [...courseAdmissionData.selectionCriteria.subHeading, ""],
      },
    });
  };

  // handle selection criteria  description change
  const handleSelectionCriteriaDescriptionChange = (index, value) => {
    const updatedDescription = [
      ...courseAdmissionData.selectionCriteria.description,
    ];
    updatedDescription[index] = value;
    setCourseAdmissionData({
      ...courseAdmissionData,
      selectionCriteria: {
        ...courseAdmissionData.selectionCriteria,
        description: updatedDescription,
      },
    });
  };

  // add admission process sub heading
  const addSelectionCriteriaDescription = () => {
    setCourseAdmissionData({
      ...courseAdmissionData,
      selectionCriteria: {
        ...courseAdmissionData.selectionCriteria,
        description: [...courseAdmissionData.selectionCriteria.description, ""],
      },
    });
  };

  useEffect(() => {
    const handleFetchUpdateData = async () => {
      courseAdmissionData.flag = false;

      try {
        setIsLoading(true);

        const response = await fetchUpdateAdmissionCourse({
          universityId: courseAdmissionData.universityId,
          courseId: courseAdmissionData.courseId,
          year: courseAdmissionData.year,
        });

        console.log("add update course response", response);

        const admissionData =
          response?.data?.data?.admission?.admissionCourse?.[0];
        if (!admissionData) {
          console.log("Admission data not found :", admissionData);

          setSuccess({
            success: true,
            message: "No data found",
            badError: true,
          });
          return;
        }

        setCourseAdmissionData((prev) => ({
          ...prev,
          admissionProcess: admissionData.admissionProcess,
          selectionCriteria: admissionData.selectionCriteria,
          admissionFee: admissionData.admissionFee,
          eligibility: admissionData.eligibility,
          heading: admissionData.heading,
        }));

        // setSuccess({
        //   success: true,
        //   message: response.data.data.message,
        //   badError: false,
        // });
      } catch (error) {
        console.log("error in add admission course", error);
        setSuccess({
          success: true,
          message: error.response.data.data.message,
          badError: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    handleFetchUpdateData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    courseAdmissionData.flag = true;
    console.log("Course Data list ", courseAdmissionData);

    try {
      const response = await updateAdmissionCourse({
        ...courseAdmissionData,
      });

      console.log("add admission course response", response);
      console.log("course update data ", courseAdmissionData);

      setSuccess({
        success: true,
        message: response.data.data.message,
        badError: false,
      });
    } catch (error) {
      console.log("error in add admission course", error);
      setSuccess({
        success: true,
        message: error.response.data.data.message,
        badError: true,
      });
    }

    console.log("courseAdmissionData", courseAdmissionData);
  };

  return (
    <div className=" w-full m-4  h-auto pb-28">
      <h2 className="text-2xl text-center font-bold mb-4">
        {" "}
        University Admission
      </h2>
      <div className="flex gap-2"></div>

      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
        <form onSubmit={handleSubmit} className={`grid grid-cols-2 gap-4`}>
          {/* admission course heading  */}
          <div className="col-span-2">
            <label className="block font-medium">
              Admission Course Heading *
            </label>
            <input
              type="text"
              name="heading"
              value={courseAdmissionData.heading}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>

          <div className="col-span-2">
            {/* admission process */}

            <h2 className="text-xl font-bold mb-4">
              Admission Course Process{" "}
            </h2>

            {/* heading */}
            <label className="block font-medium">
              {" "}
              Admission Process Heading
            </label>
            <input
              type="text"
              name="heading"
              value={courseAdmissionData.admissionProcess.heading}
              onChange={(e) => {
                setCourseAdmissionData({
                  ...courseAdmissionData,
                  admissionProcess: {
                    ...courseAdmissionData.admissionProcess,
                    heading: e.target.value,
                  },
                });
              }}
              className="border border-gray-300 rounded-md p-2 w-full"
            />

            {/* sub heading */}
            <div className="col-span-2">
              <label className="block font-medium">
                Admission Process Heading
              </label>
              {courseAdmissionData.admissionProcess.subHeading.map(
                (point, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <textarea
                      name="admissionProcessSubHeading"
                      value={point}
                      onChange={(e) =>
                        handleAdmissionProcessSubHeadingChange(
                          index,
                          e.target.value
                        )
                      }
                      className="border border-gray-300 rounded-md p-2 w-full h-15"
                    ></textarea>
                  </div>
                )
              )}
              <button
                type="button"
                onClick={addAdmissionProcessSubHeading}
                className="text-blue-500 text-sm"
              >
                + Add More
              </button>
            </div>

            {/* description */}
            <div className="col-span-2">
              <label className="block font-medium">
                Admission Process Description
              </label>
              {courseAdmissionData.admissionProcess.description.map(
                (point, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <textarea
                      name="admissionProcessSubHeading"
                      value={point}
                      onChange={(e) =>
                        handleAdmissionProcessDescriptionChange(
                          index,
                          e.target.value
                        )
                      }
                      className="border border-gray-300 rounded-md p-2 w-full h-15"
                    ></textarea>
                  </div>
                )
              )}
              <button
                type="button"
                onClick={addAdmissionProcessDescription}
                className="text-blue-500 text-sm"
              >
                + Add More
              </button>
            </div>

            {/* end admission Process */}
          </div>

          <div className="col-span-2">
            {/* selection criteria   */}

            <h2 className="text-xl  font-bold mb-4">Selection Criteria </h2>

            {/* heading */}
            <label className="block font-medium">
              {" "}
              Selection Criteria Heading
            </label>
            <input
              type="text"
              name="heading"
              value={courseAdmissionData.selectionCriteria.heading}
              onChange={(e) => {
                setCourseAdmissionData({
                  ...courseAdmissionData,
                  selectionCriteria: {
                    ...courseAdmissionData.selectionCriteria,
                    heading: e.target.value,
                  },
                });
              }}
              className="border border-gray-300 rounded-md p-2 w-full"
            />

            {/* sub heading */}
            <div className="col-span-2">
              <label className="block font-medium">
                Selection Criteria Sub Heading
              </label>
              {courseAdmissionData.selectionCriteria.subHeading.map(
                (point, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <textarea
                      name="selectionCriteriaSubHeading"
                      value={point}
                      onChange={(e) =>
                        handleSelectionCriteriaSubHeadingChange(
                          index,
                          e.target.value
                        )
                      }
                      className="border border-gray-300 rounded-md p-2 w-full h-15"
                    ></textarea>
                  </div>
                )
              )}
              <button
                type="button"
                onClick={addSelectionCriteriaSubHeading}
                className="text-blue-500 text-sm"
              >
                + Add More
              </button>
            </div>

            {/* description */}
            <div className="col-span-2">
              <label className="block font-medium">
                Selection Criteria Key Points...
              </label>
              {courseAdmissionData.selectionCriteria.description.map(
                (point, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <textarea
                      name="selectionCriteriaDescription"
                      value={point}
                      onChange={(e) =>
                        handleSelectionCriteriaDescriptionChange(
                          index,
                          e.target.value
                        )
                      }
                      className="border border-gray-300 rounded-md p-2 w-full h-15"
                    ></textarea>
                  </div>
                )
              )}
              <button
                type="button"
                onClick={addSelectionCriteriaDescription}
                className="text-blue-500 text-sm"
              >
                + Add More
              </button>
            </div>

            {/* end selection criteria */}
          </div>

          {/* fee section */}

          <div className="col-span-2">
            {/* heading */}
            <label className="block font-medium">Fee Heading</label>
            <input
              type="text"
              name="heading"
              value={courseAdmissionData.admissionFee.heading}
              onChange={(e) => {
                setCourseAdmissionData({
                  ...courseAdmissionData,
                  admissionFee: {
                    ...courseAdmissionData.admissionFee,
                    heading: e.target.value,
                  },
                });
              }}
              className="border border-gray-300 rounded-md p-2 w-1/2"
            />

            {/* feType */}
            <label className="block font-medium">Fee Type</label>
            <input
              type="text"
              name="heading"
              value={courseAdmissionData.admissionFee.feeType}
              onChange={(e) => {
                setCourseAdmissionData({
                  ...courseAdmissionData,
                  admissionFee: {
                    ...courseAdmissionData.admissionFee,
                    feeType: e.target.value,
                  },
                });
              }}
              className="border border-gray-300 rounded-md p-2 w-1/2"
            />

            {/* heading */}
            <label className="block font-medium">Fee Amount</label>
            <input
              type="text"
              name="heading"
              value={courseAdmissionData.admissionFee.feeAmount}
              onChange={(e) => {
                setCourseAdmissionData({
                  ...courseAdmissionData,
                  admissionFee: {
                    ...courseAdmissionData.admissionFee,
                    feeAmount: e.target.value,
                  },
                });
              }}
              className="border border-gray-300 rounded-md p-2 w-1/2"
            />
          </div>

          {/* admission course eligibility  */}
          <div className="col-span-2">
            <label className="block font-medium">
              Admission Course Eligibility *
            </label>
            <input
              type="text"
              name="eligibility"
              value={courseAdmissionData.eligibility}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
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
        <LoadingPopUp isLoading={isLoading} />
        <MessagePopUp
          isOpen={success.success}
          message={success.message}
          badError={success.badError}
          onClose={() => {
            setSuccess({ success: false, message: "" });
            navigate(
              `/university/show-admission-course/${universityId}/${year}`
            );
          }}
        />
      </div>
    </div>
  );
};

export default UpdateAdmissionCourse;
