const asyncHandler = (fn)=>async (req,res,next)=>{
    try {
        await fn(req,res,next)
    } catch (error) {
        res.status(404).json({success:false,message:error.msg})
    }
}

export {asyncHandler}