import mongoose, { Schema } from "mongoose";


const rankSchema = new Schema({
    universityId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"University"
    },
    ranks:[String],
    awards:[String],
},{timestamps:true});


export const Ranks = mongoose.model("Ranks", rankSchema);