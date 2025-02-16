import { Admission } from "../models/admission.models.js";
import { University } from "../models/university.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";




const addAdmission = asyncHandler(async (req,res)=>{
    const  {
        universityId,
        year,
        universityIntro,
        universityKeyPoints,
        basicAdmissionCriteria,
        entranceMode,
        counsellingMode,
        scholarships,
    } = req.body;

    console.log("req.body:-",req.body);

    if([universityId,year,universityIntro].some((field)=> field && (typeof field !== "string" || !field.trim()))){
        throw new ApiError(400,"star marked fields are required");
    }

    const university = await University.findById({_id:universityId});

    if(!university){
        throw new ApiError(404,"university not found");
    }

    const { _id, fullName} = req.user;
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
        writtenBy:{
            userId:_id,
            name:fullName,
        },
    })

    if(!admission){
        throw new ApiError(500,"something went wrong while creating admission");
    }else{
        res.status(200).json(
            new ApiResponse(200,{
                message:"admission created successfully",
                admission:admission,
                statusCode:200,
                success:true
            },"admission created successfully")
        );
    }
    

})



export {
    addAdmission,
};