import mongoose from "mongoose";
import { Admission } from "../models/admission.models.js";
import { University } from "../models/university.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addAdmission = asyncHandler(async (req, res) => {
  const {
    universityId,
    year,
    universityIntro,
    universityKeyPoints,
    basicAdmissionCriteria,
    entranceMode,
    counsellingMode,
    scholarships,
  } = req.body;

  //   console.log("req.body:-", req.body);

  const checkAdmission = await Admission.find({
    $and: [{ universityId: universityId }, { year: year }],
  });
  //   console.log("checkAdmission:-", checkAdmission);

  if (checkAdmission.length > 0) {
    console.log("admission already exist");
    res.status(400).json(
      new ApiResponse(400, {
        message: "admission already exist",
        statusCode: 400,
        success: false,
      })
    );
    throw new ApiError(400, "admission already exist");
  }

  if (
    [universityId, year, universityIntro].some(
      (field) => field && (typeof field !== "string" || !field.trim())
    )
  ) {
    throw new ApiError(400, "star marked fields are required");
  }

  const university = await University.findById({ _id: universityId });

  if (!university) {
    throw new ApiError(404, "university not found");
  }

  const { _id, fullName } = req.user;
  console.log("user: ", _id, fullName);

  const admission = await Admission.create({
    universityId,
    year,
    universityIntro,
    universityKeyPoints,
    basicAdmissionCriteria,
    entranceMode,
    counsellingMode,
    scholarships,
    writtenBy: {
      userId: _id,
      name: fullName,
    },
  });

  if (!admission) {
    throw new ApiError(500, "something went wrong while creating admission");
  }
  console.log("admission data add successfully admission: ", admission);

  return res.status(200).json(
    new ApiResponse(200, {
      message: "admission created successfully",
      admission: admission,
      statusCode: 200,
      success: true,
    })
  );
});

// get university admission year

const getAdmissionYear = asyncHandler(async (req, res) => {
  const { data } = req.body;

  console.log("req.body:-", req.body);

  console.log("universityId:-", data.universityId);
  const universityId = data.universityId;

  const admission = await Admission.find({ universityId });

  if (admission.length === 0) {
    return res.status(404).json(
      new ApiResponse(404, {
        message: "Admission not found, Please add admission first",
        statusCode: 404,
        success: false,
      })
    );
    // throw new ApiError(404, "Admission not found");
  }

  const uniqueYears = [...new Set(admission.map((entry) => entry.year))];

  res.status(200).json(
    new ApiResponse(200, {
      message: "Admission years fetched successfully",
      years: uniqueYears,
      success: true,
    })
  );

  console.log("uniqueYears:-", uniqueYears);
});

