import axios from "axios";


export const  apiRequest = async(url,method,data,onProgress)=>{
    try {
        const response = await axios({url,method,data,onUploadProgress:onProgress,onDownloadProgress:onProgress});
        return  response
    } catch (error) {
        if(error.code === "ERR_NETWORK" || error.message === 'Network Error'){
            throw new Error('Server is unreachable. Please try again later.')
        }else if(error.response){
            throw{
                status:error.response.status,
                message:error.response.data.message||'Something went wrong.'
            }
        }else{
            throw new Error('An expected error occurred.')
        }
    }
}