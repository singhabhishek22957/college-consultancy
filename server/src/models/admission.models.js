import mongoose, { Schema } from "mongoose";

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
      type: [String],
      enum: ["yes", "no", "not applicable"],
    },
    // course wise admission details
    admissionCourse: [
      {
        CourseId: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Course",
        },
        heading: {
          type: String,
        },
        selectionCriteria: {
          type: String,
        },

        // admission Process
        admissionProcess: [
          {
            heading: {
              type: String,
            },
            description: [String],
            subHeading: [String],
          },
        ],
        admissionFee: [
          {
            heading: {
              type: String,
            },
            description: [String],
            feeType: String,
            feeAmount: [String],
          },
        ],
        // selection criteria
        selectionCriteria: [
          {
            heading: {
              type: String,
            },
            description: [String],
            subHeading: [String],
            eligibility: {
              type: String,
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

export const Admission = mongoose.model("Admission", admissionSchema);
