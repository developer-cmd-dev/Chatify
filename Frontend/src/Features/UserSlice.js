import { createSlice } from "@reduxjs/toolkit";


export const UserSlice = createSlice({
    name:'UserData',
    initialState:{
        _id:'',
        username:'',
        email:'',
        fullname:'',
        avatar:'',
    },
    reducers:{
        handleUserData:(state,action)=>{
            state._id = action.payload._id
            state.username = action.payload.username
            state.email = action.payload.email
            state.fullname = action.payload.fullname
            state.avatar = action.payload.avatar
        }
    }
    
})

export const {handleUserData} = UserSlice.actions;
export default UserSlice.reducer