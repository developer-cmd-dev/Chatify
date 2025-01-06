import axios from "axios";
import { useSelector } from "react-redux";


export const  apiRequest = async(url,method,data)=>{

    try {
        const response = await axios({url,method,data,withCredentials:false});
        return response
    } catch (error) {
        if(error.code === "ERR_NETWORK" || error.message === 'Network Error'){
            throw new Error('Server is unreachable. Please try again later.')
        }else if(error.response){
            throw{
                status:error.response.status,
                message:error.response.data.message||'Something went wrong.',
                success:false
            }
        }else{
            throw new Error('An expected error occurred.')
        }
    }
}