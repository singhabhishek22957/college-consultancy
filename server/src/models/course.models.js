import mongoose, { Schema } from "mongoose";

const semesterFeeSchema = new Schema({
  semester: {
    type: String, // Example: "Semester 1", "Semester 2"
    required: true,
  },
  fee: {
    type: Number, // Fee for that semester
    required: true,
  },
});

const subCourseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  shortName:{
    type:String,
    required:true
  },
  fees:{
    type:[semesterFeeSchema],
  } , // Store fees for each semester as an array of objects
  applicationDate: {
    type: Date,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  eligibility: {
    type: String,
  },
  description: {
    type: String,
  },
  
});

const courseSchema = new Schema(
  {
    universityId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "University",
    },
    courseName: {
      type: String,
      required: true,
    },
    courseShortName:{
      type:String,
      required:true
    }
    ,
    courseFee:{
      type:String,
      required:true
    }, // Store fees for each semester at the course level
    courseDescription: {
      type: String,
    },
    eligibility: {
      type: String,
    },
    brochureLink: {
      type: String,
    },
    duration: {
      type: String,
    },
    subCourse: {
      type: [subCourseSchema],
      default: [],
    },
  },
  { timestamps: true }
);

export const Course = mongoose.model("Course", courseSchema);
