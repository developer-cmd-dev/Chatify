import {configureStore} from '@reduxjs/toolkit'
import hamburgerReducer from '../Features/HamburgerSlice'
import colorThemeReducer from '../Features/ColorThemeSlice'
import DarkModeReducer from '../Features/DarkModeSlice'
import AuthenticateReducer from '../Features/AuthenticateSlice'
import TopLoaderReducer from '../Features/TopLoaderSlice'
import ErrorReducer from '../Features/ErrorSlice'
import UserReducer from '../Features/UserSlice'
import DialogBoxReducer from '../Features/DialogBoxSlice'
import ChatModeChangeReducer from '../Features/ChatModeChangeSlice'
export const store = configureStore({
    reducer:{
        hamBurger:hamburgerReducer,
        colorThemeChange:colorThemeReducer,
        DarkMode:DarkModeReducer,
        Authenticate:AuthenticateReducer,
        TopLoader:TopLoaderReducer,
        ErrorState:ErrorReducer,
        UserData:UserReducer,
        DialogBox:DialogBoxReducer,
        ChatMode:ChatModeChangeReducer
    }
})