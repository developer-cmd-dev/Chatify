import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import LoginPage from './Pages/LoginPage.jsx'
import ChatPage from './Pages/ChatPage.jsx'
import Error from './Pages/Error.jsx'
import { Provider } from 'react-redux'
import { store } from './App/store.js'
import { useSelector } from 'react-redux'

const router = createBrowserRouter([{
    path:'/',
    element:<App/>,
    children:[
        {
            path:'/',
            element:<LoginPage/>
        },
        {
            path:'global-chat',
            element:<ChatPage/>
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
