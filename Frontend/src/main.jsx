import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./Pages/LoginPage.jsx";
import ChatPage from "./Pages/ChatPage.jsx";
import HomePage from "./Pages/HomePage.jsx";
import Error from "./Pages/Error.jsx";
import { Provider } from "react-redux";
import { store } from "./App/store.js";
import { useSelector } from "react-redux";
import PrivateRoute from "./Pages/PrivateRoute.jsx";
import { RegisterForm } from "./Components/index.js";
import { ReducerType } from "@reduxjs/toolkit";
import {
  ResetPassword,
  GlobalChatRoom,
  PrivateChatRoom,
  ChatMode,
} from "./Components/index.js";
import EamilValidationPage from "./Pages/EmailValidationPage.jsx";
import { NextUIProvider } from "@nextui-org/react";

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
            <HomePage />
          </PrivateRoute>
        ),
        children: [
          {
            path: "",
            element: <ChatMode />,
          },

          {
            path: "private-chat-room",
            element: <PrivateChatRoom />,
          },
        ],
      },
      {
        path: "global-chat-room",
        element: (
          <PrivateRoute>
            <ChatPage />
          </PrivateRoute>
        ),
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
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <NextUIProvider>
      <RouterProvider router={router} />
    </NextUIProvider>
  </Provider>
);
