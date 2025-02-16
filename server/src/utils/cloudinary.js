import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// config cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// upload image to cloudinary

const uploadImageToCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // upload file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // file has been uploaded on cloudinary 
    return response;

  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
}

export {uploadImageToCloudinary}
