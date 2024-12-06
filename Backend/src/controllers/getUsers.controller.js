import { asyncHandler} from '../utils/AsyncHandler.js';
import { User } from '../models/user.models.js';


const getUser = asyncHandler(async (req,res)=>{
   const data = await User.find()
    res.status(200).json({data})

})

export {getUser}