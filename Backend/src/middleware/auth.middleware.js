import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import jwt from 'jsonwebtoken'


export const verifyJWT = asyncHandler(async(req,res,next)=>{
try {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","") 
    
    if(!token){
        next()
        throw new ApiError(401,"Unauthorized User");
    }

    const decodeToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodeToken?._id).select("-password -refreshToken")

    if(!user){
        throw new ApiError(401,"Ivalid Accesss token")
    }

    req.user = user
    next()
} catch (error) {
    next(error)
}



})