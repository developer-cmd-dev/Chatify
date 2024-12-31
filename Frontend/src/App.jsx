import "./App.css";
import { Outlet,  useLocation } from "react-router-dom";
import { Header } from "./Components";
import { useSelector } from "react-redux";
import {ToastContainer} from 'react-toastify'
import {NextUIProvider} from '@nextui-org/react'


function App() {
  const isDarkMode = useSelector((state) => state.DarkMode.isDarkMode);
  const location = useLocation()
  const hideHeaderPath = []
  const shouldshowHeader = !hideHeaderPath.includes(location.pathname)

  return (
    <NextUIProvider>
    <div
      className="
    overflow-hidden h-screen  "
    >
     <ToastContainer autoClose={2000} />
   { shouldshowHeader &&  <Header
        logo={true}
        colorPallete={true}
        darkModeButton={true}
        classname={`${isDarkMode ? "bg-black" : "bg-white"}  h-[10vh] w-full `}
        hamburger={true}
      />}
      <main className=" h-[100%]  w-full">
        <Outlet />
      </main>
    </div>
    </NextUIProvider>
  );
}

export default App;
