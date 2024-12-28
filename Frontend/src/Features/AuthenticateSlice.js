import { createSlice } from "@reduxjs/toolkit";

export const AuthenticateSlice = createSlice({
    name:'isAuthenticated',
    initialState:{
        authenticate:false,
    },
    reducers:{
        isAuthenticated:(state,action)=>{
            state.authenticate=action.payload.authenticate
        }
    }
})

export const {isAuthenticated} = AuthenticateSlice.actions;
export default AuthenticateSlice.reducer