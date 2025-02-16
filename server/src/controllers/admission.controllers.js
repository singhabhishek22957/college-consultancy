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


const getAdmission = asyncHandler(async (req, res) => {
  const { universityId, year } = req.body;
  try {
    const university = await University.findById({ _id: universityId });
    const admission = await Admission.find({
      $and: [{ universityId: universityId }, { year: year }],
    });
    if (!admission) {
      throw new ApiError(404, "admission not found");
    }
    res.status(200).json(
      new ApiResponse(200, {
        message: "admission fetched successfully",
        admission: admission,
        university: {
            name: university.name
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
  const { universityId,
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
  )

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

export { 
    addAdmission,
    getAdmission,
    updateAdmission,
    deleteAdmission,

 };
