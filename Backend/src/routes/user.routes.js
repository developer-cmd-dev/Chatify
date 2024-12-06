import { Router } from "express";
import { upload } from "../middleware/multer.middlerware.js";
import { registerUser } from "../controllers/users.controller.js";
import { getUser } from "../controllers/getUsers.controller.js";
const router = Router();


router.route('/register').post(upload.fields([
    {
        name:'avatar',
        maxCount:1
    }
]),registerUser)

router.route('/getuser').get(getUser)





export default router