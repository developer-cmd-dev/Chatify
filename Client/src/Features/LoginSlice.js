import { createSlice } from "@reduxjs/toolkit";

export const LoginSlice = createSlice({
    name:'Login',
    initialState:{
        email:false
    },
    reducers:{
        login:(state,action)=>{
            state.email = action.payload
        }
    }
})

export const {login} = LoginSlice.actions;
export default LoginSlice.reducer