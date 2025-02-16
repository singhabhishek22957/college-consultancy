import { Schema } from "mongoose";

const universityInfoSchema = new Schema(
  {
    universityId:{
      type: Schema.Types.ObjectId,
      required:true,
      ref:"University"
    },
    about:{
        type:String,
    },
    aboutVideoLink:{
        type:String,

    },
    aboutImage:{
        type:String,
        
    },

  },
  {
    timestamps: true,
  }
);

export const UniversityInfo = mongoose.model("UniversityInfo", universityInfoSchema);

