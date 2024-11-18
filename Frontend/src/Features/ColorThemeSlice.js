import { createSlice } from "@reduxjs/toolkit";

export const ColorThemeSlice = createSlice({
    name:'ColorTheme',
    initialState:{
        isColortheme:false,
        colorCode:'#8F8DFC'
    },
    reducers:{
        activeColorTheme:(state)=>{
            state.isColortheme = !state.isColortheme
        },
        setColorCode:(state,action)=>{
            state.colorCode = action.payload
        }
    }
})

export const {activeColorTheme,setColorCode} =ColorThemeSlice.actions
export default ColorThemeSlice.reducer