import { createSlice } from "@reduxjs/toolkit";


export const ChatModeChangeSlice = createSlice({
    name:'ChatModeChange',
    initialState:{
        mode:null
    },
    reducers:{
        handleChatMode:(state,action)=>{
            state.mode = action.payload
        }
    }

        
})

export const {handleChatMode} = ChatModeChangeSlice.actions;
export default ChatModeChangeSlice.reducer;