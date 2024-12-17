import { Router } from "express";
import { upload } from "../middleware/multer.middlerware.js";
import { registerUser,loginUser,emailValidation,updatepassword } from "../controllers/users.controller.js";
import {errorHandler} from '../middleware/error.middleware.js'
const router = Router();


router.route('/register').post(upload.fields([
    {
        name:'avatar',
        maxCount:1
    }
]),registerUser)

router.route('/').post(loginUser)

router.route('/email-validation').post(emailValidation);
router.route('/email-validation/reset-password').patch(updatepassword);






export default router