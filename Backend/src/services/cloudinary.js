import { v2 as cloudinary } from 'cloudinary';
import { resolveTxt } from 'dns';
import fs from 'fs'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async (localfilepath) => {
    try {
        if (!localfilepath) return null

        const response = await cloudinary.uploader.upload(localfilepath, {
            resource_type: 'auto'
        })

        console.log("File uploaded in cloudinary.", response.url);
        fs.unlink(localfilepath,()=>console.log('File unlinked from local machine'))
        return response

    } catch (error) {
        fs.unlink(localfilepath,()=>"File unlink from local machine");
        return null
    }
}

export {uploadOnCloudinary}