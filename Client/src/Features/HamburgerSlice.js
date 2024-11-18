import { createReducer, createSlice } from "@reduxjs/toolkit";
export const HamburgerSlice =createSlice({
    name:"Hamburger",
    initialState:{
        value:false
    },
    reducers:{
        isHamBurger:(state)=>{
           state.value =  !state.value
        }
    }
})
export const {isHamBurger} = HamburgerSlice.actions
export default HamburgerSlice.reducer