import { createSlice } from "@reduxjs/toolkit";


export const topLoaderSlice = createSlice({
    name:'TopLoader',
    initialState:{
        progress:0
    },
    reducers:{
        setProgress:(state,action)=>{
          state.progress = action.payload
        },
        resetProgress:(state)=> {state.progress = 0;}
    }
})

export const {setProgress,resetProgress} = topLoaderSlice.actions
export default topLoaderSlice.reducer