import { createSlice } from "@reduxjs/toolkit";


export const ErrorSlice = createSlice({
    name:'ErrorState',
    initialState:{
        status:null,
        message:null,
        isError:false
    },
    reducers:{
        setError:(state,actions)=>{
            state.status = actions.payload.status
            state.message = actions.payload.message
            state.isError = actions.payload.isError
        }
    }
})
export const {setError} = ErrorSlice.actions
export default ErrorSlice.reducer 