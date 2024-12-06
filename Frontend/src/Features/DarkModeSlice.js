import { createSlice } from "@reduxjs/toolkit";


export const DarkModeSlice = createSlice({
    name:'DarkMode',
    initialState:{
        isDarkMode:false
    },
    reducers:{
        handleDarkMode:(state,action)=>{
            state.isDarkMode = action.payload
        }
    }
}) 

export const {handleDarkMode} = DarkModeSlice.actions
export default DarkModeSlice.reducer 