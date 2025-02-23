import mongoose from "mongoose";
import { Course } from "../models/course.models.js";
import { University } from "../models/university.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addCourse = asyncHandler(async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new ApiError(401, "unauthorized");
    }

    const {
      universityId,
      courseName,
      courseShortName,
      courseFee,
      courseDescription,
      eligibility,
      brochureLink,
      duration,
    } = req.body;

    const university = await University.findById({ _id: universityId });

    if (!university) {
      throw new ApiError(404, "university not found");
    }

    const course = await Course.create({
      universityId,
      courseName,
      courseShortName,
      courseFee,
      courseDescription,
      eligibility,
      brochureLink,
      duration,
    });

    const createCourse = await Course.findById(course._id);

    if (!createCourse) {
      throw new ApiError(500, "something went wrong while creating course");
    } else {
      res.status(200).json(
        new ApiResponse(200, {
          message: "course added successfully",
          course: createCourse,
          statusCode: 200,
          success: true,
        })
      );
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(
      new ApiResponse(500, {
        message: "Something went wrong while creating course",
        statusCode: 500,
        success: false,
      })
    );
  }
});



const addSubCourse = asyncHandler(async (req, res) => {
  try {
    const {
      courseId,
      name,
      shortName,
      fees,
      applicationDate,
      duration,
      eligibility,
      description,
    } = req.body;

    const course = await Course.findById({ _id: courseId });

    if (!course) {
      throw new ApiError(404, "course not found");
    }

    course.subCourse.push({
      name,
      shortName,
      fees,
      applicationDate,
      duration,
      eligibility,
      description,
    });

    await course.save();

    res.status(200).json(
      new ApiResponse(200, {
        message: "sub course added successfully",
        course: course,
        statusCode: 200,
        success: true,
      })
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json(
      new ApiResponse(500, {
        message: "Something went wrong while creating course",
        statusCode: 500,
        success: false,
      })
    );
  }
});

const deleteCourse = asyncHandler(async (req, res) => {
  try {
    const { courseId } = req.body;
    console.log("Hello", courseId);
    
    console.log(req.body);
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }
    const course = await Course.findByIdAndDelete({ _id: courseId });
    if (!course) {
      throw new ApiError(404, "course not found");
    }
    res.status(200).json(
      new ApiResponse(200, {
        message: "course deleted successfully",
        course: course,
        statusCode: 200,
        success: true,
      })
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json(
      new ApiResponse(500, {
        message: "Something went wrong while deleting course",
        statusCode: 500,
        success: false,
      })
    );
  }
});

const getCourseByUniversityId = asyncHandler(async (req, res) => {
  try {
    const { universityId } = req.body;
    const course = await Course.find({ universityId: universityId });
    if (!course) {
      throw new ApiError(404, "course not found");
    }
    res.status(200).json(
      new ApiResponse(200, {
        message: "course fetched successfully",
        course: course,
        statusCode: 200,
        success: true,
      })
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json(
      new ApiResponse(500, {
        message: "Something went wrong while creating course",
        statusCode: 500,
        success: false,
      })
    );
  }
});

const getCourseListByUniversityId = asyncHandler(async (req,res)=>{

  const { universityId} = req.body;
  
  console.log("universityId", universityId);

  try {

    const courseList = await Course.find(
      {universityId:universityId},
      {courseName:1,courseShortName:1, _id:1},
    )

    if(!courseList){
      throw new ApiError(404, "course not found");
    }

    res.status(200).json(
      new ApiResponse(200, {
        message: "course fetched successfully",
        course: courseList,
        statusCode: 200,
        success: true,
      })
    );
    
  } catch (error) {
    console.log(error);
    return res.status(500).json(
      new ApiResponse(500, {
        message: "Something went wrong while creating course",
        statusCode: 500,
        success: false,
      })
    );

    
  }
})

// get course by course id
const getCourseByCourseId = asyncHandler(async (req, res) => {
  const { courseId } = req.body;
  try {
    const course = await Course.findById({ _id: courseId });
    if (!course) {
      throw new ApiError(404, "course not found");
    }
    res.status(200).json(
      new ApiResponse(200, {
        message: "course fetched successfully",
        course: course,
        statusCode: 200,
        success: true,
      })
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json(
      new ApiResponse(500, {
        message: "Something went wrong while creating course",
        statusCode: 500,
        success: false,
      })
    );
  }
});

const updateCourse = asyncHandler(async (req, res) => {
  const { courseId, formData } = req.body;
  if (!courseId) {
    throw new ApiError(400, "courseId is required");
  }

  const {
    courseName,
    courseShortName,
    courseFee,
    courseDescription,
    eligibility,
    brochureLink,
    duration,
  } = formData;

  console.log("Updating Course with ID:", courseId);
  console.log("Form Data:", formData);

  try {
    const course = await Course.findOneAndUpdate(
      { _id: courseId },
      { $set: formData },
      { new: true, upsert: false }
    );

    if (!course) {
      throw new ApiError(404, "Course not found");
    }

    console.log("Updated Course:", course);
    res.status(200).json(
      new ApiResponse(200, {
        message: "Course updated successfully",
        course: course,
        statusCode: 200,
        success: true,
      })
    );
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(400).json(
      new ApiResponse(
        400,
        {
          message: "Something went wrong",
          statusCode: 400,
          success: false,
        },
        "Something went wrong"
      )
    );
  }
});

const getSubCourseByCourseIdAndSubCourseId = asyncHandler(async (req, res) => {
  try {
    const { courseId, subCourseId } = req.body;

    if (
      !mongoose.Types.ObjectId.isValid(courseId) ||
      !mongoose.Types.ObjectId.isValid(subCourseId)
    ) {
      throw new ApiError(400, "Invalid CourseId or SubCourseId");
    }

    const course = await Course.findOne(
      { _id: courseId, "subCourse._id": subCourseId },
      { "subCourse.$": 1 }
    );

    if (!course) {
      throw new ApiError(404, "Sub Course not found");
    }

    return res.status(200).json(
      new ApiResponse(200, {
        subCourse: course.subCourse[0],
        message: "Sub course fetched successfully",
        success: true,
      })
    );
  } catch (error) {
    return res.status(400).json(
      new ApiResponse(400, {
        message: "Error fetching sub-course",
        success: false,
      })
    );
  }
});

// update sub course

const updateSubCourse = asyncHandler(async (req, res) => {
  const {
    courseId,
    subCourseId,
    name,
    shortName,
    fees,
    applicationDate,
    duration,
    eligibility,
    description,
  } = req.body;
  console.log(req.body);
  

  try {
    const course = await Course.findOneAndUpdate(
      { _id: courseId, "subCourse._id": subCourseId },
      {
        $set: {
          "subCourse.$.name": name,
          "subCourse.$.shortName": shortName,
          "subCourse.$.fees": fees,
          "subCourse.$.applicationDate": applicationDate,
          "subCourse.$.duration": duration,
          "subCourse.$.eligibility": eligibility,
          "subCourse.$.description": description,
        },
      },
      { new: true }
    );

    if (!course) {
      throw new ApiError(404, "Course not found");
    }

    res.status(200).json(
      new ApiResponse(200, {
        message: "Sub course updated successfully",
        success: true,
      })    
    );

    return res.status(200).json(
      new ApiResponse(200, {
        message: "Sub course updated successfully",
        success: true,
      })
    );

  }catch (error) {
    throw new ApiError(500, "something went wrong while updating sub course");
    
  }
});


// search course 

const searchCourse = asyncHandler(async (req,res)=>{
  const {searchItem}= req.body;
  console.log("searchItem", searchItem);
  if(searchItem===""|| !searchItem){
    console.log("search item is required");

    return res.status(400).json(
      new ApiResponse(400,{
        message:"search item is required",
        statusCode:400,
        success:false
      })
    )
  }
  console.log("searchItem", searchItem);

  try {
    const course = await Course.find({
      $or:[
        {courseName:{$regex:`^${searchItem}`,$options:"i"}},
        {courseShortName:{$regex:`^${searchItem}`,$options:"i"}},
      ],
    }).limit(10);

    if(course.length===0){
      return res.status(404).json({
        message:"No course found",
      })
    }

    if(!course){
      return res.status(200).json({
        message:"course fetched successfully",
        course:course,
        statusCode:200,
        success:true
      })
    }

    return res.status(200).json(
      new ApiResponse(200, {
        message:"course fetched successfully",
        course:course,
        statusCode:200,
        success:true
      })
    )
   
    
  } catch (error) {
    console.log(error);
    return res.status(500).json(
      new ApiResponse(500, {
        message:"something went wrong",
        statusCode:500,
        success:false
      })
    ) 
    
  }
  

  
})






export {
  addCourse,
  addSubCourse,
  deleteCourse,
  getCourseByUniversityId,
  updateCourse,
  getCourseByCourseId,
  getSubCourseByCourseIdAndSubCourseId,
  updateSubCourse,
  searchCourse,
  getCourseListByUniversityId,
};
