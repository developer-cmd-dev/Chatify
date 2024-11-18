import {configureStore} from '@reduxjs/toolkit'
import hamburgerReducer from '../Features/HamburgerSlice'
import colorThemeReducer from '../Features/ColorThemeSlice'
import DarkModeReducer from '../Features/DarkModeSlice'
import LoginReducer from '../Features/LoginSlice'
export const store = configureStore({
    reducer:{
        hamBurger:hamburgerReducer,
        colorThemeChange:colorThemeReducer,
        DarkMode:DarkModeReducer,
        Login:LoginReducer,
    }
})