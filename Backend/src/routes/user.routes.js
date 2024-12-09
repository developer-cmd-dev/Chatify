import { Router } from "express";
import { upload } from "../middleware/multer.middlerware.js";
import { registerUser,loginUser } from "../controllers/users.controller.js";
import {errorHandler} from '../middleware/error.middleware.js'
const router = Router();


router.route('/register').post(upload.fields([
    {
        name:'avatar',
        maxCount:1
    }
]),registerUser)

router.route('/').post(loginUser)






export default router