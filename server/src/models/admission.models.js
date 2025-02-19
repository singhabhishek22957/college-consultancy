import mongoose, { Schema } from "mongoose";


const admissionCourseSchema = new Schema({
  courseId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Course",
  },
  heading: {
    type: String,
  },
  

  // Admission Process
  admissionProcess: 
    {
      heading: {
        type: String,
      },
      description: {
        type: [String],
        default: [],
      },
      subHeading: {
        type: [String],
        default: [],
      },
    },
  
  
  // Admission Fee Details
  admissionFee: 
    {
      heading: {
        type: String,
      },
    
      feeType: {
        type: String,
      },
      feeAmount: {
        type: String,
      },
    },
  

  // Selection Criteria
  selectionCriteria: 
    {
      heading: {
        type: String,
      },
      description: {
        type: [String],
        default: [],
      },
      subHeading: {
        type: [String],
        default: [],
      },
      eligibility: {
        type: String,
      },
    },
  
});

const admissionSchema = new Schema(
  {
    universityId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "University",
    },
    year: {
      type: String,
      required: true,
    },
    universityIntro: {
      type: String, // long text
      required: true,
    },
    universityKeyPoints: {
      type: [String], // list of strings
    },
    basicAdmissionCriteria: {
      type: String, // list of strings
    },
    writtenBy: {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      name: {
        type: String,
      },
    },
    entranceMode: {
      type: String,
      enum: ["online", "offline", "online and offline"],
    },
    counsellingMode: {
      type: String,
      enum: ["online", "offline", "online and offline"],
    },
    ScholarShips: {
      type: String,
      enum: ["yes", "no", "not applicable"],
    },
    // course wise admission details
    admissionCourse: {
      type: [admissionCourseSchema],
      default: [],
    }
  },
  { timestamps: true }
);

export const Admission = mongoose.model("Admission", admissionSchema);


// {
//   CourseId: {
//     type: Schema.Types.ObjectId,
//     required: true,
//     ref: "Course",
//   },
//   heading: {
//     type: String,
//   },
//   selectionCriteria: {
//     type: String,
//   },

//   // admission Process
//   admissionProcess: [
//     {
//       heading: {
//         type: String,
//       },
//       description: [String],
//       subHeading: [String],
//     },
//   ],
//   admissionFee: [
//     {
//       heading: {
//         type: String,
//       },
//       description: [String],
//       feeType: String,
//       feeAmount: [String],
//     },
//   ],
//   // selection criteria
//   selectionCriteria: [
//     {
//       heading: {
//         type: String,
//       },
//       description: [String],
//       subHeading: [String],
//       eligibility: {
//         type: String,
//       },
//     },
//   ],
// },