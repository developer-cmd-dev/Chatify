import { createSlice } from "@reduxjs/toolkit";

export const AuthenticateSlice = createSlice({
    name:'isAuthenticated',
    initialState:{
        email:'',
        authenticate:false,
    },
    reducers:{
        isAuthenticated:(state,action)=>{
            state.email=action.payload.email
            state.authenticate=action.payload.authenticate
        }
    }
})

export const {isAuthenticated} = AuthenticateSlice.actions;
export default AuthenticateSlice.reducer