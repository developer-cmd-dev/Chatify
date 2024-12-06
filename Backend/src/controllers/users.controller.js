import {asyncHandler} from '../utils/AsyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import { User } from '../models/user.models.js'
import { uploadOnCloudinary } from '../services/cloudinary.js'
import { ApiResponse } from '../utils/ApiResponse.js'


const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend.
    const { username, email, fullname, password, gender, avatar } = req.body;
    console.log(gender)
    // validate-empty field
    if ([username, email, fullname, password, gender,avatar].some((fields) => fields?.trim() === "")
    ) {
        throw new ApiError(400,"All fields are required.");
    }

    // check if user already exist.
    const existedUser = await User.findOne({
        $or:[{username},{email}]
    })

    if(existedUser){
        throw new ApiError(500,"User already existed.")
    }

    // check for image- avatar
    let avatarLocalPath;

    console.log(req.files)
    if(req.files && Array.isArray(req.files.avatar) && req.files.avatar.length >0){
        avatarLocalPath  = req.files.avatar[0].path
    }

    // upload them in cloudinary .
    const avatarUrl = await uploadOnCloudinary(avatarLocalPath);

    const user = await User.create({
        fullname,
        email,
        password,
        username: username.toLowerCase(),
        avatar: avatarUrl?.url || "",
      });

      

      const createdUser = await User.findById(user._id).select("-password -refreshToken")
      if(!createdUser){
        throw new ApiError('500',"Something went wrong while registering the user.");
      }
  
      return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered Successfully.")
      )

    })
    
    export {registerUser}