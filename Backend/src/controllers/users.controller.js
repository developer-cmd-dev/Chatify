import { asyncHandler } from '../utils/AsyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { User } from '../models/user.models.js'
import { uploadOnCloudinary } from '../services/cloudinary.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { ObjectId } from 'mongodb'


const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend.
  const { username, email, fullname, password, gender, avatar } = req.body;
  // validate-empty field
  if ([username, email, fullname, password, gender, avatar].some((fields) => fields?.trim() === "")
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

  console.log(req.files)
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
  });



  const createdUser = await User.findById(user._id).select("-password -refreshToken")
  if (!createdUser) {
    throw new ApiError('500', "Something went wrong while registering the user.");
  }

  return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered Successfully.")
  )

})


const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body
  if ([email, password].some((fields) => fields.trim() === "")) throw new ApiError(404, "All fields are required.");
  const existedUser = await User.findOne({ email })
  if (!existedUser) throw new ApiError(401, "Email not found!")
  try {
    const isPassWordValid = await existedUser.isPasswordCorrect(password)
    if (!isPassWordValid) {
      throw new ApiError(400, "Password did not match.", ["Ensure your password is correct."])
    }

    res.status(200).json(new ApiResponse(200, "Password Matched"))


  } catch (error) {
    next(error)
  }

})

const emailValidation = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  if (!email || email.trim() === "") {
    throw new ApiError(404, "Email fields are required.")
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(404, 'email not found!')
    }
    res.status(200).json(new ApiResponse(200, "email found"));
  } catch (error) {
    next(error)
  }


})

const updatepassword = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if ([email, password].some((fields) => fields.trim() === "")) {
    throw new ApiError(404, "All fields are required.")
  }

  try {
    const user = await User.findOne({ email });
    if(!user){
      throw new ApiError(404,"Email is not found")
    }
    user.password = password
    const response = await user.save()
    if(!response){
      throw new ApiError(500,'Password not reset.')
    }

    res.status(200).json(new ApiResponse(200,"Password Updated successfully."));
  } catch (error) {
    next(error)
  }







})

export { registerUser, loginUser, emailValidation,updatepassword }