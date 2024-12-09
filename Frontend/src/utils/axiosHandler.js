import axios from 'axios'

const axiosHandler =async (pathName,data,httpMethod)=>{
    const response='';
    switch (httpMethod) {
        case 'post':
            axios.post(`http://localhost:5000/api/v1`,data)
            .then((res)=>response=  res)
            .catch((error)=>response = error)
            break;
    
        default:
            break;
    }
return response;
  
}

export {axiosHandler}