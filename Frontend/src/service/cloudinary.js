import { apiRequest } from '../utils/axiosHandler';




export const cloudinaryUpload = async (files) => {
  try {
    // if (files && files.length > 0) {

    //   let urlsArr = await Promise.all(files.map(async(elem) => {
    //     const formData = new FormData();
    //     formData.append('file', elem);
    //     formData.append('upload_preset', 'my_unsigned_preset');
    //     formData.append('api_key', import.meta.env.VITE_CLOUDINARY_API_KEY);
    //     const fileType = elem.type.slice(0,elem.type.indexOf('/'));
    //     console.log(fileType)
 
    //     const response=await apiRequest( `https://api.cloudinary.com/v1_1/my_unsigned_preset/${fileType}/upload`,'post',formData)
    //     console.log({type:response.data.resource_type,url:response.data.url,id:response.data.asset_id})
    //     return {type:response.data.resource_type,url:response.data.url,id:response.data.asset_id}
    //   }))
    //   return await urlsArr

    // }


    const cld = new Cloudinary({
      cloud: {
        cloudName: import.meta.env.VITE_CLOUDINARY_NAME,
        api_key:import.meta.env.VITE_CLOUDINARY_API_KEY,
        upload_preset:'my_unsigned_preset'
      }

    })
    console.log(cld)
  } catch (error) {
    return error.response
  }
}






