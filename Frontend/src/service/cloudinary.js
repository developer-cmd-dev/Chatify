import axios from 'axios'
import { apiRequest } from '../utils/axiosHandler';



export const cloudinaryUpload = async (files) => {
  try {
    if (files && files.length > 0) {

      let urlsArr = await Promise.all(files.map(async(elem) => {
        const formData = new FormData();
        formData.append('file', elem);
        formData.append('upload_preset', 'my_unsigned_preset');
        formData.append('api_key', import.meta.env.VITE_CLOUDINARY_API_KEY);
 
        const response=await apiRequest( `https://api.cloudinary.com/v1_1/my_unsigned_preset/image/upload`,'post',formData)
        return {type:response.data.resource_type,url:response.data.url,id:response.data.assest_id}

      }))
      return await urlsArr

    }
  } catch (error) {
    return error.response
  }
}






