import { User } from "../models/user.models";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/AsyncHandler";
import jwt from 'jsonwebtoken'


export const verifyJWT = asyncHandler(async(req,res,next)=>{
try {
    const token = req.cookie?.accessToken || req.header("Authorization")?.replace("Bearer ","")
    if(!token){
        throw new ApiError(401,"Unauthorized User")
    }

    const decodeToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodeToken?._id).select("-password -refreshToken")

    if(!user){
        throw new ApiError(401,"Ivalid Accesss token")
    }

    req.user = user
    next()
} catch (error) {
    throw new ApiError(401,error?.message || "Invalid access token.")
}



})