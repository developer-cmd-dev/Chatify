import { Router } from "express";
import { upload } from "../middleware/multer.middlerware.js";
import { registerUser,loginUser,emailValidation,updatepassword,userActiveStatus } from "../controllers/users.controller.js";
import {errorHandler} from '../middleware/error.middleware.js'
import { setUserOnlineStatus } from "../controllers/users.ActiveStatus.controller.js";
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
router.route('/global-chat-room').patch(userActiveStatus)
router.route('/home').patch(setUserOnlineStatus)






export default router