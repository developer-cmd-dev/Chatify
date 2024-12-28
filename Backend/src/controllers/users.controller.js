import { asyncHandler } from '../utils/AsyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { User } from '../models/user.models.js'
import { uploadOnCloudinary } from '../services/cloudinary.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import  jwt  from 'jsonwebtoken'
import { log } from 'console'


const generateAccessandRefreshTokens = async(userId)=>{
  const user = await User.findById(userId);
  const accessToken= user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();
  user.refreshToken = refreshToken
  await user.save({validateBeforeSave:false})
  return {accessToken,refreshToken}
  
  
  }




const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend.
  const { username, email, fullname, password, gender, avatar } = req.body;
  // validate-empty field
  if ([username, email, fullname, password, gender].some((fields) => fields?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required.");
  }

  // check if user already exist.
  const existedUser = await User.findOne({
    $or: [{ username }, { email }]
  })


  if (existedUser) {
    throw new ApiError(404, "User already existed.")
  }

  // check for image- avatar
  let avatarLocalPath;
  let iconColor=''

    if(!avatar || avatar === ''){
      iconColor= Math.floor(Math.random()*1000)
    }  
  

  if (req.files && Array.isArray(req.files.avatar) && req.files.avatar.length > 0) {
    avatarLocalPath = req.files.avatar[0].path
  }

  // upload them in cloudinary .
  const avatarUrl = await uploadOnCloudinary(avatarLocalPath);

  

  const user = await User.create({
    fullname,
    email,
    password,
    username: username.toLowerCase(),
    avatar: avatarUrl?.url || "",
    userIconColor:`#${iconColor}`
  });



  const createdUser = await User.findById(user._id).select("-password -refreshToken")
  if (!createdUser) {
    throw new ApiError('500', "Something went wrong while registering the user.");
  }

  return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered Successfully.")
  )

})


const loginUser = asyncHandler(async (req, res,next) => {
  const { email, password } = req.body 

  
  if ([email, password].some((fields) => fields.trim() === "")) throw new ApiError(404, "All fields are required.");
  const existedUser = await User.findOne({ email })

  if (!existedUser) throw new ApiError(401, "Email not found!")


try {
        const isPassWordValid = await existedUser.isPasswordCorrect(password)
        if (!isPassWordValid) {
          throw new ApiError(400, "Password did not match.", ["Ensure your password is correct."])
        }
        const loggedInUser = await User.findById(existedUser._id).select("-password -refreshToken")
        if(!loggedInUser) throw new ApiError(404,"user data not found")
        const {refreshToken,accessToken} = await generateAccessandRefreshTokens(loggedInUser._id);
        const options = {
        httpOnly:true,
        secure:true
      }
    
    
      res
      .status(200)
      .cookie('accessToken',accessToken,options)
      .cookie('refreshToken',refreshToken,options)
      .json(new ApiResponse(200,{user:loggedInUser,accessToken,refreshToken},"User logged in Successfully"))
} catch (error) {
  next(error)
}


})


const logoutUser = asyncHandler(async(req,res)=>{
  await User.findByIdAndUpdate(req.user,{
    $unset:{
      refreshToken:1
    },

  },
  {
    new:true,
  })

  const options ={
    httpOnly:true,
    secure:true
  }

  return res
  .status(200)
  .clearCookie("accessToken", options)
  .clearCookie("refreshToken", options)
  .json(new ApiResponse(200, {}, "User logged Out"))
  

})

const autoLogin = asyncHandler(async(req,res,next)=>{

  const {accessToken} = req?.cookies || req.body;
  
  
  if(!accessToken) throw new ApiError(401,"An authentication token was not received" );

 try {
   const decodedUser = jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET);
   
   const user = await User.findById(decodedUser?._id).select("-password ")
   if(!user) throw new ApiError(404,"Unauthorized user");
   const options = {
     httpOnly:true,
     secure:true
   }
   res.status(200)
   .cookie("accessToken",accessToken,options)
   .cookie("refreshToken",user.refreshToken,options)
   .json(new ApiResponse(200,{user,accessToken},"user login successfully"))
 } catch (error) {
  throw new ApiError(401,"Access Token Expired")
 }
})


const refreshToken = asyncHandler(async (req,res,next)=>{
const incomingRefreshToken = req?.cookies.refreshToken || req.body.refreshToken

if(!incomingRefreshToken) throw new ApiError(401,"unauthorized request");
try {
  
  const decodedUser = jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET)
  const user = await User.findById(decodedUser._id).select("-password");

  if(!user){
    throw new ApiError(401,'Invalid refresh token')
  }

  if(incomingRefreshToken !== user.refreshToken) throw new ApiError(401,"Refresh token is expired or used")

  const {accessToken,refreshToken} = await generateAccessandRefreshTokens(user._id);


  const options = {
    httpOnly:true,
    secure:true
  }
  res
  .status(200)
  .cookie('accessToken',accessToken,options)
  .cookie('refreshToken',refreshToken,options)
  .json(new ApiResponse(200,user,"accessToken is refreshed"))

} catch (error) {
  next(error)
}


})


// const userActiveStatus = asyncHandler(async(req,res)=>{
//   try {
//     const {_id} = req.body;
    
//     if(!_id || _id.trim()===''){
//       throw new ApiError(404,'Id is required');
//     }

//     const user = await User.findById(_id);
//     if(!user){
//       throw new ApiError(404,"User not found.")
//     }
//     if(!user.isOnline) { 
//       user.isOnline = true;
//       const res = await user.save();
//     }

//     const getOnlineUsers = await User.find({isOnline:true})
//     if(!getOnlineUsers){
//       throw new ApiError(404,'NO active users.')
//     }
//     res.status(200).json(new ApiResponse(200,getOnlineUsers,'All active users.'))
//   } catch (error) {
    
//   }
// })

export { registerUser, loginUser,logoutUser,refreshToken,autoLogin }