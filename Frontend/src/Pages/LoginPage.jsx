import React, { useEffect } from "react";
import {
  Children,
  Header,
  LoginForm,
  IllustrationPoster,
} from "../Components/index";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { useNavigate, useParams } from 'react-router-dom';




function LoginPage() {
  const isDarkMode = useSelector((state) => state.DarkMode.isDarkMode);

  return (
    <div
      className={`h-[calc(100vh-10vh)] flex flex-col items-center justify-around px-5 ${
        isDarkMode ? "bg-black" : "bg-white"
      }
                    sm:flex sm:items-center sm:justify-around sm:flex-col-reverse
                    md:flex-col-reverse
                    lg:flex lg:flex-row`}
    >
      <IllustrationPoster />
      <LoginForm />
    </div>
  );
}

export default LoginPage;
