import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./Pages/LoginPage.jsx";
import Error from "./Pages/Error.jsx";
import { Provider } from "react-redux";
import { store } from "./App/store.js";
import PrivateRoute from "./Pages/PrivateRoute.jsx";
import Home from "./Pages/Home";
import {
  ChatMainContainer,
  MessageCategory,
  MenuContainer,
  ProfileContainer,
  NotificationContainer,
  ResetPassword,
  SavedFile,
  MainContainer,
} from "./Components/index.js";
import EamilValidationPage from "./Pages/EmailValidationPage.jsx";
import { NextUIProvider } from "@nextui-org/react";
import LeftDashBoard from "./Components/LeftDashBoard.jsx";
import MiddleDashBoard from "./Components/MiddleDashBoard.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <LoginPage />,
      },
      {
        path: "/home",
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
      children:[
        {
          path:'',
          element:<MainContainer/>,
          children:[
            {
              path:'',
              element:<ChatMainContainer/>
            },
            {
              path:'notification',
              element:<NotificationContainer/>
            },
            {
              path:'saved-files',
              element:<SavedFile/>
            },
          ]
        },

      
      ]
       
      },
      
    ],
  },

  {
    path: "/email-validation",
    element: <EamilValidationPage />,
    children: [{ path: "reset-password", element: <ResetPassword /> }],
  },

  {
    path: "error",
    element: <Error />,
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <NextUIProvider>
      <RouterProvider router={router} />
    </NextUIProvider>
  </Provider>
);
