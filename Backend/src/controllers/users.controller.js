import {asyncHandler} from '../utils/AsyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import { User } from '../models/user.models.js'
import { uploadOnCloudinary } from '../services/cloudinary.js'
import { ApiResponse } from '../utils/ApiResponse.js'


const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend.
    const { username, email, fullname, password, gender, avatar } = req.body;
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
        throw new ApiError(404,"User already existed.")
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


    const loginUser = asyncHandler(async (req,res,next)=>{
      const {username,password}=req.body
      if([username,password].some((fields)=>fields.trim() === "")) throw new ApiError(404,"All fields are required.");
      const existedUser =await User.findOne({username})
      if(!existedUser) throw new ApiError(404,"User is not exist.")
     
        
        try {
          const isPassWordValid = await existedUser.isPasswordCorrect(password)
          if(!isPassWordValid) {
            throw new ApiError(400,"Password did not match.",["Ensure your password is correct."])
          }
          setTimeout(() => {
            res.status(200).json(new ApiResponse('200',"","Password Matched"))    

          }, 4000);
          
        } catch (error) {
          next(error)
        }
      
   
 
      
  
      

    })
    
    export {registerUser,loginUser}