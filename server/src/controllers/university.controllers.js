import mongoose from "mongoose";
import { ArchiveUniversity } from "../models/archiveUniversity.models.js";
import { University } from "../models/university.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadImageToCloudinary } from "../utils/cloudinary.js";

const universityRegister = asyncHandler(async (req, res) => {
  // check if user is authenticated
  const user = req.user;
  if (!user) {
    throw new ApiError(401, "unauthorized");
  }

  const {
    name,
    type,
    established,
    approvedBy,
    setBy,
    entranceExam,
    naacGrade,
    reviews,
    courseOffered,
    applicationMode,
    admissionCriteria,
    topRecruiters,
    facilities,
    campusArea,
    officialWebsite,
  } = req.body;

  // validation
  if (
    [name, type, established, applicationMode].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, " Star marked fields are required");
  }

  // check if university already exist
  const universityExist = await University.findOne({ name });
  const archivedUniversityExist = await ArchiveUniversity.findOne({
    name,
  });

  if (universityExist) {
    const message = `<div style="text-align: center; font-size: 18px; padding: 20px;">
  <strong style="font-size: 24px;">📌 <span style="color: red;">Oh! University Already Exists.</span> ⛔</strong>
  <br/>
  <span style="color: gray;">This university is already registered in our system.</span>
  <br/>
  <img src="https://img.icons8.com/ios/50/000000/error.png" alt="Error" style="margin-top: 10px;" />
</div>`;
    res.status(400).json(
      new ApiResponse(400, {
        message: message,
        statusCode: 400,
        success: false,
      })
    );
    throw new ApiError(400, "university already exist");
  } else if (archivedUniversityExist) {
    const message = `<div style="text-align: center; font-size: 18px; padding: 20px;">
    <strong style="font-size: 24px;">📌 <span style="color: red;">Oh! University Already Exists in Archive Folder.</span> ⛔</strong
    <br/>
    <span style="color: gray;">This university is already registered in our system.</span>
    <br/>
    <img src="https://img.icons8.com/ios/50/000000/error.png" alt="Error" style="margin-top: 10px;" />
    </div>`;
    res.status(400).json(
      new ApiResponse(400, {
        message: message,
        statusCode: 400,
        success: false,
      })
    );
    throw new ApiError(400, "university already exist");
  }

  // check for image , check for avatar ;
  const logoImageLocalPath = req.files?.logoImage?.[0]?.path;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  if (!logoImageLocalPath) {
    const now = new Date();

    let message = ` <strong>📌 Logo Image Required! </strong>  <br/> 📅 Date: ${now.toLocaleDateString()} <br/> ⏰ Time: ${now.toLocaleTimeString()}`;
    res.status(400).json(
      new ApiResponse(400, {
        message,
        statusCode: 400,
        success: false,
      })
    );
    throw new ApiError(400, message);
  }
  console.log(
    "logoImageLocalPath",
    logoImageLocalPath,
    "coverImageLocalPath",
    coverImageLocalPath
  );

  const logo = await uploadImageToCloudinary(logoImageLocalPath);

  const cover = coverImageLocalPath
    ? await uploadImageToCloudinary(coverImageLocalPath)
    : null;

  if (!logo) {
    throw new ApiError(
      500,
      "something went wrong while uploading image to cloudinary"
    );
  } else {
    console.log("logo:", logo?.url);
    console.log("cover:", cover?.url);
  }

  const { _id, fullName } = req.user;
  console.log("user: ", _id, fullName);

  // crate university
  console.log(
    "data: ",
    name,
    type,
    established,
    approvedBy,
    setBy,
    entranceExam,
    naacGrade,
    reviews,
    courseOffered,
    applicationMode,
    admissionCriteria,
    topRecruiters,
    facilities,
    campusArea,
    officialWebsite
  );
  const university = await University.create({
    name,
    logoImage: logo?.url,
    coverImage: cover?.url,
    type,
    established,
    approvedBy,
    setBy,
    entranceExam,
    naacGrade,
    reviews,
    courseOffered,
    applicationMode,
    admissionCriteria,
    topRecruiters,
    facilities,
    campusArea,
    officialWebsite,
    createdBy: {
      userId: _id,
      name: fullName,
    },
  });

  const createUniversity = await University.findById(university._id);

  if (!createUniversity) {
    throw new ApiError(500, "something went wrong while creating university");
  } else {
    res.status(201).json(
      new ApiResponse(200, {
        message: `<div style="text-align: center; font-size: 18px; padding: 20px;">
  <strong style="font-size: 24px; color: #28a745;">✅ University Registered Successfully! 🎉</strong>
  <br/>
  <span style="color: #6c757d;">The university has been successfully added to our system.</span>
  <br/>
  
  <br/>
  
</div>`,
        university: createUniversity,
        statusCode: 201,
        success: true,
      })
    );
  }
});

