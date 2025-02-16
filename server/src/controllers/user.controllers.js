import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadImageToCloudinary } from "../utils/cloudinary.js";

// generate access and refresh token

const generateAccessRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(404, "user not found");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({
      validateBeforeSave: false,
    });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "something went wrong while generating refresh and access token "
    );
  }
};

// register user

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, fullName } = req.body;

  // validation
  if (
    [username, email, password, fullName].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "all fields are required");
  }

  // check if user already exist
  const userExist = await User.findOne({ $or: [{ username }, { email }] });

  if (userExist) {
    return res.status(400).json(
      new ApiResponse(
        400,
        {
          message: "user already exist",
          username: userExist.username,
        },
        "user already exist"
      )
    );
  }
  // check for image , check for avatar ;

  const avatarLocalPath = req.files?.avatar[0]?.path;
  console.log("avatarLocalPath",avatarLocalPath);
  console.log("data: ",username,email,password,fullName);
  

  // if(!avatarLocalPath){
  //   throw new ApiError(400,"avatar is required")
  // }

// upload avatar on cloudinary 

const avatar = await uploadImageToCloudinary(avatarLocalPath);

// if(!avatar){
//     throw new ApiError(500,"something went wrong while uploading avatar on cloudinary");
// }
  // carate user-object  --create entry in db 

  const user = await User.create({
    fullName,
    avatarUrl:avatar?.url,
    username,
    email,
    password,
  })

  const createUser = await User.findById(user._id).select("-password -refreshToken");

  if(!createUser){
    throw new ApiError(500,"something went wrong while user registration ")
  }

  return res.status(201).json(new ApiResponse(200,createUser,"user registered successfully"));


})   // end of register user

// login user 

const loginUser = asyncHandler(async (req,res)=>{
    const {email,username,password}= req.body;

    if(!password|| (email?.trim()===""&& username?.trim()==="")){
        throw new ApiError(400, "password, email or username is required");

    }
    console.log(password,email,username);
    

    // check if user exist 

    const userExist = await User.findOne({$or:[{email},{username}]});
    // console.log(userExist);
    
    if(!userExist){
        res.status(400).json(new ApiResponse(400,{
            message:"user not found",
            statusCode:400,
            success:false

        }))
        // throw new ApiError(404,"user not found");
    }

    // check password ;

    const isPasswordMatch = await userExist.comparePassword(password);
    if(!isPasswordMatch){
        res.status(400).json(new ApiResponse(400,{
            message:"password is incorrect",
            statusCode:400,
            success:false
        }))
        // throw new ApiError(400,"password is incorrect");

    }
    // console.log(isPasswordMatch);
    

    // generate access and refresh token
    const {accessToken,refreshToken} = await generateAccessRefreshToken(userExist._id);
    // console.log(accessToken, refreshToken);
    

    const loggedInUser = await User.findById(userExist._id).select("-password -refreshToken");


    const options = {
        httpOnly:true,
        secure:false,
        sameSite: 'Lax'
    };

    console.log("Access Token:", accessToken);
    console.log("Refresh Token:", refreshToken);
    
    // send cookies 

    return res
    .status(200)
    .cookie("accessToken", accessToken,options)
    .cookie("refreshToken", refreshToken,options)
    .json(
        new ApiResponse(200,
            {
                user:loggedInUser,
                accessToken,
                refreshToken,
            },
            "user logged in successfully"
        )
    )


});

const logoutUser = asyncHandler(async(req,res)=>{
    User.findByIdAndUpdate(
        req.user._id,
        {
            $unset:{refreshToken:1}
        },
        {
            new: true
        }
    );
    const options={
        httpOnly:true,
        secure:true,
    };

    return res 
    .status(200)
    .cookie("accessToken",null,options)
    .cookie("refreshToken",null,options)
    .json(new ApiResponse(200,{
        message:"user logged out successfully",
        statusCode:200,
        success:true
    },"user logged out successfully"))
})  // end of logout user

const getUser = asyncHandler(async(req,res)=>{
  console.log("User Details:", req.user);
  
    if(!req.user){
        return res.status(401).json(new ApiResponse(401,{
            message:"unauthorized request: access token not found",
            statusCode:401,
            success:false
        },"user not found"))
    }

    return res.status(200).json(new ApiResponse(200,{user:req.user},"user found successfully"))
})


export {
    registerUser,
    loginUser,
    logoutUser,
    getUser,
}
