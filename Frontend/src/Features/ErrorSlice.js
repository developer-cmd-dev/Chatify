import { createSlice } from "@reduxjs/toolkit";


export const ErrorSlice = createSlice({
    name:Error,
    initialState:{
        status:null,
        message:'',
        isError:false
    },
    reducers:{
        setError:(state,actions)=>{
            state = {...actions.payload}
        }
    }
})
export const {setError} = ErrorSlice.actions
export default ErrorSlice.reducer 