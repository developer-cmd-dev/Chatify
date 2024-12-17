import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import LoginPage from './Pages/LoginPage.jsx'
import ChatPage from './Pages/ChatPage.jsx'
import HomePage from './Pages/HomePage.jsx'
import Error from './Pages/Error.jsx'
import { Provider } from 'react-redux'
import { store } from './App/store.js'
import { useSelector } from 'react-redux'
import PrivateRoute from './Pages/PrivateRoute.jsx'
import {RegisterForm} from './Components/index.js'


const router = createBrowserRouter([{
    path:'/',
    element:<App/>,
    children:[
        {
            path:'/',
            element:<LoginPage/>
        },
        {
            path:'/register',
            element:<LoginPage/>
        },
        {
            path:'/home',
            element:<PrivateRoute ><HomePage/></PrivateRoute>
        },
        
        {
            path:'error',
            element:<Error/>
        }
    ]
}])


createRoot(document.getElementById('root')).render(
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
)
