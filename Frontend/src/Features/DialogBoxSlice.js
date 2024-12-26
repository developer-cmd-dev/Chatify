import { createSlice } from "@reduxjs/toolkit";


export const DialogBoxSlice = createSlice({
    name:'DialogBox',
    initialState:{
        msg:'',
        isAlert:false
    },
    reducers:{
        handleDialogBox:(state,action)=>{
            state.msg=action.payload.msg,
            state.isAlert = action.payload.isAlert
        }
    }
})

export const {handleDialogBox} = DialogBoxSlice.actions
export default DialogBoxSlice.reducer