const getAllUniversities = asyncHandler(async (req, res) => {
  try {
    const universities = await University.find();
    if (!universities) {
      res.status(404).json(
        new ApiResponse(404, {
          message: "universities not found",
          statusCode: 404,
          success: false,
        })
      );
      throw new ApiError(404, "universities not found");
    }
    res.status(200).json(
      new ApiResponse(200, {
        universities,
        statusCode: 200,
        success: true,
      })
    );
  } catch (error) {
    res.status(400).json(
      new ApiResponse(400, {
        message: "something went wrong while fetching universities",
        statusCode: 400,
        success: false,
      })
    );
  }
});

const getUniversityByIdAndName = asyncHandler(async (req, res) => {
  try {
    const { universityId, universityName } = req.body;
    const university = await University.findOne({
      $or: [{ universityId }, { name: universityName }],
    });
    if (!university) {
      res.status(404).json(
        new ApiResponse(404, {
          message: "university not found",
          statusCode: 404,
          success: false,
        })
      );
      throw new ApiError(404, "university not found");
    }
    res.status(200).json(
      new ApiResponse(200, {
        university,
        statusCode: 200,
        success: true,
      })
    );
  } catch (error) {
    res.status(400).json(
      new ApiResponse(400, {
        message: "something went wrong while fetching university",
        statusCode: 400,
        success: false,
      })
    );
  }
});

const searchUniversities = asyncHandler(async (req, res) => {
  const { searchItem } = req.body;
  console.log("searchItem", searchItem);

  if (searchItem === "" || !searchItem) {
    console.log("search item is required");

    return res.status(400).json(
      new ApiResponse(400, {
        message: "search item is required",
        statusCode: 400,
        success: false,
      })
    );
    // throw new ApiError(400, "search item is required");
  }
  console.log("searchItem", searchItem);

  try {
    const universities = await University.find({
      $or: [
        { name: { $regex: `^${searchItem}`, $options: "i" } },
        { established: { $regex: `^${searchItem}`, $options: "i" } },
      ],
    }).limit(10);

    if (universities.length === 0) {
      return res.status(404).json({ message: "No universities found" });
    }

    if (!universities) {
      res.status(404).json(
        new ApiResponse(404, {
          message: "universities not found",
          statusCode: 404,
          success: false,
        })
      );
      throw new ApiError(404, "universities not found");
    }

    res.status(200).json(
      new ApiResponse(200, {
        universities,
        statusCode: 200,
        success: true,
      })
    );
  } catch (error) {
    console.log(error);

    res.status(400).json(
      new ApiResponse(400, {
        message: "something went wrong while searching universities",
        statusCode: 400,
        success: false,
      })
    );
  }
});

const updateUniversity = asyncHandler(async (req, res) => {
  const {
    universityId,
    name,
    established,
    type,
    approvedBy,
    setBy,
    entranceExam,
    naacGrade,
    reviews,
    courseOffered,
    applicationMode,
    admissionCriteria,
    topRecruiters,
    facilities,
    campusArea,
    officialWebsite,
  } = req.body;

  try {
    if (!universityId || !name) {
      console.log("universityId and universityName are required to update university");
      return res.status(400).json(
        new ApiResponse(400, {
          message: "universityId and universityName are required",
          statusCode: 400,
          success: false,
        })
      );
    }

    console.log("university id:", universityId);
    
    const university = await University.findById(universityId);
    if (!university) {
      return res.status(404).json(
        new ApiResponse(404, {
          message: "University not found",
          statusCode: 404,
          success: false,
        })
      );
    }

    // Check for images
    const logoImageLocalPath = req.files?.logoImage?.[0]?.path;
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

    const updateUni = await University.findOneAndUpdate(
      { _id: universityId },
      {
        $set: {
          name,
          established,
          logoImage: logoImageLocalPath,
          coverImage: coverImageLocalPath,
          type,
          approvedBy,
          setBy,
          entranceExam,
          naacGrade,
          reviews,
          courseOffered,
          applicationMode,
          admissionCriteria,
          topRecruiters,
          facilities,
          campusArea,
          officialWebsite,
        },
      },
      { new: true }
    );
console.log("updateUni", updateUni);

    return res.status(200).json(
      new ApiResponse(200, {
        updateUni,
        message: "University updated successfully",
        statusCode: 200,
        success: true,
      })
    );

  } catch (error) {
    console.error("Error updating university:", error);
    return res.status(500).json(
      new ApiResponse(500, {
        message: "Something went wrong while updating university",
        statusCode: 500,
        success: false,
      })
    );
  }
});






