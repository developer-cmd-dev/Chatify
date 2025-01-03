import { Router } from "express";
import { upload } from "../middleware/multer.middlerware.js";
import { registerUser,loginUser, logoutUser,refreshToken,autoLogin } from "../controllers/users.controller.js";
import { setUserOnline,getOnlineUsers,setUserOffline } from "../controllers/users.ActiveStatus.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
const router = Router();





// Authentication Routes.
router.route('/').post(loginUser);
router.route('/register').post(upload.fields([
    {
        name:'avatar',
        maxCount:1
    }
]),registerUser)
router.route('/auto-login').post(autoLogin);
router.route('/refresh-token').post(refreshToken);
router.route('/logout').post(verifyJWT,logoutUser);


// Users Activity Routes
router.route('/active-users').post(getOnlineUsers);
router.route('/set-user-online').patch(setUserOnline);
router.route('/set-user-offline').patch(setUserOffline)














export default router