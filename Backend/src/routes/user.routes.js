import { Router } from "express";
import { upload } from "../middleware/multer.middlerware.js";
import { registerUser,loginUser, logoutUser,refreshToken,autoLogin } from "../controllers/users.controller.js";
import { setUserOnlineStatus,getOnlineUsers } from "../controllers/users.ActiveStatus.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
const router = Router();


router.route('/register').post(upload.fields([
    {
        name:'avatar',
        maxCount:1
    }
]),registerUser)



// Authentication Routes.
router.route('/').post(loginUser);
router.route('/auto-login').post(autoLogin);
router.route('/refresh-token').post(refreshToken);
router.route('/logout').post(verifyJWT,logoutUser);


// Users Routes
router.route('/active-users').post(getOnlineUsers);
router.route('/set-user-online').patch(setUserOnlineStatus);




// router.route('/global-chat-room').patch(userActiveStatus);




router.route('/home').patch(setUserOnlineStatus);






export default router