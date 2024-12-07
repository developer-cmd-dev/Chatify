import {asyncHandler} from '../utils/AsyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import {User} from '../models/user.models.js'


const loginUser = asyncHandler(async (req,res)=>{
    // get data from frontend.
    const {username,password} = req.body

    // Check validate.
    if([username,password].some(fields=>fields.trim()==="")) {
        throw new ApiError(400,"All fields are required.")
    } 

    const user = await User.findByOne({username})
    if(!user){
        throw new ApiError(404,"User not found.")
    }

    const isPassWordValid = await user.isPasswordCorrect(user.password)
    if(!isPassWordValid){
        throw new ApiError(403,"Password not matched.")
    }

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
    res.status(200).json(new ApiResponse(loggedInUser,"User logged in."));



})