const ArchiveUin = asyncHandler(async (req, res) => {
  try {
    const { universityId, universityName } = req.body;
    console.log("universityId", universityId, "universityName", universityName);

    const user = req.user;
    console.log(
      "1universityId",
      universityId,
      "universityName",
      universityName
    );
    // search university by id or name
    // Search for the university by either ID or Name (not using $or)
    let university;
    if (universityId) {
      university = await University.findOne({ _id: universityId });
    } else if (universityName) {
      university = await University.findOne({ name: universityName });
    }
    console.log(
      "2universityId",
      universityId,
      "universityName",
      universityName
    );
    console.log("university", university);

    if (!university) {
      res.status(404).json(
        new ApiResponse(404, {
          message: "university not found",
          statusCode: 404,
          success: false,
        })
      );
      throw new ApiError(404, "university not found");
    }

    // set university in archived university collection
    const archived = new ArchiveUniversity({
      ...university.toObject(),
      archivedBy: {
        userId: user._id,
        name: user.fullName,
      },
    });
    await archived.save();

    // delete university

    await University.deleteOne({
      $or: [{ universityId }, { name: universityName }],
    });
    // send response
    res.status(200).json(
      new ApiResponse(200, {
        archived,
        message: `<div style="text-align: center; font-size: 18px; padding: 20px;">
  <strong style="font-size: 24px;">📌 <span style="color: green;">University Archived Successfully!</span> ✅</strong>
  <br/>
  <span style="color: gray;">The university has been successfully archived in our system.</span>
  <br/>
  <img src="https://img.icons8.com/ios/50/000000/checkmark.png" alt="Success" style="margin-top: 10px;" />
</div>`,
        statusCode: 200,
        success: true,
      })
    );
  } catch (error) {
    console.log("error", error);

    res.status(400).json(
      new ApiResponse(400, {
        message: ` <div style={{ textAlign: 'center', fontSize: '18px', padding: '20px' }}>
      <strong style={{ fontSize: '24px' }}>
        📌 <span style={{ color: 'red' }}>Oh! Something Went Wrong While Deleting University.</span> ⛔
      </strong>
      <br />
      <span style={{ color: 'gray' }}>Please try again later or contact support.</span>
      <br />
      <img
        src="https://img.icons8.com/ios/50/000000/error.png"
        alt="Error"
        style={{ marginTop: '10px' }}
      />
    </div>`,
        statusCode: 400,
        success: false,
      })
    );
  }
});

const getAllArchiveUniversities = asyncHandler(async (req, res) => {
  try {
    const universities = await ArchiveUniversity.find();
    if (!universities) {
      res.status(404).json(
        new ApiResponse(404, {
          message: "universities not found",
          statusCode: 404,
          success: false,
        })
      );
      throw new ApiError(404, "universities not found");
    }
    res.status(200).json(
      new ApiResponse(200, {
        universities,
        statusCode: 200,
        success: true,
      })
    );
  } catch (error) {
    res.status(400).json(
      new ApiResponse(400, {
        message: "something went wrong while fetching universities",
        statusCode: 400,
        success: false,
      })
    );
  }
});

