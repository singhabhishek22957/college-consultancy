import mongoose, { Schema } from "mongoose";

 
const archiveUniversitySchema = new Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
        index: true,
        lowercase: true,
        unique: true,
        index: true,
      },
      logoImage: {
        type: String,
        required: true,
      },
      coverImage: {
        type: String,
      },
      type: {
        type: String,
        enum: ["private", "government"],
        lowercase: true,
        required: true,
      },
      established: { 
        type: String, required: true
       },
      approvedBy: { 
        type: String 
      },
      setBy: {
         type: String 
        },
      entranceExam: { 
        type: String 
      },
      naacGrade:{
        type:String
      },
      reviews:{
        type:String
      },
      entranceExam:{
        type:String
      },
      courseOffered:{
        type:String
      },
      applicationMode:{
        type:String,
        required:true ,
         enum: ["online", "offline", "online and offline"]
        },
      admissionCriteria:{
        type:String
      },
      topRecruiters:{
        type:String
      },
      facilities:{
        type:String
      },
      campusArea:{
        type:String
      },
      officialWebsite:{
        type:String
      },
      archivedBy: {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        name: {
          type: String,
        },
      }, 
    },
    { timestamps: true }
  );

export const ArchiveUniversity = mongoose.model("ArchiveUniversity", archiveUniversitySchema);