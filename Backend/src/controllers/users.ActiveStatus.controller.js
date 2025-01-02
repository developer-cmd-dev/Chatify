import {asyncHandler} from '../utils/AsyncHandler.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import {ApiError} from '../utils/ApiError.js'
import {User} from '../models/user.models.js'
import { error } from 'console'


const setUserOnlineStatus = asyncHandler(async(req,res,next)=>{
        
       try {
        const {_id} = req.body;
        if(!_id || _id.trim()===""){
            throw new ApiError(404,'Id is required.')
        }
        const getUser = await User.findByIdAndUpdate(_id,{isOnline:true})
        if(!getUser) throw new ApiError(404,'User not found.');
        res.status(200).json(new ApiResponse(200,"User is online."))
       } catch (error) {
        next(error)
       }
})

const getOnlineUsers = asyncHandler(async(req,res,next)=>{
    try {
        const activeUsers = await User.find({isOnline:true});
        res.status(200).json(new ApiResponse(200,activeUsers))
    } catch (error) {
        throw new ApiError(500,'DB Error')
    }
 

  


})

export {setUserOnlineStatus,getOnlineUsers}