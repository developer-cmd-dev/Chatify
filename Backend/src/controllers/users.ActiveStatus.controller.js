import {asyncHandler} from '../utils/AsyncHandler.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import {ApiError} from '../utils/ApiError.js'
import {User} from '../models/user.models.js'


const setUserOnline = asyncHandler(async(req,res,next)=>{
       try {
        const {_id} = req.body;
        if(!_id || _id.trim()===""){
            throw new ApiError(404,'Id is required.')
        }
        const getUser = await User.findById(_id);
        if(!getUser) throw new ApiError(404,'User not found.');
        getUser.isOnline = true;
        getUser.save();
        res.status(200).json(new ApiResponse(200,"User is online."))
       } catch (error) {
        next(error)
       }
})

const setUserOffline = asyncHandler(async(req,res,next)=>{
    try {
          const {_id} = req.body;
        if(!_id ) throw new ApiError(400,"user id is required");
        const user = await User.findById(_id);
        if(!user) throw new ApiError(404,'user not found.');
            user.isOnline = false;
            user.save();
            
            res.status(200).json(new ApiResponse(200,'user is offline'));
    } catch (error) {
        throw new ApiError(500,'Internal server error');
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

export {setUserOnline,getOnlineUsers,setUserOffline}