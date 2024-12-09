import { ApiError } from "../utils/ApiError.js"

const errorHandler= (err,req,res,next)=>{
if(err instanceof ApiError){
    res.status(err.statusCode).json({
        success:err.success,
        message:err.message,
        errors:err.errors,
        stack:process.env.NODE_ENV === "developement" ? err.stack:undefined
    })
}else{
    res.status(500).json({
            success:false,
            message:"Internal server error",
            stack: process.env.NODE_ENV === "development" ? err.stack : undefined,

    })
}


}

export {errorHandler}   