const deleteArchiveUniversity = asyncHandler(async (req, res) => {
  try {
    const { universityId, universityName } = req.body;

    let university;
    if (universityId) {
      university = await ArchiveUniversity.findOne({ _id: universityId });
    } else if (universityName) {
      university = await ArchiveUniversity.findOne({ name: universityName });
    }

    if (!university) {
      res.status(404).json(
        new ApiResponse(404, {
          message: "university not found",
          statusCode: 404,
          success: false,
        })
      );
      throw new ApiError(404, "university not found");
    }

    await ArchiveUniversity.deleteOne({
      $or: [{ universityId }, { name: universityName }],
    });
    res.status(200).json(
      new ApiResponse(200, {
        message: `<div style="text-align: center; font-size: 18px; padding: 20px;">
        <strong style="font-size: 24px;">📌 <span style="color: green;">University Deleted Successfully!</span> ✅</strong
        <br/>
        <span style="color: gray;">The university has been successfully deleted in our system.</span>
        <br/>
        <img src="https://img.icons8.com/ios/50/000000/checkmark.png" alt="Success" style="margin-top: 10px;" />
        </div>`,
        statusCode: 200,
        success: true,
      })
    );
  } catch (error) {
    res.status(400).json(
      new ApiResponse(400, {
        message: ` <div style={{ textAlign: 'center', fontSize: '18px', padding: '20px' }}>
        <strong style={{ fontSize: '24px' }}>
          📌 <span style={{ color: 'red' }}>Oh! Something Went Wrong While Deleting University.</span> ⛔
        </strong>
        <br />
        <span style={{ color: 'gray' }}>Please try again later or contact support.</span>
        <br />
        <img
          src="https://img.icons8.com/ios/50/000000/error.png"
          alt="Error"
          style={{ marginTop: '10px' }}
        />
      </div>`,
        statusCode: 400,
        success: false,
      })
    );
  }
});

const restoreArchiveUniversity = asyncHandler(async (req, res) => {
  try {
    const { universityId, universityName } = req.body;
    console.log("universityId", universityId, "universityName", universityName);

    const user = req.user;
    console.log(
      "1universityId",
      universityId,
      "universityName",
      universityName
    );
    // search university by id or name
    // Search for the university by either ID or Name (not using $or)
    let university;
    if (universityId) {
      university = await ArchiveUniversity.findOne({ _id: universityId });
    } else if (universityName) {
      university = await ArchiveUniversity.findOne({ name: universityName });
    }
    console.log(
      "2universityId",
      universityId,
      "universityName",
      universityName
    );
    console.log("university", university);

    if (!university) {
      res.status(404).json(
        new ApiResponse(404, {
          message: "university not found",
          statusCode: 404,
          success: false,
        })
      );
      throw new ApiError(404, "university not found");
    }

    // set university in archived university collection
    const restored = new University({
      ...university.toObject(),
      createdBy: {
        userId: user._id,
        name: user.fullName,
      },
    });
    await restored.save();

    // delete university

    await ArchiveUniversity.deleteOne({
      $or: [{ universityId }, { name: universityName }],
    });
    // send response
    res.status(200).json(
      new ApiResponse(200, {
        restored,
        message: `<div style="text-align: center; font-size: 18px; padding: 20px;">
  <strong style="font-size: 24px;">📌 <span style="color: green;">University Archived Successfully!</span> ✅</strong>
  <br/>
  <span style="color: gray;">The university has been successfully archived in our system.</span>
  <br/>
  <img src="https://img.icons8.com/ios/50/000000/checkmark.png" alt="Success" style="margin-top: 10px;" />
</div>`,
        statusCode: 200,
        success: true,
      })
    );
  } catch (error) {
    console.log("error", error);

    res.status(400).json(
      new ApiResponse(400, {
        message: ` <div style={{ textAlign: 'center', fontSize: '18px', padding: '20px' }}>
      <strong style={{ fontSize: '24px' }}>
        📌 <span style={{ color: 'red' }}>Oh! Something Went Wrong While Deleting University.</span> ⛔
      </strong>
      <br />
      <span style={{ color: 'gray' }}>Please try again later or contact support.</span>
      <br />
      <img
        src="https://img.icons8.com/ios/50/000000/error.png"
        alt="Error"
        style={{ marginTop: '10px' }}
      />
    </div>`,
        statusCode: 400,
        success: false,
      })
    );
  }
});

export {
  universityRegister,
  getAllUniversities,
  ArchiveUin,
  getAllArchiveUniversities,
  deleteArchiveUniversity,
  restoreArchiveUniversity,
  getUniversityByIdAndName,
  searchUniversities,
  updateUniversity,
};