const getAdmission = asyncHandler(async (req, res) => {
  const { universityId, year } = req.body;
  try {
    const university = await University.findById({ _id: universityId });
    const admission = await Admission.find({
      $and: [{ universityId: universityId }, { year: year }],
    });
    if (!admission) {
      return res.status(404).json(
        new ApiResponse(404, {
          message: "admission not found, Please add admission first",
          statusCode: 404,
          success: false,
        })
      );
      // throw new ApiError(404, "admission not found");
    }
    res.status(200).json(
      new ApiResponse(200, {
        message: "admission fetched successfully",
        admission: admission,
        university: {
          name: university.name,
        },
        statusCode: 200,
        success: true,
      })
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json(
      new ApiResponse(500, {
        message: "Something went wrong while fetching admission",
        statusCode: 500,
        success: false,
      })
    );
  }
});

const updateAdmission = asyncHandler(async (req, res) => {
  const {
    universityId,
    year,
    universityIntro,
    universityKeyPoints,
    basicAdmissionCriteria,
    entranceMode,
    counsellingMode,
    scholarships,
  } = req.body;
  const admission = await Admission.find({
    $and: [{ universityId: universityId }, { year: year }],
  });
  if (!admission) {
    throw new ApiError(404, "admission not found");
  }

  const updatedAdmission = await Admission.findOneAndUpdate(
    {
      $and: [{ universityId: universityId }, { year: year }],
    },
    {
      $set: {
        universityIntro,
        universityKeyPoints,
        basicAdmissionCriteria,
        entranceMode,
        counsellingMode,
        scholarships,
      },
    },
    {
      new: true,
    }
  );

  if (!updatedAdmission) {
    throw new ApiError(500, "something went wrong while updating admission");
  }

  res.status(200).json(
    new ApiResponse(200, {
      message: "admission updated successfully",
      admission: updatedAdmission,
      statusCode: 200,
      success: true,
    })
  );
});

const deleteAdmission = asyncHandler(async (req, res) => {
  const { universityId, year } = req.body;
  const admission = await Admission.findOneAndDelete({
    $and: [{ universityId: universityId }, { year: year }],
  });
  if (!admission) {
    throw new ApiError(404, "admission not found");
  }
  res.status(200).json(
    new ApiResponse(200, {
      message: "admission deleted successfully",
      admission: admission,
      statusCode: 200,
      success: true,
    })
  );
});

const addAdmissionCourse = asyncHandler(async (req, res) => {
  const {
    flag,
    universityId,
    year,
    courseId,
    heading,
    admissionProcess,
    admissionFee,
    selectionCriteria,
    eligibility,
  } = req.body;

  console.log("req.body:-", req.body);

  try {
    const checkAdmission = await Admission.find({
      universityId: universityId,
      year: year,
      "admissionCourse.courseId": courseId,
    });

    if (checkAdmission==0 && flag == false) {

      console.log("admission course not found");
      
      return res.status(400).json(
        new ApiResponse(400, {
          message:
            "admission course not found, Please add admission first. (add-admission)",
          statusCode: 400,
          success: false,
        })
      );
      // throw new ApiError(400, "admission course not found");
    } 
     if (checkAdmission.length > 0  && flag == false) {
      console.log("admission course already exist", checkAdmission);
      
      console.log("admission course already exist");
       return res.status(400).json(
        new ApiResponse(400, {
          message: "admission course already exist",
          statusCode: 400,
          success: false,
        })
      );
      // throw new ApiError(400, "admission course already exist");
    } 

    if (flag == false) {
      return;
    }

    if (checkAdmission.length > 0) {
      console.log("admission course already exist");
      res.status(400).json(
        new ApiResponse(400, {
          message: "admission course already exist",
          statusCode: 400,
          success: false,
        })
      );
      throw new ApiError(400, "admission course already exist");
    }

    const admission = await Admission.findOneAndUpdate(
      {
        $and: [{ universityId: universityId }, { year: year }],
      },
      {
        $push: {
          admissionCourse: {
            courseId,
            heading,
            admissionProcess,
            admissionFee,
            selectionCriteria,
            eligibility,
          },
        },
      },
      {
        new: true,
      }
    );

    console.log("admission course added successfully admission: ", admission);

    if (!admission) {
      throw new ApiError(
        500,
        "something went wrong while adding admission course"
      );
    }

    res.status(200).json(
      new ApiResponse(200, {
        message: "admission course added successfully",
        admission: admission,
        statusCode: 200,
        success: true,
      })
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json(
      new ApiResponse(500, {
        message: "Something went wrong while adding admission course",
        statusCode: 500,
        success: false,
      })
    );
  }
});

const fetchUpdateAdmissionCourse = asyncHandler(async (req, res) => {
  const { data } = req.body;

  console.log("req.body:-", req.body);

  const admission = await Admission.findOne(
    {
      universityId: new mongoose.Types.ObjectId(data.universityId),
      year: data.year,
      admissionCourse: {
        $elemMatch: {
          courseId: new mongoose.Types.ObjectId(data.courseId),
        },
      },
    },
    {
      "admissionCourse.$": 1,
    }
  );

  if (!admission) {
    res.status(404).json(
      new ApiResponse(404, {
        message: "admission course not found",
        statusCode: 404,
        success: false,
      })
    );
    throw new ApiError(404, "admission course not found");
  }
  console.log("admission course fetched successfully admission: ", admission);

  res.status(200).json(
    new ApiResponse(200, {
      message: "admission course fetched successfully",
      admission: admission,
      statusCode: 200,
      success: true,
    })
  );
});



const updateAdmissionCourse = asyncHandler(async (req, res) => {
  const {
    universityId,
    year,
    courseId,
    heading,
    admissionProcess,
    admissionFee,
    selectionCriteria,
    eligibility,
  } = req.body;

  console.log("req.body:-", req.body);

  try {
    const admission = await Admission.findOneAndUpdate(
      {
        universityId: new mongoose.Types.ObjectId(universityId),
        year: year,
        "admissionCourse.courseId": new mongoose.Types.ObjectId(courseId),
      },
      {
        $set: {
          "admissionCourse.$.heading": heading,
          "admissionCourse.$.admissionProcess": admissionProcess,
          "admissionCourse.$.admissionFee": admissionFee,
          "admissionCourse.$.selectionCriteria": selectionCriteria,
          "admissionCourse.$.eligibility": eligibility,
        },
      },
      {
        new: true,
      }
    );

    if (!admission) {
      res.status(404).json(
        new ApiResponse(404, {
          message: "admission course not found",
          statusCode: 404,
          success: false,
        })
      );
      throw new ApiError(404, "admission course not found");
    }

    res.status(200).json(
      new ApiResponse(200, {
        message: "admission course updated successfully",
        admission: admission,
        statusCode: 200,
        success: true,
      })
    );
    console.log("admission course updated successfully admission: ", admission);
  } catch (error) {
    console.log(error);
    throw new ApiError(
      500,
      "something went wrong while updating admission course"
    );
  }
});

const deleteAdmissionCourse = asyncHandler(async (req,res)=>{
  const {universityId, year, courseId} = req.body;

  try {
    const admission  = await Admission.findOneAndUpdate({
      $and: [{ universityId: universityId }, { year: year }],
    }, {
      $pull: {
        admissionCourse: {
          courseId: new mongoose.Types.ObjectId(courseId)
        }
      }
    }, {
      new: true
      
    })

    if (!admission) {
      res.status(404).json(
        new ApiResponse(404, {
          message: "admission course not found",
          statusCode: 404,
          success: false,
        })
      );
      throw new ApiError(404, "admission course not found");
    }

    res.status(200).json(
      new ApiResponse(200, {
        message: "admission course deleted successfully",
        admission: admission,
        statusCode: 200,
        success: true,
      })
    )
  } catch (error) {
    console.log(error);
    throw new ApiError(
      500,
      "something went wrong while deleting admission course"
    );
    
  }
})

const getAdmissionCourse = asyncHandler(async (req, res) => {
  const { universityId, year } = req.body;

  console.log("req.body:-", req.body);
  try {
    const university = await University.findById({ _id: universityId });
    const admission = await Admission.findOne({
      $and: [{ universityId: universityId }, { year: year }],
    });

    if (!admission) {
      res.status(404).json(
        new ApiResponse(404, {
          message: "admission not found, Please add admission first",
          statusCode: 404,
          success: false,
        })
      );
      throw new ApiError(404, "admission not found");
    }

    res.status(200).json(
      new ApiResponse(200, {
        message: "admission fetched successfully",
        admission: admission.admissionCourse,
        university: {
          name: university.name,
        },
        statusCode: 200,
        success: true,
      })
    );

    console.log("admission fetched successfully admission: ", admission.admissionCourse);
  } catch (error) {
    console.log(error);
    return res.status(500).json(
      new ApiResponse(500, {
        message: "Something went wrong while fetching admission course",
        statusCode: 500,
        success: false,
      })
    );
  }
});

export {
  addAdmission,
  getAdmission,
  updateAdmission,
  deleteAdmission,
  addAdmissionCourse,
  getAdmissionYear,
  fetchUpdateAdmissionCourse,
  updateAdmissionCourse,
  getAdmissionCourse,
  deleteAdmissionCourse,
};
