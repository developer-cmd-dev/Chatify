import {configureStore} from '@reduxjs/toolkit'
import hamburgerReducer from '../Features/HamburgerSlice'
import colorThemeReducer from '../Features/ColorThemeSlice'
import DarkModeReducer from '../Features/DarkModeSlice'
import AuthenticateReducer from '../Features/AuthenticateSlice'
import TopLoaderReducer from '../Features/TopLoaderSlice'
import ErrorReducer from '../Features/ErrorSlice'
export const store = configureStore({
    reducer:{
        hamBurger:hamburgerReducer,
        colorThemeChange:colorThemeReducer,
        DarkMode:DarkModeReducer,
        Authenticate:AuthenticateReducer,
        TopLoader:TopLoaderReducer,
        Error:ErrorReducer
    }
})