import { Router } from "express";
import { upload } from "../middleware/multer.middlerware.js";
const router = Router();


router.route('/register').post(upload.fields([
    {
        name:'avater',
        maxCount:1
    }
]));


export default router