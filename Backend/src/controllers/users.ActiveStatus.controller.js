import {asyncHandler} from '../utils/AsyncHandler.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import {ApiError} from '../utils/ApiError.js'
import {User} from '../models/user.models.js'


const setUserOnlineStatus = asyncHandler(async(req,res,next)=>{
        
       try {
        const {_id} = req.body;
        if(!_id || _id.trim()===""){
            throw new ApiError(404,'Id is required.')
        }
        const getUser = await User.findById(_id)
        if(!getUser) throw new ApiError(404,'User not found.');
        getUser.isOnline = false
        getUser.save()
        res.status(200).json(new ApiResponse(200,"User is offline."))
       } catch (error) {
        next(error)
       }
})

export {setUserOnlineStatus}